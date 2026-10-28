"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/features/common/components/Button";
import { Input } from "@/features/common/components/Field";
import { ApiError, erroresPorCampo } from "@/features/common/http";
import { useAuth } from "../hooks/useAuth";

type Errores = Record<string, string>;

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);

  function validar(): Errores {
    const e: Errores = {};
    if (!email.trim()) e.email = "Escribe tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "El correo no tiene un formato válido.";
    if (!password) e.password = "Escribe tu contraseña.";
    return e;
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    const locales = validar();
    setErrores(locales);
    if (Object.keys(locales).length > 0) return;

    setEnviando(true);
    try {
      await login({ email: email.trim(), password });
      router.replace("/");
    } catch (error) {
      const delServidor = erroresPorCampo(error);
      if (Object.keys(delServidor).length > 0) setErrores(delServidor);
      else if (error instanceof ApiError && error.status === 401) setErrores({ password: error.message });
      else setErrores({ password: error instanceof Error ? error.message : "No se pudo iniciar sesión." });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-4 rounded-[16px] border border-linea bg-superficie p-7 shadow-suave">
      <Input id="email" etiqueta="Correo" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errores.email} />
      <Input id="password" etiqueta="Contraseña" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errores.password} />
      <Button type="submit" disabled={enviando}>
        {enviando ? "Ingresando…" : "Ingresar"}
      </Button>
      <p className="m-0 text-tinta-suave">
        ¿Aún no tienes cuenta?{" "}
        <Link href="/registro" className="font-bold text-bosque">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
