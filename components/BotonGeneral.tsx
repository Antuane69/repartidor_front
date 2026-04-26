

"use client";

import React from 'react';
import { Button, Tooltip} from 'antd';

export default function BotonGeneral({permiso = true, onClick, title, icon}: {
  permiso?: boolean;
  onClick: (row:any) => void;
  title: string;
  icon: any;
}) {

  return (
    <>
      {permiso ? (
        <Tooltip title={title}>
          <Button type="link" onClick={onClick} icon={icon} />
        </Tooltip>
      ) : null}
    </>
  );
}
