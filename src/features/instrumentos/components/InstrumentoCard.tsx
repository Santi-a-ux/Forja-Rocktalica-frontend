import Link from "next/link";
import { formatearPrecio } from "@/features/common/format";
import type { Instrumento } from "../domain/types";

export function InstrumentoCard({ instrumento }: { instrumento: Instrumento }) {
  const { marca } = instrumento;
  return (
    <article className="flex flex-col overflow-hidden rounded-[16px] border border-linea bg-superficie shadow-suave transition duration-300 hover:-translate-y-1">
      <figure className="m-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={instrumento.foto}
          alt={instrumento.alt}
          width={800}
          height={560}
          loading="lazy"
          decoding="async"
          className="aspect-[5/3.5] w-full object-cover"
        />
      </figure>
      <div className="flex flex-1 flex-col gap-[0.45rem] p-[1.1rem]">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-terracota">{instrumento.categoria}</p>
        <h3 className="m-0 font-display text-xl leading-tight">{instrumento.nombre}</h3>
        <p className="m-0">{instrumento.descripcion}</p>
        {marca && (
          <p className="m-0 text-[0.95rem] text-tinta-suave">
            Marca {marca.nombre} · {marca.ciudad}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <p className="m-0 font-bold">{formatearPrecio(instrumento.precio)}</p>
          <Link href={`/contacto?instrumento=${instrumento.id}`} className="font-bold text-bosque no-underline hover:text-terracota">
            Encargar o consultar
          </Link>
        </div>
      </div>
    </article>
  );
}
