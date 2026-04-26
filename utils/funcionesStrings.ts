export const arrayAString = (array: any): string => {
  if (!array) return "";

  let arregloFinal: string[] = [];

  try {
    if (typeof array === "string") {
      arregloFinal = JSON.parse(array);
    } else if (Array.isArray(array)) {
      arregloFinal = array;
    } else {
      return "";
    }

    // Validamos que realmente sea un array de strings
    if (!Array.isArray(arregloFinal)) return "";

    return arregloFinal.map(el => String(el).toUpperCase()).join(", ");
  } catch (e) {
    console.error("Error al convertir array:", e);
    return "";
  }
};

export const esArrayValido = (value: any): boolean => {
  try {
    if (Array.isArray(value)) return true;

    if (typeof value === "string") {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed);
    }

    return false;
  } catch {
    return false;
  }
};

export const asegurarArray = (input: any): string[] => {
  if (Array.isArray(input)) return input;
  try {
    return JSON.parse(input);
  } catch {
    return [];
  }
}

export const esObjetoOArrayDeObjetos = (valor: any): boolean => {
  if (!valor || typeof valor !== 'object') return false;

  if (Array.isArray(valor)) {
    // Ignorar arrays vacíos o de strings/números
    return valor.length > 0 && typeof valor[0] === 'object' && !Array.isArray(valor[0]);
  }

  return true; // Es un objeto plano
};

