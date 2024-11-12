import { useRef } from "react";
import { Document, Page } from 'react-pdf';
import { Input } from "@/components/ui/input";

const FileView = ({ 
  file, 
  setFile, 
  markerPosition, 
  setMarkerPosition, 
  containerRef, 
  readOnly,
  numPages,
  pageNumber,
  setPageNumber,
  onDocumentLoadSuccess,
  handleImageClick 
}) => {
  return (
    <div className="space-y-4">
      {!readOnly && (
        <Input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={(event) => {
            const file = event.target.files[0];
            if (file) {
              setFile(URL.createObjectURL(file));
              setMarkerPosition(null);
            }
          }}
          disabled={readOnly}
        />
      )}
      
      {file && (
        <div 
          ref={containerRef}
          className="relative border rounded-lg overflow-hidden"
          style={{ minHeight: "400px" }}
          onClick={handleImageClick}
        >
          {file.endsWith('.pdf') ? (
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} />
            </Document>
          ) : (
            <img 
              src={file} 
              alt="Local selecionado"
              className="w-full h-full object-contain"
            />
          )}
          
          {markerPosition && (
            <div
              className="absolute w-4 h-4 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${markerPosition.x}%`,
                top: `${markerPosition.y}%`,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FileView;