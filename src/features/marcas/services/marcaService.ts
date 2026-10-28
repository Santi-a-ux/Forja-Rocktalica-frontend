import { http } from "@/features/common/http";
import type { Marca } from "../domain/types";

export const marcaService = {
  listar: (signal?: AbortSignal) => http<{ data: Marca[] }>("/marcas", { signal }),
};
