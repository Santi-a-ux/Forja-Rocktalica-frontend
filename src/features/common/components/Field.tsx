import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const controlBase =
  "rounded-[10px] border border-linea bg-fondo px-3 py-[0.7rem] font-[inherit] text-tinta aria-[invalid=true]:border-error";

interface CampoProps {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
  children: ReactNode;
}

function Campo({ id, etiqueta, error, ayuda, children }: CampoProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-bold">
        {etiqueta}
      </label>
      {children}
      {ayuda && !error && <p className="m-0 text-sm text-tinta-suave">{ayuda}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="m-0 text-[0.92rem] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
};

export function Input({ id, etiqueta, error, ayuda, className = "", ...props }: InputProps) {
  return (
    <Campo id={id} etiqueta={etiqueta} error={error} ayuda={ayuda}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${controlBase} ${className}`}
        {...props}
      />
    </Campo>
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  etiqueta: string;
  error?: string;
  children: ReactNode;
};

export function Select({ id, etiqueta, error, children, className = "", ...props }: SelectProps) {
  return (
    <Campo id={id} etiqueta={etiqueta} error={error}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${controlBase} ${className}`}
        {...props}
      >
        {children}
      </select>
    </Campo>
  );
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  etiqueta: string;
  error?: string;
  ayuda?: string;
};

export function Textarea({ id, etiqueta, error, ayuda, className = "", ...props }: TextareaProps) {
  return (
    <Campo id={id} etiqueta={etiqueta} error={error} ayuda={ayuda}>
      <textarea
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-32 resize-y ${controlBase} ${className}`}
        {...props}
      />
    </Campo>
  );
}
