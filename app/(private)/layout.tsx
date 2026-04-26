'use client';

import {
  DashboardOutlined,
  DollarCircleOutlined,
  FireOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectPerfilState } from '@/features/administracion/usuarios/usuariosSlice';

const { Sider, Content } = Layout;

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { usuarioConectado } = useSelector(selectPerfilState);
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const nombreUsuario = typeof usuarioConectado?.name === 'string' ? usuarioConectado.name : 'Usuario';

  const selectedMenuKey = useMemo(() => {
    if (pathname.startsWith('/dashboard')) return ['dashboard'];
    if (pathname.startsWith('/negocios')) return ['negocios'];
    if (pathname.startsWith('/cobros_semanales')) return ['cobros_semanales'];
    if (pathname.startsWith('/configuracion')) return ['configuracion'];
    return [];
  }, [pathname]);

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <div className="h-full flex flex-col">
          <div className="text-white p-3 font-bold flex items-center justify-between gap-2 border-b border-white/10">
            <div className="flex items-center gap-2 overflow-hidden">
              <FireOutlined />
              {!collapsed && <span className="whitespace-nowrap">Estación 192</span>}
            </div>

            <Button
              type="text"
              onClick={() => setCollapsed((prev) => !prev)}
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="!text-white hover:!text-white/80"
            />
          </div>

          <div className="flex-1">
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={selectedMenuKey}
              items={[
                {
                  key: 'dashboard',
                  icon: <DashboardOutlined />,
                  label: 'Resumen',
                  onClick: () => router.push('/dashboard'),
                },
                {
                  key: 'negocios',
                  icon: <ShopOutlined />,
                  label: 'Negocios',
                  onClick: () => router.push('/negocios'),
                },
                {
                  key: 'cobros_semanales',
                  icon: <DollarCircleOutlined />,
                  label: 'Cobros Semanales',
                  onClick: () => router.push('/cobros_semanales'),
                },
                {
                  key: 'configuracion',
                  icon: <SettingOutlined />,
                  label: 'Configuración',
                  onClick: () => router.push('/configuracion'),
                },
              ]}
            />
          </div>

          <div className="p-4 border-t border-white/10 text-white">
            <div className={`mb-3 flex items-center gap-2 text-sm text-white/90 overflow-hidden ${collapsed ? 'justify-center' : ''}`}>
              <UserOutlined />
              {!collapsed && <span className="truncate">{nombreUsuario}</span>}
            </div>

            <Button danger block icon={<LogoutOutlined />} onClick={logout} title="Cerrar sesión">
              {!collapsed && 'Cerrar sesión'}
            </Button>
          </div>
        </div>
      </Sider>

      <Layout>
        {/* <Header className="bg-white shadow px-4">
          <div>Panel administrativo</div>
        </Header> */}

        <Content className="p-6 bg-gray-100">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}