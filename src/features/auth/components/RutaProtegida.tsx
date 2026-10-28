"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Cargando } from "@/features/common/components/Estados";
import type { Role } from "../domain/types";
import { useAuth } from "../hooks/useAuth";

/**
 * Experiencia de usuario: sin sesión → /login; sesión sin el rol pedido → inicio.
 * La protección REAL está en la API (401/403); esto solo evita mostrar pantallas que no corresponden.
 */
export function RutaProtegida({ rol, children }: { rol?: Role; children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const permitido = !!user && (!rol || user.role === rol);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
    else if (rol && user.role !== rol) router.replace("/");
  }, [loading, user, rol, router]);

  if (loading || !permitido) return <Cargando texto="Verificando tu sesión…" />;
  return <>{children}</>;
}

/** Para /login y /registro: con sesión activa redirige al inicio. */
export function SoloInvitados({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) router.replace("/");
  }, [loading, user, router]);

  if (loading || user) return <Cargando texto="Un momento…" />;
  return <>{children}</>;
}
