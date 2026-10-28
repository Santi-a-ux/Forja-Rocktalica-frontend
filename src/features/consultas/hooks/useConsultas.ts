"use client";

import { useCarga } from "@/features/common/hooks/useCarga";
import type { EstadoConsulta, NuevaConsulta } from "../domain/types";
import { consultaService } from "../services/consultaService";

export function useMisConsultas(page: number, habilitado = true) {
  const { data, loading, error, recargar } = useCarga(
    (signal) => consultaService.mias(page, signal),
    `mias-${page}`,
    habilitado,
  );
  return { consultas: data?.data ?? [], pagination: data?.pagination ?? null, loading, error, recargar };
}

export function useTodasLasConsultas(page: number, habilitado = true) {
  const { data, loading, error, recargar } = useCarga(
    (signal) => consultaService.todas(page, signal),
    `todas-${page}`,
    habilitado,
  );
  return { consultas: data?.data ?? [], pagination: data?.pagination ?? null, loading, error, recargar };
}

export function useConsultaAcciones() {
  return {
    crear: (datos: NuevaConsulta) => consultaService.crear(datos),
    cambiarEstado: (id: number, estado: EstadoConsulta) => consultaService.cambiarEstado(id, estado),
    eliminar: (id: number) => consultaService.eliminar(id),
  };
}
