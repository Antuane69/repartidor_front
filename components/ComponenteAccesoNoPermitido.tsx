'use client';
import React from 'react';
import { Button, Result } from 'antd';
import { useRouter } from 'next/navigation';

interface Props {
  title?: string;
  subTitle?: string;
  redirectPath?: string;
  buttonText?: string;
}

const AccesoNoPermitido: React.FC<Props> = ({
  title = '403',
  subTitle = 'No tienes autorización para acceder a esta página.',
  redirectPath = '/',
  buttonText = 'Ir al inicio',
}) => {
  const router = useRouter();

  return (
    <Result
      status="403"
      title={title}
      subTitle={subTitle}
      extra={<Button type="primary" onClick={() => router.push(redirectPath)}>{buttonText}</Button>}
    />
  );
};

export default AccesoNoPermitido;
