import { API_BASE_URL, TOKEN_KEY } from "./config";

export interface FieldError {
  campo: string;
  mensaje: string;
}

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly detalles: FieldError[] = [],
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// ---- Token (se guarda en localStorage) ----
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

// ---- Manejo centralizado del 401 ----
let onUnauthorized: (() => void) | null = null;

/** AuthProvider registra aquí qué hacer cuando la API responde 401 con una sesión activa. */
export function setUnauthorizedHandler(handler: (() => void) | null): void {
  onUnauthorized = handler;
}

interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  query?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
}

interface ErrorBody {
  error?: { mensaje?: string; detalles?: FieldError[] };
}

/** Cliente HTTP único de la app: agrega Authorization automáticamente y cierra sesión ante un 401. */
export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, query, signal } = options;

  const params = new URLSearchParams();
  Object.entries(query ?? {}).forEach(([clave, valor]) => {
    if (valor !== undefined && valor !== "") params.set(clave, String(valor));
  });
  const queryString = params.toString();
  const url = `${API_BASE_URL}${path}${queryString ? `?${queryString}` : ""}`;

  const token = getToken();
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new ApiError(0, "No pudimos conectar con el servidor. Intenta de nuevo en unos segundos.");
  }

  if (response.status === 401 && token) {
    // La sesión ya no es válida (token expirado o inválido): se cierra y se envía a /login
    clearToken();
    onUnauthorized?.();
  }

  if (response.status === 204) return undefined as T;

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorBody = (data ?? {}) as ErrorBody;
    throw new ApiError(
      response.status,
      errorBody.error?.mensaje ?? "Ocurrió un error inesperado",
      errorBody.error?.detalles ?? [],
    );
  }
  return data as T;
}

/** Convierte los detalles del backend en un objeto { campo: mensaje } para mostrarlos junto a cada campo. */
export function erroresPorCampo(error: unknown): Record<string, string> {
  const resultado: Record<string, string> = {};
  if (error instanceof ApiError) {
    error.detalles.forEach((d) => {
      if (!(d.campo in resultado)) resultado[d.campo] = d.mensaje;
    });
  }
  return resultado;
}

export function mensajeDeError(error: unknown): string {
  return error instanceof Error ? error.message : "Ocurrió un error inesperado";
}
