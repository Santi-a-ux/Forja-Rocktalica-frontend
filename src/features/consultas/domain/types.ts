export type EstadoConsulta = "pendiente" | "atendida";

export interface Consulta {
  id: number;
  mensaje: string;
  estado: EstadoConsulta;
  createdAt: string;
  userId: number;
  instrumentoId: number;
  instrumento?: { id: number; nombre: string; foto: string };
  user?: { id: number; nombre: string; email: string };
}

export interface NuevaConsulta {
  instrumentoId: number;
  mensaje: string;
}
