"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/features/common/components/Button";
import { CATEGORIAS, ETIQUETA_CATEGORIA, type Categoria } from "../domain/types";

const estiloControl = "rounded-[10px] border border-linea bg-fondo px-3 py-2 font-[inherit] text-tinta";

/** Filtros combinados (categoría + texto + rango de precio). Viven en la URL, igual que la paginación. */
export function CatalogoFiltros() {
  const router = useRouter();
  const params = useSearchParams();

  const categoriaActiva = params.get("categoria") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [min, setMin] = useState(params.get("minPrecio") ?? "");
  const [max, setMax] = useState(params.get("maxPrecio") ?? "");

  function irA(cambios: Record<string, string>) {
    const siguiente = new URLSearchParams(params.toString());
    Object.entries(cambios).forEach(([clave, valor]) => {
      if (valor) siguiente.set(clave, valor);
      else siguiente.delete(clave);
    });
    siguiente.delete("page"); // al cambiar un filtro se vuelve a la página 1
    const texto = siguiente.toString();
    router.push(texto ? `/instrumentos?${texto}` : "/instrumentos");
  }

  function buscar(evento: FormEvent) {
    evento.preventDefault();
    irA({ q: q.trim(), minPrecio: min, maxPrecio: max });
  }

  function limpiar() {
    setQ("");
    setMin("");
    setMax("");
    router.push("/instrumentos");
  }

  const botonCategoria = (activa: boolean) =>
    `cursor-pointer rounded-full border px-[0.9rem] py-[0.4rem] transition ${
      activa
        ? "border-bosque-oscuro bg-bosque-oscuro text-[#fffaf1]"
        : "border-linea bg-superficie text-tinta hover:border-terracota"
    }`;

  return (
    <div className="mb-8 grid gap-4">
      <div role="group" aria-label="Filtrar instrumentos por categoría" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={categoriaActiva === ""} className={botonCategoria(categoriaActiva === "")} onClick={() => irA({ categoria: "" })}>
          Todos
        </button>
        {CATEGORIAS.map((categoria: Categoria) => (
          <button
            key={categoria}
            type="button"
            aria-pressed={categoriaActiva === categoria}
            className={botonCategoria(categoriaActiva === categoria)}
            onClick={() => irA({ categoria })}
          >
            {ETIQUETA_CATEGORIA[categoria]}
          </button>
        ))}
      </div>

      <form onSubmit={buscar} className="flex flex-wrap items-end gap-3" role="search">
        <label className="grid gap-1 text-sm font-bold">
          Buscar
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nombre o descripción" className={`${estiloControl} w-56 font-normal`} />
        </label>
        <label className="grid gap-1 text-sm font-bold">
          Precio mínimo (COP)
          <input type="number" min={0} step={50000} value={min} onChange={(e) => setMin(e.target.value)} className={`${estiloControl} w-40 font-normal`} />
        </label>
        <label className="grid gap-1 text-sm font-bold">
          Precio máximo (COP)
          <input type="number" min={0} step={50000} value={max} onChange={(e) => setMax(e.target.value)} className={`${estiloControl} w-40 font-normal`} />
        </label>
        <Button type="submit">Aplicar</Button>
        <Button type="button" variante="suave" onClick={limpiar}>
          Limpiar
        </Button>
      </form>
    </div>
  );
}
