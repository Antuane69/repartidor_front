'use client';

import React from 'react';
import { Button } from 'antd';

type Props = {
  title?: string;
  icon?: React.ReactNode;
};

const BotonRegresar: React.FC<Props> = ({ title = "Regresar", icon = null }) => {
  const handleRegresar = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <Button color="primary" variant="outlined" onClick={handleRegresar} icon={icon}>
      {title}
    </Button>
  );
};


export default BotonRegresar;
