"use client";

import { useState } from "react";
import { useConsultaAcciones, useTodasLasConsultas } from "../hooks/useConsultas";
import { ConsultasLista } from "./ConsultasLista";

export function AdminConsultas() {
  const [page, setPage] = useState(1);
  const { consultas, pagination, loading, error, recargar } = useTodasLasConsultas(page);
  const acciones = useConsultaAcciones();

  return (
    <section aria-labelledby="titulo-admin-consultas">
      <h2 id="titulo-admin-consultas" className="mb-4 mt-0 font-display text-2xl">Consultas recibidas</h2>
      <ConsultasLista
        admin
        consultas={consultas}
        pagination={pagination}
        loading={loading}
        error={error}
        onReintentar={recargar}
        onCambiarPagina={setPage}
        onCambiarEstado={async (c) => {
          await acciones.cambiarEstado(c.id, c.estado === "atendida" ? "pendiente" : "atendida");
          recargar();
        }}
        onEliminar={async (c) => {
          await acciones.eliminar(c.id);
          if (consultas.length === 1 && page > 1) setPage(page - 1);
          else recargar();
        }}
        textoVacio="Todavía no hay consultas de clientes."
      />
    </section>
  );
}
