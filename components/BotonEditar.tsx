

"use client";

import React from 'react';
import { Button, Tooltip} from 'antd';
import { EditTwoTone } from '@ant-design/icons';

export default function BotonEditar({permiso = true, onClick, disabled = false, colorIcono = "#e87b00"}: {
  permiso?: boolean;
  onClick: (row:any) => void;
  disabled?: boolean;
  colorIcono?: string;
}) {

  return (
    <>
      {permiso ? (
        <Tooltip title="Editar">
          <Button type="link" onClick={onClick} icon={<EditTwoTone twoToneColor={colorIcono} />} disabled={disabled}/>
        </Tooltip>
      ) : null}
    </>
  );
}
