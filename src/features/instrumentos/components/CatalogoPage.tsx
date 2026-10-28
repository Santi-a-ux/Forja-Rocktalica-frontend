"use client";

import { useSearchParams } from "next/navigation";
import { Pagination } from "@/features/common/components/Pagination";
import { CATEGORIAS, type Categoria, type FiltrosInstrumento } from "../domain/types";
import { useInstrumentos } from "../hooks/useInstrumentos";
import { CatalogoFiltros } from "./CatalogoFiltros";
import { CatalogoGrid } from "./CatalogoGrid";

function numeroPositivo(valor: string | null): number | undefined {
  if (!valor) return undefined;
  const n = Number(valor);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

export function CatalogoPage() {
  const params = useSearchParams();

  const categoriaParam = params.get("categoria");
  const filtros: FiltrosInstrumento = {
    page: Math.max(1, Math.floor(Number(params.get("page"))) || 1),
    limit: 6,
    categoria: CATEGORIAS.includes(categoriaParam as Categoria) ? (categoriaParam as Categoria) : undefined,
    q: params.get("q") || undefined,
    minPrecio: numeroPositivo(params.get("minPrecio")),
    maxPrecio: numeroPositivo(params.get("maxPrecio")),
  };

  const { instrumentos, pagination, loading, error, recargar } = useInstrumentos(filtros);

  // Paginación por URL (?page=2) conservando los filtros activos
  function hrefPara(page: number): string {
    const siguiente = new URLSearchParams(params.toString());
    if (page <= 1) siguiente.delete("page");
    else siguiente.set("page", String(page));
    const texto = siguiente.toString();
    return texto ? `/instrumentos?${texto}` : "/instrumentos";
  }

  return (
    <>
      <CatalogoFiltros key={params.toString()} />
      <CatalogoGrid instrumentos={instrumentos} loading={loading} error={error} onReintentar={recargar} />
      {pagination && !loading && !error && <Pagination pagination={pagination} hrefPara={hrefPara} />}
    </>
  );
}
