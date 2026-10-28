import type { Marca } from "@/features/marcas/domain/types";

export const CATEGORIAS = ["Guitarra", "Bajo", "Amplificador", "Pedal", "Accesorios"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export const ETIQUETA_CATEGORIA: Record<Categoria, string> = {
  Guitarra: "Guitarras",
  Bajo: "Bajos",
  Amplificador: "Amplificadores",
  Pedal: "Pedales",
  Accesorios: "Accesorios",
};

export interface Instrumento {
  id: number;
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
  foto: string;
  alt: string;
  marcaId: number;
  marca?: Marca;
}

export interface DatosInstrumento {
  nombre: string;
  categoria: Categoria;
  precio: number;
  descripcion: string;
  foto: string;
  alt: string;
  marcaId: number;
}

export interface FiltrosInstrumento {
  page: number;
  limit: number;
  categoria?: Categoria;
  q?: string;
  minPrecio?: number;
  maxPrecio?: number;
}
