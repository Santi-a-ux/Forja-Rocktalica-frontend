"use client";

import { useState } from "react";
import { Button } from "@/features/common/components/Button";
import { Cargando, ErrorMensaje, Exito, Vacio } from "@/features/common/components/Estados";
import { formatearPrecio } from "@/features/common/format";
import { mensajeDeError } from "@/features/common/http";
import { useMarcas } from "@/features/marcas/hooks/useMarcas";
import type { DatosInstrumento, Instrumento } from "../domain/types";
import { useInstrumentoAcciones, useInstrumentos } from "../hooks/useInstrumentos";
import { InstrumentoForm } from "./InstrumentoForm";

export function AdminInstrumentos() {
  const [page, setPage] = useState(1);
  const { instrumentos, pagination, loading, error, recargar } = useInstrumentos({ page, limit: 6 });
  const { marcas } = useMarcas();
  const acciones = useInstrumentoAcciones();

  const [formulario, setFormulario] = useState<"nuevo" | Instrumento | null>(null);
  const [confirmandoId, setConfirmandoId] = useState<number | null>(null);
  const [mensaje, setMensaje] = useState<{ tipo: "exito" | "error"; texto: string } | null>(null);

  async function guardar(datos: DatosInstrumento) {
    if (formulario && formulario !== "nuevo") {
      await acciones.actualizar(formulario.id, datos);
      setMensaje({ tipo: "exito", texto: "Instrumento actualizado." });
    } else {
      await acciones.crear(datos);
      setMensaje({ tipo: "exito", texto: "Instrumento creado." });
    }
    setFormulario(null);
    recargar();
  }

  async function eliminar(instrumento: Instrumento) {
    try {
      await acciones.eliminar(instrumento.id);
      setMensaje({ tipo: "exito", texto: `"${instrumento.nombre}" se eliminó.` });
      if (instrumentos.length === 1 && page > 1) setPage(page - 1);
      else recargar();
    } catch (e) {
      setMensaje({ tipo: "error", texto: mensajeDeError(e) });
    } finally {
      setConfirmandoId(null);
    }
  }

  return (
    <section aria-labelledby="titulo-admin-instrumentos">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="titulo-admin-instrumentos" className="m-0 font-display text-2xl">Catálogo de instrumentos</h2>
        {!formulario && <Button onClick={() => { setMensaje(null); setFormulario("nuevo"); }}>Nuevo instrumento</Button>}
      </div>

      {mensaje && (mensaje.tipo === "exito" ? <Exito>{mensaje.texto}</Exito> : <ErrorMensaje mensaje={mensaje.texto} />)}

      {formulario && (
        <div className="mt-4">
          <InstrumentoForm
            key={formulario === "nuevo" ? "nuevo" : formulario.id}
            inicial={formulario === "nuevo" ? undefined : formulario}
            marcas={marcas}
            onGuardar={guardar}
            onCancelar={() => setFormulario(null)}
          />
        </div>
      )}

      <div className="mt-4">
        {loading ? (
          <Cargando texto="Cargando catálogo…" />
        ) : error ? (
          <ErrorMensaje mensaje={error} onReintentar={recargar} />
        ) : instrumentos.length === 0 ? (
          <Vacio>Todavía no hay instrumentos. Crea el primero.</Vacio>
        ) : (
          <ul className="m-0 grid list-none gap-3 p-0">
            {instrumentos.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[16px] border border-linea bg-superficie p-4">
                <div>
                  <p className="m-0 font-bold">{i.nombre}</p>
                  <p className="m-0 text-sm text-tinta-suave">
                    {i.categoria} · {i.marca?.nombre} · {formatearPrecio(i.precio)}
                  </p>
                </div>
                {confirmandoId === i.id ? (
                  <div className="flex flex-wrap items-center gap-2" role="alertdialog" aria-label={`Confirmar eliminación de ${i.nombre}`}>
                    <span className="font-bold text-error">¿Eliminar este instrumento?</span>
                    <Button variante="peligro" onClick={() => eliminar(i)}>Sí, eliminar</Button>
                    <Button variante="suave" onClick={() => setConfirmandoId(null)}>No</Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variante="suave" onClick={() => { setMensaje(null); setFormulario(i); }}>Editar</Button>
                    <Button variante="peligro" onClick={() => { setMensaje(null); setConfirmandoId(i.id); }}>Eliminar</Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {pagination && pagination.totalPages > 1 && (
          <nav aria-label="Paginación del catálogo" className="mt-6 flex items-center justify-center gap-3">
            <Button variante="suave" disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</Button>
            <span className="text-tinta-suave">Página {pagination.page} de {pagination.totalPages}</span>
            <Button variante="suave" disabled={page >= pagination.totalPages} onClick={() => setPage(page + 1)}>Siguiente</Button>
          </nav>
        )}
      </div>
    </section>
  );
}
