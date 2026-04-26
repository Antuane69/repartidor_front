'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useMediaQuery } from "react-responsive";
import { Card } from 'antd';
import Cookies from "js-cookie";
import AlertaErrorToast from "../services/AlertaErrorToast";
import axiosRequest from "../services/axiosRequest";
import { CONSTANTES } from "../services/constantes";
import { API_RUTAS } from "../services/apiRutas";
import Loader from "../components/Loader";
import { useNavStore } from "../menuNavegacionStore";
import BreadcrumbPersonalizado from "./BreadcrumbPersonalizado";
import { SistemasData } from '../types/SistemasModulosPermisosInterfaces';

const { Meta } = Card;
interface AccesosData {
  identificador: number;
  sistemas: SistemasData[] | null;
}

export default function AccesosUsuario() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isLoading, setIsLoading] = useState(true);
  const [sistemas, setSistemas] = useState<SistemasData[] | null>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const setOpenKeys = useNavStore((s) => s.setOpenKeys);  
  const setDrawerVisible = useNavStore((s) => s.setDrawerVisible);

  // Estilo para el contenedor principal
  const mainContainerStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column', // Apila el título y el contenedor de tarjetas
    alignItems: 'center', // Centra horizontalmente
    height: '100vh', // Ocupa toda la altura de la pantalla
    textAlign: 'center', // Centra el texto del título
  };

  // Estilo del encabezado
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between', // Espacia el título y el contenedor del usuario
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    width: '100%',
  };

  // Estilo para el título
  const titleStyle: React.CSSProperties = {
    fontSize: '26px',
    marginTop: '2vh',
    fontWeight: 'bold',
    fontFamily: 'arial',
  };

  // Estilo para el contenedor de cards
  const gridStyle: React.CSSProperties = {
    marginTop: isMobile ? '3vh' : '5vh',
    width: '100%',
    display: isMobile ? "grid" : 'flex',
    gap: '16px',
    justifyContent: 'start',        
    justifyItems: isMobile ? 'center' : undefined,         // <-- opcional, para que el contenido quede centrado
    gridTemplateColumns: isMobile ? '1fr' : undefined,
  };

  // Estilo para la redirección de las cards
  const cardStyle: React.CSSProperties = {
    width: 300,
    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease', // Animación suave
    cursor: 'pointer',
  };

  // Estilo para el hover de las cards
  const cardHover: React.CSSProperties = {
    transform: 'translateY(-10px)', // "Levanta" la tarjeta
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)', // Sombra suave
    border: '2px solid #3498db', // Bordes con color al hacer hover
  };

      // params para el breadcrumb
	const paramsBreadcrumb = {};
	const menuBreadcrumb = [
		{
			title: 'Dashboard',
			href: '/',
		},
		{
			title: 'Mis Sistemas',
		},
	];
  

  // Obtener y cargar todos los sistemas del usuario
  useEffect(() => {
    const mis_sistemas = async () => { 
      try{
        const identificadorEmpresaSeleccionada = Number(Cookies.get("empresaSeleccionada"));

        // const response = await axiosRequest('GET', 'usuarios/mis-accesos');
        const response = await axiosRequest('GET', API_RUTAS.usuarios.mis_accesos);
        const misAccesosResponse: AccesosData[] = response.data.data;
        const misAccesos = misAccesosResponse.find(acceso => acceso.identificador === identificadorEmpresaSeleccionada)?.sistemas || [];
        setSistemas(misAccesos);
      }catch(error: any){
        AlertaErrorToast(`Ocurrio un problema al cargar los sistemas: ${error?.error || error?.message}`);
      }finally{
        setIsLoading(false);
      }
    }

    document.title = 'HB Solutions';
    mis_sistemas();
  }, []);

  const redireccionar = (urlSistema: string) => {
    if(isMobile){
      setDrawerVisible(true); //abre el drawer de movil antes de abrir la key del menu
    }

    if(urlSistema === '/tickets'){
      setOpenKeys(['tickets']);
    }else if(urlSistema === '/fondoFijoCaja'){
      setOpenKeys(['contabilidad']);
    }
    // window.location.href = urlSistema;
  };  

  // Renderizar loader mientras se extrae la informacion 
  if (isLoading)
    return <Loader loading={isLoading} />;
  
  return (
    <div style={mainContainerStyle}>
      <div style={{width: '100%'}}>
        <BreadcrumbPersonalizado items={menuBreadcrumb} params={paramsBreadcrumb} title="Mis Sistemas" botonRegresar={false} botonAyudaProp={true}/>
      </div>
      <br/> 
      <div style={gridStyle}>
        {(sistemas ?? []).map((sistema) => (
          <Card
            onClick={() => redireccionar(sistema.url_sistema)}
            key={sistema.identificador}      
            style={{
              ...cardStyle,
              ...(hoveredCard === sistema.identificador ? cardHover : {}), 
            }}
            onMouseEnter={() => setHoveredCard(sistema.identificador)} 
            onMouseLeave={() => setHoveredCard(null)} 
            cover={
              <img
                style={{
                  width: isMobile ? '40%' : '50%',
                  padding: isMobile ? '15px 0px 0px 0px' : '15px',
                  display: 'block', // Para que sea un elemento bloque y se pueda centrar
                  margin: '0 auto', // Centra horizontalmente
                }}
                alt={sistema.nombre_sistema}
                src={`data:${sistema.myme_type};base64,${sistema.logo_sistema}` || CONSTANTES.PLACEHOLDER_IMG}
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.src = CONSTANTES.PLACEHOLDER_IMG;
                }}
              />
            }
          >
            <Meta
              title={sistema.nombre_sistema}
              description={sistema.descripcion_sistema || "Sin descripción disponible"}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}