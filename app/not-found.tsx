import { LinkButton } from "@/features/common/components/Button";

export default function NotFound() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,36rem)] py-20 text-center">
      <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-terracota">Error 404</p>
      <h1 className="mb-3 mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight">Esta página se quedó sin cuerdas</h1>
      <p className="mb-7 text-tinta-suave">
        No encontramos lo que buscas. Puede que el enlace esté mal escrito o que la página ya no exista.
      </p>
      <div className="flex justify-center gap-2">
        <LinkButton href="/">Volver al inicio</LinkButton>
        <LinkButton href="/instrumentos" variante="suave">Ver instrumentos</LinkButton>
      </div>
    </main>
  );
}
