import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';
import { PerfilStateInterface, UsuarioConectado } from './interface';
import { getUsuarioConectado } from './api';

const initialState: PerfilStateInterface= {
  permisos: [],
  usuarioConectado: null,
  loading: false,
  error: null,

}; 

const perfilSlice = createSlice({
  name: 'perfil',
  initialState,
  reducers: {
    setUsuarioConectado(state, action: PayloadAction<UsuarioConectado | null>) {
      state.usuarioConectado = action.payload;
    },

    setPermisos(state, action: PayloadAction<string[]>) {
      state.permisos = action.payload;
    },

    limpiarPermisos(state) {
      state.permisos = [];
    },

    limpiarUsuarioConectado(state) {
      state.usuarioConectado = null;
    },

    estadoInicialPerfil(state) {
      Object.assign(state, initialState);
    },
  },

  // ─────────────────────────────────────────────
  // EXTRA REDUCERS
  // ─────────────────────────────────────────────
  extraReducers: (builder) => {
    builder
      // ── GET Usuario conectado ──────────────────────────────────────────────────────────
      .addCase(getUsuarioConectado.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsuarioConectado.fulfilled, (state, action) => {
        state.loading = false;
        state.usuarioConectado = action.payload.usuario;
        state.permisos = action.payload.permisos || [];
      })
      .addCase(getUsuarioConectado.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'No se pudo obtener el usuario conectado';
      });
  },
});

export const { setUsuarioConectado, setPermisos, limpiarPermisos, limpiarUsuarioConectado, estadoInicialPerfil } = perfilSlice.actions;

export default perfilSlice.reducer;

export const selectUsuarioConectado = (state: RootState) => state.perfil.usuarioConectado;
export const selectPermisos = (state: RootState) => state.perfil.permisos;
export const selectLoading = (state: RootState) => state.perfil.loading;
export const selectError = (state: RootState) => state.perfil.error;

/** Selector combinado con todos los valores del slice */
export const selectPerfilState = createSelector(
  [
    selectUsuarioConectado,
    selectPermisos,
    selectLoading,
    selectError,
  ],
  (
    usuarioConectado,
    permisos,
    loading,
    error,
  ) => ({
    usuarioConectado,
    permisos,
    loading,
    error,
  }),
);