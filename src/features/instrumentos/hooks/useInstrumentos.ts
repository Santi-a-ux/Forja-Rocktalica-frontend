"use client";

import { useCarga } from "@/features/common/hooks/useCarga";
import type { DatosInstrumento, FiltrosInstrumento } from "../domain/types";
import { instrumentoService } from "../services/instrumentoService";

export function useInstrumentos(filtros: FiltrosInstrumento) {
  const { data, loading, error, recargar } = useCarga(
    (signal) => instrumentoService.listar(filtros, signal),
    JSON.stringify(filtros),
  );
  return { instrumentos: data?.data ?? [], pagination: data?.pagination ?? null, loading, error, recargar };
}

/** Operaciones de administración (la API solo las permite al rol admin). */
export function useInstrumentoAcciones() {
  return {
    crear: (datos: DatosInstrumento) => instrumentoService.crear(datos),
    actualizar: (id: number, datos: DatosInstrumento) => instrumentoService.actualizar(id, datos),
    eliminar: (id: number) => instrumentoService.eliminar(id),
  };
}
