import { Cargando, ErrorMensaje, Vacio } from "@/features/common/components/Estados";
import type { Instrumento } from "../domain/types";
import { InstrumentoCard } from "./InstrumentoCard";

interface CatalogoGridProps {
  instrumentos: Instrumento[];
  loading: boolean;
  error: string | null;
  onReintentar: () => void;
  textoVacio?: string;
}

/** Muestra los tres estados de la lista: cargando, error y vacío. */
export function CatalogoGrid({ instrumentos, loading, error, onReintentar, textoVacio }: CatalogoGridProps) {
  if (loading) return <Cargando texto="Cargando instrumentos…" />;
  if (error) return <ErrorMensaje mensaje={error} onReintentar={onReintentar} />;
  if (instrumentos.length === 0) {
    return <Vacio>{textoVacio ?? "No hay instrumentos que coincidan con tu búsqueda por ahora."}</Vacio>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {instrumentos.map((instrumento) => (
        <InstrumentoCard key={instrumento.id} instrumento={instrumento} />
      ))}
    </div>
  );
}
