import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Upload, Button } from "antd";
import type { UploadProps } from "antd";
import AlertaErrorToast from '../utils/AlertaErrorToast';

type SubirImagenProps = {
  value?: string; // Valor inicial (puede ser string o undefined)
  onChange?: (value: any[]) => void; // Cambia a aceptar un arreglo de UploadFile<any>
};

const SubirImagen: React.FC<SubirImagenProps> = ({ value = "", onChange }) => {
  const [loading, setLoading] = useState(false);
  
  // Maneja los posibles valores de value correctamente.
  const [imageUrl, setImageUrl] = useState<string | undefined>(
    typeof value === "string" ? value : undefined
  );
  const [fileList, setFileList] = useState<any[]>(Array.isArray(value) ? value : value ? [value] : []);

  // Archivos permitidos para subir
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  //Tamaño permitido para subir
  const maxFileSize = 10 * 1024 * 1024; // 10 MB en bytes

  const getBase64 = (file: File, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(file);
  };

  const handleChange: UploadProps["onChange"] = (info) => { 
    // Validar tipo del archivo adjuntado
    if (info.file.status !== "removed" && info.fileList[0]?.type && !allowedTypes.includes(info?.fileList[0]?.type)) {
      AlertaErrorToast(`El archivo debe ser de tipo imagen PNG o JPG o JPEG`);
      return Upload.LIST_IGNORE; // Ignorar el archivo
    }

    if (
      info.file.status !== "removed" &&
      Array.isArray(info.fileList) && // Aseguramos que fileList es un array
      info.fileList.length > 0 && // Aseguramos que fileList no esté vacío
      info.fileList[0] && // Aseguramos que el primer archivo existe
      info.fileList[0].size && // Verificamos que el tamaño del archivo esté disponible
      info.fileList[0].size > maxFileSize // Comprobamos el tamaño
    ) {
      AlertaErrorToast(`El archivo no debe ser mayor a 10 MB`);
      return Upload.LIST_IGNORE; // Ignorar el archivo
    } 
  
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as File, (url) => {
        setLoading(false);
        setImageUrl(url);
        onChange?.([url]); // Actualiza el valor del formulario
      });
    }

    setFileList(info.fileList); // Actualiza el estado interno del componente
    onChange?.([info.fileList[0]]); // Pasa el archivo dentro de un array
  };

  return (
    <Upload
      listType="picture"
      fileList={fileList} // Asegura que el estado esté controlado
      onChange={handleChange}
      maxCount={1}
      beforeUpload={() => false}
      accept={allowedTypes.join(",")} // Restringe los tipos de archivo visibles
    >
      <Button icon={<UploadOutlined />}>
        Subir Archivo
      </Button>
    </Upload>
  );
};

export default SubirImagen;
