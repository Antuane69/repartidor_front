

"use client";

import React from 'react';
import { useMediaQuery } from "react-responsive";
import { FloatButton, Flex, Button } from 'antd';
import { SettingOutlined, PlusSquareTwoTone, FilterTwoTone, QuestionCircleTwoTone, FileTextOutlined } from '@ant-design/icons';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import BugReportIcon from '@mui/icons-material/BugReport';
import { openManualForCurrentPath } from "../services/abrirManualUsuario";
import validarPermisoUsuario from "../hooks/validarPermisoUsuario";
import validarAccesoAlSistema from '../hooks/validarAccesoAlSistema';
import '../css/EstilosBotonFlotante.css';

// export default function BotonFlotante({}: {}) {
export default function BotonFlotante({mostrarCrearBoton = false, onClicCrear = undefined, mostrarFiltros = false, onClicFiltros = undefined, mostrarBotonAyuda = false, botonesExtra = undefined, htmlBotonCrear = (<Button onClick={() => onClicCrear()} style={{width: '100%'}}>
  <Flex justify="space-between" align="center" style={{width: '100%'}}>
    <div style={{width: '25px', justifyContent: 'left'}}><PlusSquareTwoTone /></div>
    <span style={{width: '100px', textAlign: 'right'}}>AÑADIR</span>
  </Flex>
</Button>)}: {mostrarCrearBoton?: boolean, onClicCrear?: any, mostrarFiltros?: boolean, onClicFiltros?: any, mostrarBotonAyuda?: boolean, botonesExtra?: any, htmlBotonCrear?: any}) {

  const isMobile = useMediaQuery({ maxWidth: 600 });
  const tienesAccesoTickets = validarAccesoAlSistema(1); //placeholder
  const tienesAccesoAFondoFijo = validarAccesoAlSistema(2); //placeholder
  const tienesAccesoABitacora = validarPermisoUsuario("mostrar_bitacora_movimientos");

  return (
    <>
      <FloatButton.Group
        trigger="click"
        shape="square"
        style={{ insetInlineEnd: isMobile ? 10 : 40 }}
        icon={<SettingOutlined style={{color: 'white'}}/>}
      >
        
        {mostrarCrearBoton ? typeof htmlBotonCrear === "function" ? htmlBotonCrear() : htmlBotonCrear : null}

        {mostrarFiltros && (
          <Button onClick={() => onClicFiltros()} style={{width: '100%'}}>
            <Flex justify="space-between" align="center" style={{width: '100%'}}>
              <div style={{width: '25px'}}><FilterTwoTone /></div>
              <span style={{width: '100px', textAlign: 'right'}}>FILTRAR</span>
            </Flex>
          </Button>
        )}

        {botonesExtra}

        {(tienesAccesoTickets && window.location.pathname != "/tickets") && (
          <Button onClick={() => {window.location.href = "/tickets"}} style={{width: '100%'}}>
            <Flex justify="space-between" align="center" style={{width: '100%'}}>
              <div style={{width: '30px'}}><BugReportIcon fontSize={'small'} sx={{ color: '#1888CC' }}/></div>
              <span style={{width: '100px', textAlign: 'right'}}>TICKETS</span>
            </Flex>
          </Button>         
        )}
        
        {(tienesAccesoAFondoFijo && window.location.pathname != "/fondoFijoCaja/resguardos") && (
          <Button onClick={() => {window.location.href = "/fondoFijoCaja/resguardos"}} style={{width: '100%'}}>
            <Flex justify="space-between" align="center" style={{width: '100%'}}>
              <div style={{width: '30px'}}><PointOfSaleIcon fontSize={'small'} sx={{ color: '#1888CC' }}/></div>
              <span style={{width: '100px', textAlign: 'right'}}>FONDO FIJO</span>
            </Flex>
          </Button>      
        )}

        {(tienesAccesoABitacora && window.location.pathname != "/bitacora_movimientos") && (
          <Button onClick={() => {window.location.href = "/bitacora_movimientos"}} style={{width: '100%'}}>
            <Flex justify="space-between" align="center" style={{width: '100%'}}>
              <div style={{width: '30px'}}><FileTextOutlined style={{color: '#1888CC'}}/></div>
              <span style={{width: '100px', textAlign: 'right'}}>BITÁCORA</span>
            </Flex>
          </Button>
        )}

        {mostrarBotonAyuda && (
          <Button onClick={() => openManualForCurrentPath()} style={{width: '100%'}}>
            <Flex justify="space-between" align="center" style={{width: '100%'}}>
              <div style={{width: '25px'}}><QuestionCircleTwoTone /></div>
              <span style={{width: '100px', textAlign: 'right'}}>AYUDA</span>
            </Flex>
          </Button>
        )}
      </FloatButton.Group>
    </>
  );
}
