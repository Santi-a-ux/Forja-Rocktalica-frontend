"use client";

import { Cargando, ErrorMensaje, Vacio } from "@/features/common/components/Estados";
import { formatearPrecio } from "@/features/common/format";
import { useInstrumentos } from "@/features/instrumentos/hooks/useInstrumentos";
import { useMarcas } from "../hooks/useMarcas";

export function MarcasLista() {
  const marcas = useMarcas();
  // Se piden todos los instrumentos (hasta 50) para listar las obras de cada marca
  const catalogo = useInstrumentos({ page: 1, limit: 50 });

  if (marcas.loading || catalogo.loading) return <Cargando texto="Cargando marcas…" />;
  if (marcas.error) return <ErrorMensaje mensaje={marcas.error} onReintentar={marcas.recargar} />;
  if (marcas.marcas.length === 0) return <Vacio>Todavía no hay marcas registradas.</Vacio>;

  return (
    <div className="grid gap-7">
      {marcas.marcas.map((marca) => {
        // Los accesorios no se listan como "obras" de la marca
        const obras = catalogo.instrumentos.filter((i) => i.marcaId === marca.id && i.categoria !== "Accesorios");
        return (
          <article key={marca.id} id={String(marca.id)} className="grid overflow-hidden rounded-[16px] border border-linea bg-superficie shadow-suave md:grid-cols-[280px_1fr]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={marca.foto} alt={marca.alt} width={600} height={600} loading="lazy" className="aspect-square w-full object-cover md:aspect-auto md:h-full" />
            <div className="p-7">
              <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-terracota">{marca.especialidad}</p>
              <h2 className="mb-1 mt-2 font-display text-2xl leading-tight">{marca.nombre}</h2>
              <p className="m-0 text-[0.95rem] text-tinta-suave">{marca.ciudad}</p>
              <p className="mt-3">{marca.bio}</p>
              {obras.length > 0 && (
                <ul className="mt-3 list-disc pl-5">
                  {obras.map((obra) => (
                    <li key={obra.id}>
                      {obra.nombre} — {formatearPrecio(obra.precio)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
