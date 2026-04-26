'use client';

import { selectUsuarioConectado } from '@/features/administracion/usuarios/usuariosSlice';
import { Card, DatePicker, Flex, Tag, Image } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import BotonCrear from '@/components/BotonCrear';
import DashboardCards from '@/components/DashboardCards';
import { CheckCircleOutlined, ClockCircleOutlined, DollarOutlined, ShopOutlined } from '@ant-design/icons';
import TablaNegocios from '@/features/negocios/components/TablaNegocios';
import BotonEditar from '@/components/BotonEditar';
import BotonEliminar from '@/components/BotonEliminar';
import BotonGeneral from '@/components/BotonGeneral';
import { useState } from 'react';
import dataFactory, { NegocioMock } from '@/features/negocios/dataFactory';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

const dateFormat = 'DD/MM/YYYY';

export default function DashboardPage() {
  const usuarioConectado = useSelector(selectUsuarioConectado);
  const [data, setData] = useState<NegocioMock[]>(dataFactory.negocios);
  const nombreUsuario = typeof usuarioConectado?.name === 'string' ? usuarioConectado.name : 'Usuario';
  const formatoMonedaMXN = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

   const cardsData = [
    {
      title: 'Total de negocios',
      value: 8,
      prefix: <ShopOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Cobro semanal total',
      value: 12350,
      suffix: 'MXN',
      prefix: <DollarOutlined />,
      color: '#52c41a',
    },
    {
      title: 'Cobrado',
      value: 8900,
      suffix: 'MXN',
      prefix: <CheckCircleOutlined />,
      color: '#1890ff',
    },
    {
      title: 'Pendiente',
      value: 3450,
      suffix: 'MXN',
      prefix: <ClockCircleOutlined />,
      color: '#fa8c16',
    },
  ];

  const columnasNegocios = [
    { key: "imagen_negocio", dataIndex: "imagen_negocio", title: "Negocio", render: (_text: unknown, row: NegocioMock) => (
      <Flex align='center' gap={12}>
        <Image src={row.imagen_negocio} alt={row.nombre_negocio} width={40} height={40} style={{ borderRadius: '50%' }} /> 

        <span>{row.nombre_negocio}</span>
      </Flex>
    )},
    {
      key: "cobro_semanal",
      dataIndex: "cobro_semanal",
      title: "Cobro semanal",
      align: 'right' as const,
      render: (text: number) => (
        <span
          style={{
            display: 'inline-block',
            width: '100%',
            textAlign: 'right',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatoMonedaMXN.format(text)}
        </span>
      ),
    },
    { key: "dia_cobro", dataIndex: "dia_cobro", title: "Día de cobro"},
    { key: "siguiente_cobro", dataIndex: "siguiente_cobro", title: "Siguiente cobro"},
    { key: "estado_pago", dataIndex: "estado_pago", title: "Estado", render: (text: string) => (
      <Tag color={text === 'Pagado' ? 'green' : 'orange'} icon={text === 'Pagado' ? <CheckCircleOutlined /> : <ClockCircleOutlined />} style={{ fontWeight: 'bold' }}>
        {text}
      </Tag>
    )},
    {
      key: "opciones", dataIndex: "opciones", title: "Opciones", width: 10, fixed: 'right' as const,
      render: (_: unknown, row: NegocioMock) => (
        <div style={{ display: "flex" }}>
          <BotonGeneral permiso={true} onClick={() => alert("Ver detalles")} title="Cargar Pago" icon={<DollarOutlined/>}/>
          <BotonEditar permiso={true} onClick={() => handleEdit(row)}/>
					<BotonEliminar permiso={true} onClick={() => handleDelete(row.identificador)}/>
        </div>
      ),
    },
  ];

  const handleEdit = (row: NegocioMock) => {
    alert(`Editar negocio con ID: ${row.identificador}`);
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar negocio con ID: ${id}`);
  };

  return (
    <Flex vertical>
      <p style={{ fontWeight: 600, fontSize: "22px" }}>¡Bienvenido {nombreUsuario}!</p>

      <Flex align='center' justify='space-between' className='mb-4'>
        <p style={{ fontWeight: 600, fontSize: "16px" }}>Resumen de tus cobros</p>
        <Flex align='center' gap={16}>
          <RangePicker defaultValue={[dayjs().subtract(7, 'day'), dayjs()]} format={dateFormat} />
          <BotonCrear permiso={true} onClick={() => alert("crear")} textoBotonCrearProp="Agregar" />
        </Flex>
      </Flex>

      <DashboardCards data={cardsData} />
      <div style={{ marginBottom: "1rem" }}></div>

      <Card title="Cobros por negocio">
        <TablaNegocios columns={columnasNegocios} apiUrl='negocios' data={data} setData={setData} columnaABuscar='nombre'/>
      </Card>
    </Flex>
  );
}