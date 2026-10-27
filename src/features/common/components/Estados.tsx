import type { ReactNode } from "react";

export function Cargando({ texto = "Cargando…" }: { texto?: string }) {
  return (
    <p role="status" className="flex items-center gap-3 rounded-[16px] border border-dashed border-linea bg-superficie p-4">
      <span
        aria-hidden="true"
        className="inline-block size-4 animate-spin rounded-full border-2 border-linea border-t-terracota"
      />
      {texto}
    </p>
  );
}

export function Vacio({ children }: { children: ReactNode }) {
  return <p className="rounded-[16px] border border-dashed border-linea bg-superficie p-4">{children}</p>;
}

export function ErrorMensaje({ mensaje, onReintentar }: { mensaje: string; onReintentar?: () => void }) {
  return (
    <div role="alert" className="rounded-[16px] border border-error bg-superficie p-4 text-error">
      <p className="m-0">{mensaje}</p>
      {onReintentar && (
        <button
          type="button"
          onClick={onReintentar}
          className="mt-2 cursor-pointer font-bold underline underline-offset-4"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}

export function Exito({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="rounded-[16px] border border-exito bg-superficie p-4 text-exito">
      {children}
    </p>
  );
}
