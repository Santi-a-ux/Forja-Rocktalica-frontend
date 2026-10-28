"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/features/common/components/Button";
import { Input, Select, Textarea } from "@/features/common/components/Field";
import { erroresPorCampo, mensajeDeError } from "@/features/common/http";
import type { Marca } from "@/features/marcas/domain/types";
import { CATEGORIAS, type Categoria, type DatosInstrumento, type Instrumento } from "../domain/types";

type Errores = Record<string, string>;

interface InstrumentoFormProps {
  inicial?: Instrumento;
  marcas: Marca[];
  onGuardar: (datos: DatosInstrumento) => Promise<void>;
  onCancelar: () => void;
}

export function InstrumentoForm({ inicial, marcas, onGuardar, onCancelar }: InstrumentoFormProps) {
  const [nombre, setNombre] = useState(inicial?.nombre ?? "");
  const [categoria, setCategoria] = useState<string>(inicial?.categoria ?? "");
  const [marcaId, setMarcaId] = useState(inicial ? String(inicial.marcaId) : "");
  const [precio, setPrecio] = useState(inicial ? String(inicial.precio) : "");
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? "");
  const [foto, setFoto] = useState(inicial?.foto ?? "");
  const [alt, setAlt] = useState(inicial?.alt ?? "");
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);

  function validar(): Errores {
    const e: Errores = {};
    if (nombre.trim().length < 3) e.nombre = "El nombre debe tener al menos 3 caracteres.";
    if (!categoria) e.categoria = "Elige una categoría.";
    if (!marcaId) e.marcaId = "Elige una marca.";
    if (!(Number(precio) > 0)) e.precio = "El precio debe ser mayor que 0.";
    if (descripcion.trim().length < 10) e.descripcion = "La descripción debe tener al menos 10 caracteres.";
    if (!foto.trim()) e.foto = "Indica la ruta o URL de la foto.";
    if (alt.trim().length < 3) e.alt = "Escribe un texto alternativo para la imagen.";
    return e;
  }

  async function enviar(evento: FormEvent) {
    evento.preventDefault();
    const locales = validar();
    setErrores(locales);
    if (Object.keys(locales).length > 0) return;

    setEnviando(true);
    try {
      await onGuardar({
        nombre: nombre.trim(),
        categoria: categoria as Categoria,
        marcaId: Number(marcaId),
        precio: Math.round(Number(precio)),
        descripcion: descripcion.trim(),
        foto: foto.trim(),
        alt: alt.trim(),
      });
    } catch (error) {
      const delServidor = erroresPorCampo(error);
      setErrores(Object.keys(delServidor).length > 0 ? delServidor : { nombre: mensajeDeError(error) });
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} noValidate className="mb-8 grid gap-4 rounded-[16px] border border-linea bg-superficie p-6 shadow-suave">
      <h3 className="m-0 font-display text-xl">{inicial ? `Editar: ${inicial.nombre}` : "Nuevo instrumento"}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Input id="nombre" etiqueta="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} error={errores.nombre} />
        <Input id="precio" etiqueta="Precio (COP)" type="number" min={1} value={precio} onChange={(e) => setPrecio(e.target.value)} error={errores.precio} />
        <Select id="categoria" etiqueta="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} error={errores.categoria}>
          <option value="">Elige una categoría</option>
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Select id="marcaId" etiqueta="Marca" value={marcaId} onChange={(e) => setMarcaId(e.target.value)} error={errores.marcaId}>
          <option value="">Elige una marca</option>
          {marcas.map((m) => (
            <option key={m.id} value={m.id}>{m.nombre}</option>
          ))}
        </Select>
        <Input id="foto" etiqueta="Foto (ruta o URL)" ayuda="Por ejemplo: /img/fender-stratocaster.jpg" value={foto} onChange={(e) => setFoto(e.target.value)} error={errores.foto} />
        <Input id="alt" etiqueta="Texto alternativo de la foto" value={alt} onChange={(e) => setAlt(e.target.value)} error={errores.alt} />
      </div>
      <Textarea id="descripcion" etiqueta="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} error={errores.descripcion} />
      <div className="flex flex-wrap gap-2">
        <Button type="submit" disabled={enviando}>{enviando ? "Guardando…" : "Guardar"}</Button>
        <Button type="button" variante="suave" onClick={onCancelar}>Cancelar</Button>
      </div>
    </form>
  );
}
