import { AlertaErrorToast } from './alertas';

//Funcion para validar si el correo ingresado es valido o no
export const esCorreoValido = (correo: string) => {
  if (!correo.trim()) {
    AlertaErrorToast("El correo ingresado es inválido");
    return false;
  }

  // Expresión regular para validar emails
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(correo);
};

export const sonCorreosValidos = (stringCorreos: string) => {
  if (!stringCorreos.trim()) {
    AlertaErrorToast("Los correos electrónicos son obligatorios");
    return false;
  }

  // Expresión regular para validar emails
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Separa por comas, quita espacios al inicio/final de cada correo
  const correos = stringCorreos.split(',').map(c => c.trim());

  // Valida cada correo
  for (const correo of correos) {
    if (!emailRegex.test(correo)) {
      AlertaErrorToast('Uno o mas correos no tienen el formato correcto.');
      return false; // Si alguno no es válido, devuelve false
    }
  }

  if(!sonCorreosUnicos(correos)){
      return false;
  }

  return true; // Todos son válidos
};

export const sonCorreosUnicos = (arrayCorreos: string[]) => {
  const correosUnicos = new Set(arrayCorreos);
  if (correosUnicos.size !== arrayCorreos.length) {
    AlertaErrorToast("Hay correos electrónicos duplicados.");
    return false; 
  }

  return true;
}