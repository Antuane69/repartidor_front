import Swal from "sweetalert2";
import toast from 'react-hot-toast';
import { obtenerMensajeError } from "./errores";

interface alertaDosPasosSwalInterface {
  titulo: string;
  contenido: string;
  icono: 'success' | 'error' | 'warning' | 'info' | 'question';
  colorBotonConfirmar?: string;
}

export async function alertaDosPasosSwal({ titulo, contenido, icono, colorBotonConfirmar = '#3085d6' }: alertaDosPasosSwalInterface) {
  try {
    return Swal.fire({
      title: titulo,
      text: contenido,
      icon: icono,
      showCancelButton: true,
      draggable: true,
      confirmButtonColor: colorBotonConfirmar,
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    });
  } catch (error) {
    const mensajeError = obtenerMensajeError(error);
    AlertaErrorToast(`Ocurrió un problema: ${mensajeError}`);
  }
}

interface handleDeleteInterface {
  parametrosIDs: any;
  dispatch: any;
  accionEliminar: any;
  nombreModulo: string;
}

export async function handleDelete({ parametrosIDs, dispatch, accionEliminar, nombreModulo }: handleDeleteInterface) {
  try {
    const result = await Swal.fire({
      title: `¿Estás seguro de eliminar este/a ${nombreModulo}?`,
      text: "Esto no se podrá deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar!",
    });

    // Si el usuario confirma la eliminación
    if (result.isConfirmed) {
      // Verificar si parametrosIDs es un objeto o un valor simple para modulos que necesiten 2 IDS para eliminarse
      const payload = typeof parametrosIDs === "object" && parametrosIDs !== null ? { ...parametrosIDs } : parametrosIDs;

      await dispatch(accionEliminar(payload)).unwrap().then(() => AlertaExitoToast(`${nombreModulo} Eliminada/o Correctamente`)).catch((error: any) => AlertaErrorToast(`Ocurrio un problema al eliminar la/el ${nombreModulo}: ${error}`));
    }
  } catch (error) {
    AlertaErrorToast(`Ocurrió un problema al eliminar el ${nombreModulo}: ${error}`);
  }
}

export function AlertaErrorToast(mensaje: string) {
  toast.error(mensaje, {
    style: {
      border: '1px solid rgb(113, 4, 0)',
      padding: '16px',
      color: 'rgb(113, 4, 0)',
    },
    iconTheme: {
      primary: 'rgb(113, 4, 0)',
      secondary: '#FFFAEE',
    },
  });
}

export function AlertaExitoToast(mensaje: string) {
  toast.success(mensaje, {
    style: {
      border: '1px solid rgb(0, 113, 9)',
      padding: '16px',
      color: 'rgb(0, 113, 9)',
    },
    iconTheme: {
      primary: 'rgb(0, 113, 9)',
      secondary: '#FFFAEE',
    },
  });
}

export function AlertaVacioToast(mensaje: string) {
  toast(mensaje, {
      icon: '⚠️',
      style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
      },
      iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
      },
  });
}