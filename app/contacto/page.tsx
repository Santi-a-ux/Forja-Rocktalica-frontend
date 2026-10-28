import type { Metadata } from "next";
import { Suspense } from "react";
import { Cargando } from "@/features/common/components/Estados";
import { PageTitle } from "@/features/common/components/PageTitle";
import { ConsultaForm } from "@/features/consultas/components/ConsultaForm";

export const metadata: Metadata = { title: "Contacto, clases y servicios" };

const agenda = [
  {
    titulo: "Clase de guitarra eléctrica, sábados 10:00",
    texto:
      "Ocho sesiones enfocadas en técnica, acordes, riffs y fundamentos para tocar rock y metal. Ideal para principiantes y músicos que quieran mejorar su ejecución.",
  },
  {
    titulo: "Setup de pedalera, sábados 14:00",
    texto:
      "Aprende a organizar tu cadena de efectos, configurar niveles y combinar distorsión, overdrive, delay y otros efectos para construir tu propio sonido.",
  },
  {
    titulo: "Encargo de instrumento a medida",
    texto:
      "Define las características del instrumento que buscas, incluyendo tipo de guitarra o bajo, configuración, componentes y presupuesto. El equipo de Forja Rocktalica revisará tu solicitud antes de confirmar el encargo.",
  },
];

export default function ContactoPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,70rem)] py-12">
      <PageTitle titulo="Clases y servicios para rock y metal">
        Aprende, personaliza y mantén tu equipo musical con servicios pensados para guitarristas, bajistas y
        músicos de rock y metal.
      </PageTitle>

      <div className="grid items-start gap-7 md:grid-cols-2">
        <section aria-labelledby="titulo-agenda" className="grid gap-4">
          <h2 id="titulo-agenda" className="m-0 font-display text-2xl">Agenda del mes</h2>
          {agenda.map((a) => (
            <article key={a.titulo} className="rounded-[16px] border border-linea bg-superficie p-7 shadow-suave">
              <h3 className="mt-0 font-display text-xl">{a.titulo}</h3>
              <p className="mb-0">{a.texto}</p>
            </article>
          ))}
        </section>

        <section id="formulario" aria-labelledby="titulo-formulario" className="grid gap-4">
          <h2 id="titulo-formulario" className="m-0 font-display text-2xl">Consulta o solicitud</h2>
          <p className="m-0 text-[0.92rem] text-tinta-suave">
            Elige el instrumento por el que preguntas y cuéntanos qué necesitas. Tu solicitud queda guardada en tu
            cuenta y la puedes revisar en «Mis consultas».
          </p>
          <Suspense fallback={<Cargando />}>
            <ConsultaForm />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
