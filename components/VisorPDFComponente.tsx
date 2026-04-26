import { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';

interface PdfViewerProps {
  pdfBlobUrl: string;
}

export function VisorPDFComponente({ pdfBlobUrl }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  // Al montar y al redimensionar, actualiza el ancho real del contenedor
  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div    
      ref={containerRef}
      style={{
        width: '100%',
        height: '600px',
        overflowY: 'auto',
        border: '1px solid #ddd',
      }}
    >
      <Document
        file={pdfBlobUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading="Cargando documento…"
        renderMode="canvas"
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={`page_${i + 1}`}
            pageNumber={i + 1}
            width={width > 700 ? 700 : width}
            loading=""
          />
        ))}
      </Document>
    </div>
  );
}
