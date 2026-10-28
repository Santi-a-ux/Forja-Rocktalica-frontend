"use client";

import { useState } from "react";
import { AdminConsultas } from "@/features/consultas/components/AdminConsultas";
import { AdminInstrumentos } from "@/features/instrumentos/components/AdminInstrumentos";

type Pestana = "instrumentos" | "consultas";

export function AdminPanel() {
  const [pestana, setPestana] = useState<Pestana>("instrumentos");

  const clase = (activa: boolean) =>
    `cursor-pointer rounded-full border px-4 py-1.5 font-bold ${
      activa ? "border-bosque-oscuro bg-bosque-oscuro text-[#fffaf1]" : "border-linea bg-superficie text-tinta"
    }`;

  return (
    <div>
      <div role="group" aria-label="Secciones de administración" className="mb-7 flex gap-2">
        <button type="button" aria-pressed={pestana === "instrumentos"} className={clase(pestana === "instrumentos")} onClick={() => setPestana("instrumentos")}>
          Instrumentos
        </button>
        <button type="button" aria-pressed={pestana === "consultas"} className={clase(pestana === "consultas")} onClick={() => setPestana("consultas")}>
          Consultas
        </button>
      </div>
      {pestana === "instrumentos" ? <AdminInstrumentos /> : <AdminConsultas />}
    </div>
  );
}
