

"use client";

import React from 'react';
import { Button, Tooltip} from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

export default function BotonCrear({permiso = true, vistaCelular = false, onClick}: {
  permiso: boolean;
  vistaCelular?: boolean | null;
  onClick: () => void;
}) {

  return (
    <>
      {permiso ? (
        <Tooltip title={vistaCelular ? "Añadir" : ""}>
          <Button 
            type="primary" 
            size="middle" 
            onClick={onClick}
          >
            <PlusCircleOutlined />{!vistaCelular ? "Añadir" : null} 
          </Button>
        </Tooltip>
      ) : ""}
    </>
  );
}
