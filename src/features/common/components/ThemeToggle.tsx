"use client";

import { useEffect, useState } from "react";

type Tema = "claro" | "oscuro";
const CLAVE_TEMA = "forja-tema";

export function ThemeToggle() {
  const [tema, setTema] = useState<Tema | null>(null);

  // El script inline del layout ya puso data-tema; aquí solo se sincroniza el botón
  useEffect(() => {
    setTema(document.documentElement.getAttribute("data-tema") === "oscuro" ? "oscuro" : "claro");
  }, []);

  function alternar() {
    const siguiente: Tema = tema === "oscuro" ? "claro" : "oscuro";
    document.documentElement.setAttribute("data-tema", siguiente);
    try {
      window.localStorage.setItem(CLAVE_TEMA, siguiente);
    } catch {
      /* sin almacenamiento disponible: el tema solo dura esta visita */
    }
    setTema(siguiente);
  }

  return (
    <button
      type="button"
      onClick={alternar}
      aria-pressed={tema === "oscuro"}
      aria-label={tema === "oscuro" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="cursor-pointer whitespace-nowrap rounded-full border border-linea bg-superficie px-[0.85rem] py-[0.45rem] transition hover:-translate-y-px"
    >
      {tema === "oscuro" ? "Claro" : "Oscuro"}
    </button>
  );
}
