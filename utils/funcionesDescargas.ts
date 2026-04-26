import { AlertaErrorToast } from "./alertas";
import axiosRequest from "./axiosRequest";
import { obtenerMensajeError } from "./errores";

export const descargarImagen = (value: any) => {
  if (!value) return;

  try {
    const link = document.createElement("a");
    link.href = value;
    link.download = "imagen_descargada.png";
    link.click();
  } catch (error) {
    const mensajeError = obtenerMensajeError(error);
    AlertaErrorToast(`Error al descargar la imagen: ${mensajeError}`);
    throw error;
  }
};

export default async function handleDownload(path: string, nombreArchivo?: string | null): Promise<void> {
  try {
    const response: any = await axiosRequest('GET', `${path}`, null, 'blob');

    // Verifica el tipo de contenido recibido
    const contentType: string | undefined =
        response.headers["content-type"] ?? response.headers["Content-Type"];
    if (!contentType) {
        throw new Error("La respuesta no contiene un mime type válido");
    }

    // Crea un Blob usando los datos de la respuesta
    const blob = new Blob([response.data], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    // Extrae el nombre del archivo del encabezado Content-Disposition
    const disposition: string =
        response.headers['content-disposition'] ??
        response.headers['Content-Disposition'] ??
        '';

    let fileName: string = nombreArchivo ?? 'archivo-descargado.png';
    const match = disposition.match(/filename="?(.+?)"?$/);
    if (match) {
        fileName = match[1];
    }

    // Crea un enlace temporal para descargar el archivo
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();

    // Limpia recursos temporales
    link.remove();
    window.URL.revokeObjectURL(url);
} catch (error: any) {
    const mensajeError = obtenerMensajeError(error);
    AlertaErrorToast(`Error al descargar: ${mensajeError}`);
}
}