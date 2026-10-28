import { http } from "@/features/common/http";
import type { Paginated } from "@/features/common/types";
import type { Consulta, EstadoConsulta, NuevaConsulta } from "../domain/types";

export const consultaService = {
  crear: (datos: NuevaConsulta) => http<Consulta>("/consultas", { method: "POST", body: datos }),
  mias: (page: number, signal?: AbortSignal) =>
    http<Paginated<Consulta>>("/consultas/mias", { query: { page, limit: 6 }, signal }),
  todas: (page: number, signal?: AbortSignal) =>
    http<Paginated<Consulta>>("/consultas", { query: { page, limit: 6 }, signal }),
  cambiarEstado: (id: number, estado: EstadoConsulta) =>
    http<Consulta>(`/consultas/${id}/estado`, { method: "PATCH", body: { estado } }),
  eliminar: (id: number) => http<void>(`/consultas/${id}`, { method: "DELETE" }),
};
