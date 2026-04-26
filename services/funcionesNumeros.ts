export const formatearNumero = (numero: number | string | null | undefined) => {
    if (numero === null || numero === undefined || numero === '') {
        return 0;
    }

    // 1) Quitar comas y convertir a número
    const num = typeof numero === 'string'
        ? parseFloat(numero.replace(/,/g, ''))
        : numero;

    if (isNaN(num)) {
        return 0;
    }

    // 2) Truncar a dos decimales (no redondear)
    const truncated = Math.floor(num * 100) / 100;

    // 3) ¿Tiene parte decimal distinta de cero?
    // const hasDecimal = truncated % 1 !== 0;

    // 4) toLocaleString será el encargado de la separación de miles
    //    y de fijar de 0 a 2 decimales
    return truncated.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}
