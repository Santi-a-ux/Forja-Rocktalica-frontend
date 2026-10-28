import Link from "next/link";
import { LinkButton } from "@/features/common/components/Button";
import { DestacadosHome } from "@/features/instrumentos/components/DestacadosHome";

const propuesta = [
  {
    titulo: "Instrumentos",
    texto: "Guitarras eléctricas, bajos, baterías y otros instrumentos pensados para diferentes estilos de Rock y Metal.",
  },
  {
    titulo: "Indumentaria",
    texto: "Camisetas, chaquetas, accesorios y prendas inspiradas en la cultura del Rock y el Metal.",
  },
  {
    titulo: "Accesorios y equipo",
    texto: "Amplificadores, pedales, correas, púas y otros elementos para completar tu equipo.",
  },
];

export default function HomePage() {
  const contenedor = "mx-auto w-[min(100%-2rem,70rem)]";
  return (
    <main id="contenido">
      <section className={`${contenedor} grid items-center gap-7 py-12 md:grid-cols-[1.1fr_0.9fr] md:py-20`} aria-labelledby="titulo-inicio">
        <div>
          <p className="m-0 text-xs font-bold uppercase tracking-[0.08em] text-terracota">Rock · Metal · Bogotá</p>
          <h1 id="titulo-inicio" className="mb-4 mt-2 font-display text-[clamp(2.1rem,5vw,4rem)] leading-[1.1]">
            Tu sonido. Tu estilo. Tu equipo.
          </h1>
          <p className="m-0 max-w-[38rem] text-[1.15rem] text-tinta-suave">
            Forja Rocktalica reúne instrumentos, indumentaria y accesorios para quienes viven el Rock y el Metal.
            Encuentra el equipo que necesitas para tocar, ensayar, grabar y llevar tu estilo contigo.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            <LinkButton href="/instrumentos">Ver instrumentos</LinkButton>
            <LinkButton href="/contacto" variante="suave">Contáctanos</LinkButton>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&h=900&q=80"
          width={1200}
          height={900}
          alt="Guitarra eléctrica y equipo musical en un espacio de ensayo"
          className="aspect-[4/3] w-full rounded-[16px] object-cover shadow-suave"
        />
      </section>

      <section className={`${contenedor} py-12`} aria-labelledby="titulo-para-quien">
        <h2 id="titulo-para-quien" className="mb-2 mt-0 font-display text-[clamp(1.7rem,3vw,2.3rem)] leading-tight">
          Todo para la escena Rock y Metal
        </h2>
        <p className="mb-7 max-w-[40rem] text-tinta-suave">
          No se trata solo de comprar un instrumento. Se trata de encontrar el sonido, el equipo y el estilo que
          representan la música que te gusta.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {propuesta.map((p) => (
            <article key={p.titulo} className="rounded-[16px] border border-linea bg-superficie p-7 shadow-suave">
              <h3 className="mt-0 font-display text-xl">{p.titulo}</h3>
              <p className="mb-0">{p.texto}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${contenedor} py-12`} aria-labelledby="titulo-destacados">
        <h2 id="titulo-destacados" className="mb-2 mt-0 font-display text-[clamp(1.7rem,3vw,2.3rem)] leading-tight">
          Productos destacados
        </h2>
        <p className="mb-7 max-w-[40rem] text-tinta-suave">
          Explora algunos de los productos disponibles. En el catálogo encontrarás más instrumentos y accesorios.
        </p>
        <DestacadosHome />
        <p className="mt-6">
          <Link href="/instrumentos" className="font-bold text-bosque">Ver todo el catálogo</Link>
        </p>
      </section>

      <section className={`${contenedor} py-12`} aria-labelledby="titulo-relacion">
        <h2 id="titulo-relacion" className="mb-2 mt-0 font-display text-[clamp(1.7rem,3vw,2.3rem)] leading-tight">
          Las marcas detrás del sonido
        </h2>
        <p className="mb-7 max-w-[40rem] text-tinta-suave">
          Trabajamos con marcas reconocidas dentro del mundo del Rock y el Metal. Descubre qué ofrece cada una y
          encuentra los instrumentos y productos que mejor se adaptan a tu estilo.
        </p>
        <LinkButton href="/marcas">Conocer las marcas</LinkButton>
      </section>
    </main>
  );
}
