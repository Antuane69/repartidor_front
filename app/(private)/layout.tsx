'use client';

import { Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const { Header, Sider, Content } = Layout;

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    router.push('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="text-white p-4 font-bold">Mi SaaS</div>

        <Menu
          theme="dark"
          items={[
            {
              key: 'dashboard',
              label: 'Dashboard',
              onClick: () => router.push('/dashboard'),
            },
            {
              key: 'logout',
              label: 'Cerrar sesión',
              onClick: logout,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header className="bg-white shadow px-4">
          <div>Panel administrativo</div>
        </Header>

        <Content className="p-6 bg-gray-100">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}