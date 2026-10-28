import type { Metadata } from "next";
import { SoloInvitados } from "@/features/auth/components/RutaProtegida";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { PageTitle } from "@/features/common/components/PageTitle";

export const metadata: Metadata = { title: "Ingresar" };

export default function LoginPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,28rem)] py-12">
      <PageTitle titulo="Ingresar">Accede para enviar consultas y revisar tus solicitudes.</PageTitle>
      <SoloInvitados>
        <LoginForm />
      </SoloInvitados>
    </main>
  );
}
