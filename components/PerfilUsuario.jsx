'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, Avatar, Space, Spin, Flex, Collapse } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Link from "next/link";
import { DownOutlined } from "@ant-design/icons";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutButton from "./LogoutButon";
import { fetchUsersMe } from '../slices/perfilSlice';

const items = [
  {
    label: (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Link href={'/perfil'} passHref>
          <Flex gap="small">
            <AccountBoxIcon style={{ color: '#000000' }} /> <span style={{ color: '#000000' }}>Mi Perfil </span>
          </Flex>
        </Link>
      </div>
    ),
    key: '0',
  },
  {
    label: (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <LogoutButton />
      </div>
    ),
    key: '1',
  },
]

const PerfilUsuario = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.perfil.data);
  const loading = useSelector((state) => state.perfil.loading);
  const { Panel } = Collapse;

  // Estado inicial (cuidado con SSR):
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined'
      ? window.innerWidth <= 768
      : false
  );

  // Hook para “escuchar” cambios de tamaño:
  useEffect(() => {
    // Handler que actualiza isMobile
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Ejecutarlo una vez al montar
    handleResize();
    // Añadir listener
    window.addEventListener('resize', handleResize);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // vacío: monta/desmonta una vez

  useEffect(() => {
    dispatch(fetchUsersMe());
  }, [dispatch]);

  if (loading) {
    return <Spin />;
  }

  if (isMobile) {
    return (
      <Collapse
        bordered={false}
        defaultActiveKey={['perfilPanel']}
        expandIconPosition="end"
        style={{ background: 'transparent' }}
      >
        <Panel
          header={
            <Space>
              <Avatar
                size="small"
                src={user?.avatar ? `data:image/png;base64,${user.avatar}` : undefined}
                style={{ backgroundColor: user?.avatar ? 'transparent' : '#75b957', marginBottom: '0.1rem'}}
                icon={user?.avatar ? null : <UserOutlined />}
              />
              <span style={{ color: '#000' }}>{user?.nombre_usuario || 'Espera un momento...'}</span>
            </Space>
          }
          key="perfilPanel"
        >
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <LogoutButton />
          </div>
        </Panel>
      </Collapse>
    );
  }

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}>
        <Space>
          <Avatar
            size="small"
            src={user?.avatar ? `data:image/png;base64,${user.avatar}` : undefined}
            style={{ backgroundColor: user?.avatar ? 'transparent' : '#75b957', marginBottom: '0.3rem'}}
            icon={user?.avatar ? null : <UserOutlined />}
          />
          <span style={{ color: "#000" }}>{user?.nombre_usuario || "Cargando..."}</span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
}

export default PerfilUsuario;