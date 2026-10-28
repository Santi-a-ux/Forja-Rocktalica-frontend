"use client";

import { useState } from "react";
import { Button } from "@/features/common/components/Button";
import { Cargando, ErrorMensaje, Vacio } from "@/features/common/components/Estados";
import { formatearFecha } from "@/features/common/format";
import { mensajeDeError } from "@/features/common/http";
import type { Pagination as PaginationData } from "@/features/common/types";
import type { Consulta } from "../domain/types";

interface ConsultasListaProps {
  consultas: Consulta[];
  pagination: PaginationData | null;
  loading: boolean;
  error: string | null;
  onReintentar: () => void;
  onCambiarPagina: (page: number) => void;
  /** Modo admin: muestra el autor y permite marcar como atendida */
  admin?: boolean;
  onCambiarEstado?: (consulta: Consulta) => Promise<void>;
  onEliminar?: (consulta: Consulta) => Promise<void>;
  textoVacio: string;
}

export function ConsultasLista({
  consultas, pagination, loading, error, onReintentar, onCambiarPagina,
  admin = false, onCambiarEstado, onEliminar, textoVacio,
}: ConsultasListaProps) {
  const [confirmandoId, setConfirmandoId] = useState<number | null>(null);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);

  async function ejecutar(accion: () => Promise<void>) {
    setErrorAccion(null);
    try {
      await accion();
    } catch (e) {
      setErrorAccion(mensajeDeError(e));
    } finally {
      setConfirmandoId(null);
    }
  }

  if (loading) return <Cargando texto="Cargando consultas…" />;
  if (error) return <ErrorMensaje mensaje={error} onReintentar={onReintentar} />;
  if (consultas.length === 0) return <Vacio>{textoVacio}</Vacio>;

  return (
    <div>
      {errorAccion && <ErrorMensaje mensaje={errorAccion} />}
      <ul className="m-0 grid list-none gap-4 p-0">
        {consultas.map((c) => (
          <li key={c.id} className="rounded-[16px] border border-linea bg-superficie p-5 shadow-suave">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="m-0 font-display text-lg font-semibold">{c.instrumento?.nombre ?? "Instrumento"}</p>
                <p className="m-0 text-sm text-tinta-suave">
                  {formatearFecha(c.createdAt)}
                  {admin && c.user && ` · ${c.user.nombre} (${c.user.email})`}
                </p>
              </div>
              <span
                className={`rounded-full border px-3 py-0.5 text-sm font-bold ${
                  c.estado === "atendida" ? "border-exito text-exito" : "border-terracota text-terracota"
                }`}
              >
                {c.estado === "atendida" ? "Atendida" : "Pendiente"}
              </span>
            </div>
            <p className="mb-0 mt-3 whitespace-pre-line">{c.mensaje}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {admin && onCambiarEstado && (
                <Button variante="suave" onClick={() => ejecutar(() => onCambiarEstado(c))}>
                  {c.estado === "atendida" ? "Marcar como pendiente" : "Marcar como atendida"}
                </Button>
              )}
              {onEliminar &&
                (confirmandoId === c.id ? (
                  <>
                    <span className="font-bold text-error">¿Eliminar esta consulta?</span>
                    <Button variante="peligro" onClick={() => ejecutar(() => onEliminar(c))}>Sí, eliminar</Button>
                    <Button variante="suave" onClick={() => setConfirmandoId(null)}>No</Button>
                  </>
                ) : (
                  <Button variante="peligro" onClick={() => setConfirmandoId(c.id)}>Eliminar</Button>
                ))}
            </div>
          </li>
        ))}
      </ul>

      {pagination && pagination.totalPages > 1 && (
        <nav aria-label="Paginación de consultas" className="mt-6 flex items-center justify-center gap-3">
          <Button variante="suave" disabled={pagination.page <= 1} onClick={() => onCambiarPagina(pagination.page - 1)}>Anterior</Button>
          <span className="text-tinta-suave">Página {pagination.page} de {pagination.totalPages}</span>
          <Button variante="suave" disabled={pagination.page >= pagination.totalPages} onClick={() => onCambiarPagina(pagination.page + 1)}>Siguiente</Button>
        </nav>
      )}
    </div>
  );
}
