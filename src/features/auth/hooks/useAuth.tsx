"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { clearToken, getToken, setToken, setUnauthorizedHandler } from "@/features/common/http";
import type { LoginRequest, RegisterRequest, User } from "../domain/types";
import { authService } from "../services/authService";

interface AuthContextValue {
  user: User | null;
  /** true mientras se recupera la sesión guardada (evita parpadeos y redirecciones falsas) */
  loading: boolean;
  login: (datos: LoginRequest) => Promise<void>;
  register: (datos: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Si la API responde 401 con una sesión activa, el cliente HTTP llama a este manejador
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setUser(null);
      router.replace("/login");
    });
    return () => setUnauthorizedHandler(null);
  }, [router]);

  // La sesión sobrevive al refrescar: se recupera el token guardado y se valida contra /auth/me
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    authService
      .me()
      .then(setUser)
      .catch(() => {
        clearToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (datos: LoginRequest) => {
    const respuesta = await authService.login(datos);
    setToken(respuesta.token);
    setUser(respuesta.user);
  }, []);

  const register = useCallback(async (datos: RegisterRequest) => {
    const respuesta = await authService.register(datos);
    setToken(respuesta.token);
    setUser(respuesta.user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    router.replace("/");
  }, [router]);

  const valor = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return contexto;
}
