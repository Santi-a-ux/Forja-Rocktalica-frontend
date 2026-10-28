import type { Metadata } from "next";
import { PageTitle } from "@/features/common/components/PageTitle";
import { MarcasLista } from "@/features/marcas/components/MarcasLista";

export const metadata: Metadata = { title: "Marcas" };

export default function MarcasPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,70rem)] py-12">
      <PageTitle titulo="Los constructores detrás del sonido">
        Conoce las marcas y fabricantes que han construido algunos de los sonidos más reconocibles del rock y el
        metal. Desde guitarras y bajos hasta amplificadores diseñados para diferentes estilos y formas de tocar.
      </PageTitle>
      <MarcasLista />
    </main>
  );
}
