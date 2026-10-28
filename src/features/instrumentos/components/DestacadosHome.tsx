"use client";

import { useInstrumentos } from "../hooks/useInstrumentos";
import { CatalogoGrid } from "./CatalogoGrid";

export function DestacadosHome() {
  const { instrumentos, loading, error, recargar } = useInstrumentos({ page: 1, limit: 3 });
  return <CatalogoGrid instrumentos={instrumentos} loading={loading} error={error} onReintentar={recargar} />;
}
