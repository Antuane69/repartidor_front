'use client';

import React from 'react';
import { Breadcrumb, Flex } from 'antd';
import BotonRegresar from './BotonRegresarAtras';
import BotonManualUsuario from './BotonManualUsuario';
import { useMediaQuery } from "react-responsive";
import { ArrowLeftOutlined, InfoCircleOutlined } from '@ant-design/icons';

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type BreadcrumbPersonalizadoProps = {
  items: BreadcrumbItem[];
  params: { [key: string]: string | null };
  title: string;
  botonRegresar?: boolean;
  botonAyudaProp?: boolean;
};

const BreadcrumbPersonalizado: React.FC<BreadcrumbPersonalizadoProps> = ({ items, params, title, botonRegresar = true, botonAyudaProp = false }) => {
  const processedItems = items.map((item) => ({
    key: item.title, // Se requiere una clave única para cada item
    title: item.title.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => params[key] || key),
    href: item.href,
  }));
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div>
      <Breadcrumb items={processedItems.map(({ title, href }) => ({ title: href ? <a href={href}>{title}</a> : title }))} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <h2 style={{ fontSize: isMobile ? "15px" : "22px"}}>{title}</h2>
        <Flex gap="small">
          {botonRegresar ? (isMobile ? <BotonRegresar icon={<ArrowLeftOutlined />} title=""/> : <BotonRegresar />) : null}
          {botonAyudaProp ? (isMobile ? <BotonManualUsuario icon={<InfoCircleOutlined />} title=""/> : <BotonManualUsuario icon={<InfoCircleOutlined />} title="Ayuda"/>) : null}
        </Flex>
      </div>
      <div style={{border:'1px solid #006b90', width:'100%'}}></div>
    </div>
  )
};

export default BreadcrumbPersonalizado;
