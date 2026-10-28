"use client";

import { useCarga } from "@/features/common/hooks/useCarga";
import { marcaService } from "../services/marcaService";

export function useMarcas() {
  const { data, loading, error, recargar } = useCarga((signal) => marcaService.listar(signal), "marcas");
  return { marcas: data?.data ?? [], loading, error, recargar };
}
