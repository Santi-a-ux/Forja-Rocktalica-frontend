import type { Metadata } from "next";
import { SoloInvitados } from "@/features/auth/components/RutaProtegida";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { PageTitle } from "@/features/common/components/PageTitle";

export const metadata: Metadata = { title: "Crear cuenta" };

export default function RegistroPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,28rem)] py-12">
      <PageTitle titulo="Crear cuenta">Regístrate para hacer consultas sobre los instrumentos de Forja Rocktalica.</PageTitle>
      <SoloInvitados>
        <RegisterForm />
      </SoloInvitados>
    </main>
  );
}
