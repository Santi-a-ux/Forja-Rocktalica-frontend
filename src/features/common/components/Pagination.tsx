import Link from "next/link";
import type { Pagination as PaginationData } from "../types";

interface PaginationProps {
  pagination: PaginationData;
  /** Construye la URL de una página conservando los demás filtros (por ejemplo ?categoria=Bajo&page=2). */
  hrefPara: (page: number) => string;
}

export function Pagination({ pagination, hrefPara }: PaginationProps) {
  const { page, totalPages } = pagination;
  if (totalPages <= 1) return null;

  const enlace = "rounded-full border border-linea bg-superficie px-4 py-1.5 font-bold no-underline";
  const inactivo = "pointer-events-none opacity-50";

  return (
    <nav aria-label="Paginación" className="mt-8 flex items-center justify-center gap-3">
      <Link
        href={hrefPara(page - 1)}
        aria-disabled={page <= 1}
        tabIndex={page <= 1 ? -1 : undefined}
        className={`${enlace} ${page <= 1 ? inactivo : ""}`}
      >
        Anterior
      </Link>
      <span aria-current="page" className="text-tinta-suave">
        Página {page} de {totalPages}
      </span>
      <Link
        href={hrefPara(page + 1)}
        aria-disabled={page >= totalPages}
        tabIndex={page >= totalPages ? -1 : undefined}
        className={`${enlace} ${page >= totalPages ? inactivo : ""}`}
      >
        Siguiente
      </Link>
    </nav>
  );
}
