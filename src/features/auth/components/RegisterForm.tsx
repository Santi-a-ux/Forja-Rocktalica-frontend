"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/features/common/components/Button";
import { Input } from "@/features/common/components/Field";
import { erroresPorCampo, mensajeDeError } from "@/features/common/http";
import { useAuth } from "../hooks/useAuth";

type Errores = Record<string, string>;

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);

  function validar(): Errores {
    const e: Errores = {};
    if (nombre.trim().length < 3) e.nombre = "El nombre debe tener al menos 3 caracteres.";
    if (!email.trim()) e.email = "Escribe tu correo.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) e.email = "El correo no tiene un formato válido.";
    if (password.length < 8) e.password = "La contraseña debe tener al menos 8 caracteres.";
    if (confirmar !== password) e.confirmar = "Las contraseñas no coinciden.";
    return e;
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    const locales = validar();
    setErrores(locales);
    if (Object.keys(locales).length > 0) return;

    setEnviando(true);
    try {
      await register({ nombre: nombre.trim(), email: email.trim(), password });
      router.replace("/");
    } catch (error) {
      // Los errores del backend (por ejemplo 409 de correo repetido) se muestran junto al campo
      const delServidor = erroresPorCampo(error);
      setErrores(Object.keys(delServidor).length > 0 ? delServidor : { email: mensajeDeError(error) });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="grid gap-4 rounded-[16px] border border-linea bg-superficie p-7 shadow-suave">
      <Input id="nombre" etiqueta="Nombre completo" autoComplete="name" value={nombre} onChange={(e) => setNombre(e.target.value)} error={errores.nombre} />
      <Input id="email" etiqueta="Correo" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errores.email} />
      <Input id="password" etiqueta="Contraseña" type="password" autoComplete="new-password" ayuda="Mínimo 8 caracteres." value={password} onChange={(e) => setPassword(e.target.value)} error={errores.password} />
      <Input id="confirmar" etiqueta="Confirmar contraseña" type="password" autoComplete="new-password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} error={errores.confirmar} />
      <Button type="submit" disabled={enviando}>
        {enviando ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
      <p className="m-0 text-tinta-suave">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-bold text-bosque">
          Ingresa
        </Link>
      </p>
    </form>
  );
}
