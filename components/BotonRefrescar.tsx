'use client';

import React from 'react';
import { Button, Tooltip } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

type Props = {
  onClick: any;
};

const BotonRefrescar: React.FC<Props> = ({ onClick }) => {
  return (
    <Tooltip title="Recargar Pagina">
      <Button color="primary" variant="outlined" onClick={onClick} icon={<SyncOutlined />} />
    </Tooltip>
  );
};

export default BotonRefrescar;
