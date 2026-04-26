import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AlertaErrorToast } from '@/services/alertas';
import { API_RUTAS } from '@/services/apiRutas';
import axiosRequest from '@/services/axiosRequest';
import { GetUsuarioConectadoResponse, UsuarioConectado } from './interface';

type ErrorResponse = {
  message?: string;
};

export const getUsuarioConectado = createAsyncThunk<
  GetUsuarioConectadoResponse,
  void,
  { rejectValue: string }
>('perfil/getUsuarioConectado', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosRequest('GET', API_RUTAS.me);

    const payload = response.data?.data ?? response.data;
    const usuario = (payload?.usuario ?? payload?.user ?? payload ?? null) as UsuarioConectado | null;
    const permisosCrudos = payload?.permisos ?? payload?.permissions ?? [];

    const permisos = Array.isArray(permisosCrudos)
      ? permisosCrudos.filter((permiso): permiso is string => typeof permiso === 'string')
      : [];

    return { usuario, permisos };
  } catch (error) {
    AlertaErrorToast('Error al obtener el usuario conectado');

    const axiosError = error as AxiosError<ErrorResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message ?? 'Error al obtener el usuario conectado',
    );
  }
});