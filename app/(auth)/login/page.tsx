'use client';

import { Button, Card, Form, Input, message } from 'antd';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axiosRequest from '../../../services/axiosRequest';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { getUsuarioConectado } from '@/features/administracion/usuarios/api';

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const res = await axiosRequest('POST', 'login', values);

      const { access_token, refresh_token, expires_in } = res.data;

      const expirationDate = new Date(Date.now() + expires_in * 1000);

      Cookies.set('accessToken', access_token, {
        expires: expirationDate,
        path: '/',
      });

      Cookies.set('refreshToken', refresh_token, {
        expires: expirationDate,
        path: '/',
      });

      message.success('Login correcto');

      const usuarioConectado = await dispatch(getUsuarioConectado()).unwrap();
      console.log('USER ME:', usuarioConectado.usuario);

      router.push('/dashboard');
    } catch (error: unknown) {
      console.log('ERROR COMPLETO:', error);

      if (error && typeof error === 'object' && 'response' in error) {
        const errorConResponse = error as { response?: { data?: unknown } };
        console.log('DATA:', errorConResponse.response?.data);
      }

      message.error('Error en login');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card title="Iniciar sesión" className="w-[350px]">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  );
}