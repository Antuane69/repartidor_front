'use client';  // Este componente es del lado del cliente

import { useAuth } from '../../AuthContext';  // Ajusta la ruta correctamente
import Cookies from 'js-cookie';
import { Button } from 'antd';

export default function LogoutButton() {
  const { logout } = useAuth();

  const handleLogout = () => {
    // Elimina cookies relacionadas
    Cookies.remove('accessToken');
    // Cookies.remove('misAccesosPermisos');
    Cookies.remove('esSuperAdministrador');
    Cookies.remove('esAdministrador');
    Cookies.remove('empresaSeleccionada');

    // Elimina datos del localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('misAccesos');
    
    logout();  // Llama a la función logout del contexto
    window.location.href = '/login'; // Redirige a la página de inicio de sesión
  };

  return(
    <>
      <Button
        variant='solid'
        color='default'
        onClick={handleLogout}
      >
        Cerrar Sesión
      </Button>
    </>
  );
}
