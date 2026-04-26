import React, { useEffect, useState } from 'react';
import { Input, Table, Button, Tooltip, Flex, Divider } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axiosRequest from '../../../services/axiosRequest';
import { AlertaErrorToast } from '../../../services/alertas';
import { obtenerMensajeError } from '../../../services/errores';

interface CustomizedDataGridProps<T = any> {
  columns: ColumnsType<T>;
  apiUrl: string;
  data: T[];
  setData: React.Dispatch<React.SetStateAction<T[]>>;
  columnaABuscar: string;
  onRowClick?: (rowId: any) => void;
  rowKey?: string;
  htmlExtra?: any;
  isMobile?: boolean;
  onRowColorClick?: (rowId: number) => void;
  pageSizeDefault?: number;
  forzarFiltro?: number;
  htmlExtraInicial?: any;
  expandable?: any;
  mostrarPaginacion?: boolean;
  htmlBusqueda?: boolean;
  colorearHeader?: boolean;
  headerColor?: string;
  headerTextColor?: string;
  onRowClickID?: boolean;
  placeholderBuscar?: string;
  mostrarVerticalHTML?: boolean;
  widthInputBusqueda?: any;
}

const TablaNegocios: React.FC<CustomizedDataGridProps> = ({ columns, apiUrl, setData, data, columnaABuscar, onRowClick, rowKey = "identificador", htmlExtra = null, isMobile = true, onRowColorClick = null, pageSizeDefault = 15, forzarFiltro = 0, htmlExtraInicial = null, expandable = null, mostrarPaginacion = true, htmlBusqueda = true, colorearHeader = false, headerColor = '#004080', headerTextColor = 'white', onRowClickID = true, placeholderBuscar = "Buscar...", mostrarVerticalHTML = false, widthInputBusqueda = 200}) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: pageSizeDefault,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const intervaloRecarga = process.env.NODE_ENV === 'production' ? 300_000 : 900_000;

  const buildUrl = (apiUrl: string, current: number, pageSize: number, search: string) => {
    if (apiUrl.endsWith("/")) {
      apiUrl = apiUrl.slice(0, -1);
    }
    const separator = apiUrl.includes('?') ? '&' : '?';
    const searchParam = search ? `&${columnaABuscar}=${encodeURIComponent(search)}` : '';
    return `${apiUrl}${separator}page=${current}&per_page=${pageSize}${searchParam}`;
  };

  const fetchData = async (current = 1, pageSize = 15, search = '') => {
    setLoading(true);
    try {
      const finalUrl = buildUrl(apiUrl, current, pageSize, search);
      const response = await axiosRequest('GET', finalUrl);

      if (!response.data.data || response.data.data.length === 0) {
        setData([]);
        setPagination({
          current: 1,
          pageSize: 15,
          total: 0,
        });
        return;
        // throw new Error('No hay datos disponibles.');
      }

      const meta = response.data.meta?.pagination;
      if (!meta) {
        throw new Error('No se encontró información de paginación.');
      }
      console.log(response.data.data);
      setData(response.data.data);
      
      setPagination((prev) => ({
        ...prev,
        current: meta.current_page,
        pageSize: meta.per_page,
        total: meta.total,
      }));
    } catch (error: any) {
      const mensajeError = obtenerMensajeError(error);
      AlertaErrorToast(mensajeError);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData(pagination.current, pagination.pageSize, activeSearchTerm);
  // }, [pagination.current, pagination.pageSize, apiUrl, activeSearchTerm, forzarFiltro]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData(pagination.current, pagination.pageSize, activeSearchTerm);
    }, intervaloRecarga);

    return () => clearInterval(intervalId);
  }, []);

  const handleTableChange: TableProps<any>['onChange'] = (newPagination) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize || prev.pageSize, // Usar el nuevo pageSize si está disponible
    }));
  };

  const handleSearch = () => {
    setActiveSearchTerm(searchTerm); // Confirmar término de búsqueda
    setPagination((prev) => ({ ...prev, current: 1 })); // Reiniciar la paginación
  };

  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        rowKey={rowKey}
        components={
          colorearHeader
            ? {
                header: {
                  cell: (props) => (
                    <th
                      {...props}
                      style={{
                        backgroundColor: headerColor,
                        color: headerTextColor,
                        ...props.style,
                      }}
                    />
                  ),
                },
              }
            : undefined
        }
        pagination={
          mostrarPaginacion ?
          {
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '15', '20', '50'],
            showTotal: (total, [start, end]) => `Mostrando ${start}-${end} de ${total} registros`,
          } : false
        }
        loading={loading}
        onChange={handleTableChange}
        size="small"
        scroll={{ x: "max-content" }} // Agrega scroll horizontal automáticamente
        onRow={(record) => ({
          onClick: () => {
            if (onRowClick) {
              if(onRowClickID){
                onRowClick(record[rowKey]);
              }else{
                onRowClick(record);
              }
            }
            if (expandable && typeof expandable.onExpand === 'function') {
              const key = record[rowKey];
              const isNowExpanded = !(
                (expandable.expandedRowKeys || []).includes(key)
              );
              expandable.onExpand(isNowExpanded, record);
            }
          },
        })}
        rowClassName={(record) => {
          return onRowColorClick && onRowColorClick(record[rowKey]) ? 'fila-seleccionada' : '';
        }}
        {...(expandable ? { expandable } : {})}
      />
    </>
  );
};

export default TablaNegocios;
