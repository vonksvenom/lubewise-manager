import { useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Document, Page } from 'react-pdf';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import html2canvas from "html2canvas";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const defaultCenter = {
  lat: -14.235004,
  lng: -51.92528
};

const LocationMarker = ({ position, setPosition, readOnly }) => {
  useMapEvents({
    click(e) {
      if (!readOnly) {
        setPosition(e.latlng);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const AreaLocationMap = ({ 
  location, 
  onLocationChange, 
  readOnly = false,
  mapImage,
  onMapImageChange 
}) => {
  const [locationType, setLocationType] = useState("map");
  const [position, setPosition] = useState(location);
  const [file, setFile] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef(null);

  const handlePositionChange = useCallback((newPosition) => {
    setPosition(newPosition);
    onLocationChange(newPosition);
    captureMap(newPosition);
  }, [onLocationChange]);

  const captureMap = useCallback(async (newPosition) => {
    if (containerRef.current) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const canvas = await html2canvas(containerRef.current);
      const imageData = canvas.toDataURL('image/png');
      onMapImageChange(imageData);
    }
  }, [onMapImageChange]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(URL.createObjectURL(file));
      setMarkerPosition(null);
    }
  };

  const handleImageClick = (e) => {
    if (!readOnly && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMarkerPosition({ x, y });
      
      // Save location data
      onLocationChange({ type: 'image', x, y, imageUrl: file });
      
      // Capture the marked image
      captureMap({ x, y });
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="space-y-4">
      {!readOnly && (
        <div className="flex gap-4 mb-4">
          <Button
            variant={locationType === "map" ? "default" : "outline"}
            onClick={() => setLocationType("map")}
          >
            Usar Mapa
          </Button>
          <Button
            variant={locationType === "file" ? "default" : "outline"}
            onClick={() => setLocationType("file")}
          >
            Usar Arquivo
          </Button>
        </div>
      )}

      {mapImage && (
        <div className="border rounded-lg overflow-hidden">
          <img 
            src={mapImage} 
            alt="Local selecionado" 
            className="w-full h-48 object-cover"
          />
        </div>
      )}

      {locationType === "map" ? (
        <div 
          ref={containerRef}
          className="border rounded-lg overflow-hidden h-[400px]"
        >
          <MapContainer
            center={position || defaultCenter}
            zoom={position ? 15 : 4}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationMarker 
              position={position} 
              setPosition={handlePositionChange}
              readOnly={readOnly}
            />
          </MapContainer>
        </div>
      ) : (
        <div className="space-y-4">
          <Input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
            disabled={readOnly}
          />
          
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
          
          {file?.endsWith('.pdf') && numPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                disabled={pageNumber <= 1}
              >
                Anterior
              </Button>
              <span>
                Página {pageNumber} de {numPages}
              </span>
              <Button
                onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
                disabled={pageNumber >= numPages}
              >
                Próxima
              </Button>
            </div>
          )}
        </div>
      )}

      {!readOnly && (
        <p className="text-sm text-muted-foreground">
          {locationType === "map" 
            ? "Clique no mapa para selecionar a localização"
            : "Faça upload de uma imagem ou PDF e clique para marcar a localização"}
        </p>
      )}
    </div>
  );
};

export default AreaLocationMap;