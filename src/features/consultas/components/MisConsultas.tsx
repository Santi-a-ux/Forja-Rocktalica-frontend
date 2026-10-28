"use client";

import { useState } from "react";
import { useMisConsultas, useConsultaAcciones } from "../hooks/useConsultas";
import { ConsultasLista } from "./ConsultasLista";

export function MisConsultas() {
  const [page, setPage] = useState(1);
  const { consultas, pagination, loading, error, recargar } = useMisConsultas(page);
  const acciones = useConsultaAcciones();

  return (
    <ConsultasLista
      consultas={consultas}
      pagination={pagination}
      loading={loading}
      error={error}
      onReintentar={recargar}
      onCambiarPagina={setPage}
      onEliminar={async (c) => {
        await acciones.eliminar(c.id);
        if (consultas.length === 1 && page > 1) setPage(page - 1);
        else recargar();
      }}
      textoVacio="Aún no has enviado consultas. Cuando envíes una desde Contacto, aparecerá aquí."
    />
  );
}
