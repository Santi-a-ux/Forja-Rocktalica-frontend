"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  // Cierra el menú móvil al cambiar de página o con Escape
  useEffect(() => setAbierto(false), [pathname]);
  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, []);

  const enlaces: { href: string; texto: string }[] = [
    { href: "/", texto: "Inicio" },
    { href: "/instrumentos", texto: "Instrumentos" },
    { href: "/marcas", texto: "Marcas" },
    { href: "/contacto", texto: "Contacto" },
  ];
  if (user) enlaces.push({ href: "/mis-consultas", texto: "Mis consultas" });
  if (user?.role === "admin") enlaces.push({ href: "/admin", texto: "Administración" });

  const claseEnlace = (href: string) =>
    `block py-[0.45rem] font-semibold no-underline ${
      (href === "/" ? pathname === "/" : pathname.startsWith(href)) ? "text-terracota" : "text-tinta"
    }`;

  return (
    <header className="sticky top-0 z-10 border-b border-linea bg-fondo/90 backdrop-blur-md">
      <div className="mx-auto w-[min(100%-2rem,70rem)]">
        <div className="flex min-h-[4.4rem] flex-wrap items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-[0.7rem] font-display font-semibold tracking-wide text-tinta no-underline">
            <Logo />
            Forja Rocktalica
          </Link>

          <nav aria-label="Principal" className="order-3 w-full md:order-none md:w-auto">
            <ul
              id="menu-principal"
              className={`m-0 list-none flex-col gap-1 p-0 pb-3 md:flex md:flex-row md:items-center md:gap-5 md:pb-0 ${
                abierto ? "flex" : "hidden"
              }`}
            >
              {enlaces.map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className={claseEnlace(e.href)}
                    aria-current={(e.href === "/" ? pathname === "/" : pathname.startsWith(e.href)) ? "page" : undefined}
                  >
                    {e.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {loading ? null : user ? (
              <>
                <span className="hidden max-w-40 truncate text-sm text-tinta-suave sm:inline" title={user.email}>
                  {user.nombre}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="cursor-pointer rounded-full border border-linea bg-superficie px-[0.85rem] py-[0.45rem] font-semibold"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="rounded-full bg-terracota px-[0.95rem] py-[0.45rem] font-bold text-[#fffaf1] no-underline hover:bg-terracota-oscura"
              >
                Ingresar
              </Link>
            )}
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={abierto}
              aria-controls="menu-principal"
              onClick={() => setAbierto((v) => !v)}
              className="cursor-pointer rounded-full border border-linea bg-superficie px-[0.85rem] py-[0.45rem] md:hidden"
            >
              Menú
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
