"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mensajeDeError } from "../http";

interface EstadoCarga<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  recargar: () => void;
}

/**
 * Carga datos de la API con estados de cargando / error, cancelación al desmontar
 * y recarga manual. `clave` identifica la consulta: cuando cambia, se vuelve a cargar.
 */
export function useCarga<T>(
  cargar: (signal: AbortSignal) => Promise<T>,
  clave: string,
  habilitado = true,
): EstadoCarga<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(habilitado);
  const [error, setError] = useState<string | null>(null);
  const [recarga, setRecarga] = useState(0);

  const cargarRef = useRef(cargar);
  useEffect(() => {
    cargarRef.current = cargar;
  });

  useEffect(() => {
    if (!habilitado) return;
    const controlador = new AbortController();
    setLoading(true);
    setError(null);
    cargarRef
      .current(controlador.signal)
      .then((resultado) => {
        setData(resultado);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (controlador.signal.aborted) return;
        setError(mensajeDeError(e));
        setLoading(false);
      });
    return () => controlador.abort();
  }, [clave, recarga, habilitado]);

  const recargar = useCallback(() => setRecarga((n) => n + 1), []);
  return { data, loading, error, recargar };
}
