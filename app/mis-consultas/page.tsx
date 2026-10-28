import type { Metadata } from "next";
import { RutaProtegida } from "@/features/auth/components/RutaProtegida";
import { PageTitle } from "@/features/common/components/PageTitle";
import { MisConsultas } from "@/features/consultas/components/MisConsultas";

export const metadata: Metadata = { title: "Mis consultas" };

export default function MisConsultasPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,48rem)] py-12">
      <PageTitle titulo="Mis consultas">Aquí están las solicitudes que has enviado a Forja Rocktalica.</PageTitle>
      <RutaProtegida>
        <MisConsultas />
      </RutaProtegida>
    </main>
  );
}
