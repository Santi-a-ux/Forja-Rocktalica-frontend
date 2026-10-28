"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Button } from "@/features/common/components/Button";
import { Cargando, Exito } from "@/features/common/components/Estados";
import { Select, Textarea } from "@/features/common/components/Field";
import { erroresPorCampo, mensajeDeError } from "@/features/common/http";
import { useInstrumentos } from "@/features/instrumentos/hooks/useInstrumentos";
import { useConsultaAcciones } from "../hooks/useConsultas";

type Errores = Record<string, string>;

export function ConsultaForm() {
  const { user, loading } = useAuth();
  const params = useSearchParams();
  const catalogo = useInstrumentos({ page: 1, limit: 50 });
  const acciones = useConsultaAcciones();

  const [instrumentoId, setInstrumentoId] = useState(params.get("instrumento") ?? "");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [enviada, setEnviada] = useState(false);

  if (loading) return <Cargando texto="Verificando tu sesión…" />;

  // El formulario crea la consulta en la API, y la API exige sesión
  if (!user) {
    return (
      <div className="rounded-[16px] border border-linea bg-superficie p-7 shadow-suave">
        <p className="mt-0">Para enviar una consulta o solicitud necesitas una cuenta.</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="rounded-full bg-terracota px-5 py-2.5 font-bold text-[#fffaf1] no-underline hover:bg-terracota-oscura">
            Ingresar
          </Link>
          <Link href="/registro" className="rounded-full border border-linea px-5 py-2.5 font-bold text-tinta no-underline hover:border-terracota">
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  function validar(): Errores {
    const e: Errores = {};
    if (!instrumentoId) e.instrumentoId = "Elige el instrumento que te interesa.";
    if (!mensaje.trim()) e.mensaje = "Cuéntanos qué necesitas.";
    else if (mensaje.trim().length < 20) e.mensaje = "El mensaje debe tener al menos 20 caracteres.";
    return e;
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    setEnviada(false);
    const locales = validar();
    setErrores(locales);
    if (Object.keys(locales).length > 0) return;

    setEnviando(true);
    try {
      await acciones.crear({ instrumentoId: Number(instrumentoId), mensaje: mensaje.trim() });
      setMensaje("");
      setInstrumentoId("");
      setEnviada(true);
    } catch (error) {
      const delServidor = erroresPorCampo(error);
      setErrores(Object.keys(delServidor).length > 0 ? delServidor : { mensaje: mensajeDeError(error) });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <form onSubmit={enviar} noValidate className="grid gap-4 rounded-[16px] border border-linea bg-superficie p-7 shadow-suave">
        <p className="m-0 text-sm text-tinta-suave">
          Enviando como <strong>{user.nombre}</strong> ({user.email}).
        </p>
        <Select id="instrumentoId" etiqueta="Qué instrumento te interesa" value={instrumentoId} onChange={(e) => setInstrumentoId(e.target.value)} error={errores.instrumentoId}>
          <option value="">{catalogo.loading ? "Cargando instrumentos…" : "Elige un instrumento"}</option>
          {catalogo.instrumentos.map((i) => (
            <option key={i.id} value={i.id}>{i.nombre}</option>
          ))}
        </Select>
        <Textarea
          id="mensaje"
          etiqueta="Mensaje"
          placeholder="Cuéntanos qué instrumento o equipo necesitas, tu nivel o el servicio que buscas."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          error={errores.mensaje}
        />
        <Button type="submit" disabled={enviando}>{enviando ? "Enviando…" : "Enviar solicitud"}</Button>
      </form>
      {enviada && (
        <div className="mt-4">
          <Exito>
            ¡Listo! Guardamos tu solicitud. Puedes seguirla en{" "}
            <Link href="/mis-consultas" className="font-bold underline">Mis consultas</Link>.
          </Exito>
        </div>
      )}
    </div>
  );
}
