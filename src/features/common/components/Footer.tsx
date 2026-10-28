import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-linea pb-6 pt-12">
      <div className="mx-auto grid w-[min(100%-2rem,70rem)] gap-7 md:grid-cols-[1.4fr_1fr_1fr]">
        <section>
          <h2 className="mb-2 font-display text-[1.1rem] font-semibold">Forja Rocktalica</h2>
          <p className="m-0">Instrumentos, indumentaria y accesorios para amantes del Rock y el Metal.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-[1.1rem] font-semibold">Sitio</h2>
          <ul className="m-0 list-none space-y-1.5 p-0">
            <li><Link href="/instrumentos" className="text-bosque">Instrumentos</Link></li>
            <li><Link href="/marcas" className="text-bosque">Marcas</Link></li>
            <li><Link href="/contacto" className="text-bosque">Contacto</Link></li>
          </ul>
        </section>
      </div>
      <p className="mx-auto mt-7 w-[min(100%-2rem,70rem)] text-[0.92rem] text-tinta-suave">
        © {new Date().getFullYear()} Forja Rocktalica. Proyecto académico de Desarrollo Web.
      </p>
    </footer>
  );
}
