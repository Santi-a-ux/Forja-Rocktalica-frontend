import type { Metadata } from "next";
import { Suspense } from "react";
import { Cargando } from "@/features/common/components/Estados";
import { PageTitle } from "@/features/common/components/PageTitle";
import { CatalogoPage } from "@/features/instrumentos/components/CatalogoPage";

export const metadata: Metadata = { title: "Instrumentos" };

export default function InstrumentosPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,70rem)] py-12">
      <PageTitle titulo="Instrumentos rock y metal">
        Explora nuestra selección de instrumentos y equipos para rock y metal. Encuentra guitarras, bajos,
        amplificadores, pedales y accesorios seleccionados para diferentes estilos y niveles de experiencia.
      </PageTitle>
      <Suspense fallback={<Cargando texto="Cargando catálogo…" />}>
        <CatalogoPage />
      </Suspense>
    </main>
  );
}
