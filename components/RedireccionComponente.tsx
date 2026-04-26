'use client'; // Asegura que este archivo se ejecute solo en el cliente

import React from 'react';
import Link from 'next/link'; // Importa el componente Link de Next.js
import { Button } from 'antd';

interface RedireccionComponenteProps {
  url: string; // Parámetro para la URL de redirección
  label: string | null; // Etiqueta para el botón
  color: any; // Color para el botón
  icon?: React.ReactNode; // Ícono opcional
  variant: any; // Color para el botón
  styles?: any; // estilos
}

const RedireccionComponente: React.FC<RedireccionComponenteProps> = ({ url, label, color, icon, variant, styles = null }) => {
  return (
    <Link href={url} passHref>
      <Button color={color} variant={variant} style={styles} icon={icon}>
        {label}
      </Button>
    </Link>
  );
};

export default RedireccionComponente;
