import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import perfilReducer from '../features/administracion/usuarios/usuariosSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    perfil: perfilReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
