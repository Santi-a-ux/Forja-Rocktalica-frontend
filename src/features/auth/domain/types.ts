export type Role = "admin" | "user";

export interface User {
  id: number;
  nombre: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
