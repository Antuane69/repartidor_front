

"use client";

import React from 'react';
import { Button, Tooltip} from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';

export default function BotonEliminar({permiso = true, onClick, disabled = false, colorIcono = "#e82300", dosColores = true}: {
  permiso?: boolean;
  onClick: (row:any) => void;
  disabled?: boolean;
  colorIcono?: string;
  dosColores?: boolean;
}) {

  return (
    <>
      {permiso ? (
        <Tooltip title="Eliminar">
          <Button type="link" danger onClick={onClick} icon={<DeleteTwoTone {...(dosColores ? { twoToneColor: colorIcono } : { style: { color: colorIcono } })} />} disabled={disabled} />
        </Tooltip>
      ) : null}
    </>
  );
}
