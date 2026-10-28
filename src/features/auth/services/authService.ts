import { http } from "@/features/common/http";
import type { AuthResponse, LoginRequest, RegisterRequest, User } from "../domain/types";

export const authService = {
  login: (datos: LoginRequest) => http<AuthResponse>("/auth/login", { method: "POST", body: datos }),
  register: (datos: RegisterRequest) => http<AuthResponse>("/auth/register", { method: "POST", body: datos }),
  me: () => http<User>("/auth/me"),
};
