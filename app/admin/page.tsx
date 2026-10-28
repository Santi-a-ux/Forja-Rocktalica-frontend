import type { Metadata } from "next";
import { RutaProtegida } from "@/features/auth/components/RutaProtegida";
import { PageTitle } from "@/features/common/components/PageTitle";
import { AdminPanel } from "@/features/common/components/AdminPanel";

export const metadata: Metadata = { title: "Administración" };

export default function AdminPage() {
  return (
    <main id="contenido" className="mx-auto w-[min(100%-2rem,70rem)] py-12">
      <PageTitle titulo="Administración">Gestiona el catálogo de instrumentos y las consultas de los clientes.</PageTitle>
      <RutaProtegida rol="admin">
        <AdminPanel />
      </RutaProtegida>
    </main>
  );
}
