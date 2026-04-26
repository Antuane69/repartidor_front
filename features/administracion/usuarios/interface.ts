export interface UsuarioConectado {
  id?: number | string;
  [key: string]: unknown;
}

export interface GetUsuarioConectadoResponse {
  usuario: UsuarioConectado | null;
  permisos: string[];
}

export interface PerfilStateInterface {
  usuarioConectado: UsuarioConectado | null;
  loading: boolean;
  error: string | null;
  permisos: string[];
}