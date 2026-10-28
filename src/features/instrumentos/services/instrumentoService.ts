import { http } from "@/features/common/http";
import type { Paginated } from "@/features/common/types";
import type { DatosInstrumento, FiltrosInstrumento, Instrumento } from "../domain/types";

export const instrumentoService = {
  listar: (filtros: FiltrosInstrumento, signal?: AbortSignal) =>
    http<Paginated<Instrumento>>("/instrumentos", { query: { ...filtros }, signal }),
  crear: (datos: DatosInstrumento) => http<Instrumento>("/instrumentos", { method: "POST", body: datos }),
  actualizar: (id: number, datos: DatosInstrumento) =>
    http<Instrumento>(`/instrumentos/${id}`, { method: "PUT", body: datos }),
  eliminar: (id: number) => http<void>(`/instrumentos/${id}`, { method: "DELETE" }),
};
