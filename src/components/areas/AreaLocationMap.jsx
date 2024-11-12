import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import MapView from "./map/MapView";
import FileView from "./map/FileView";

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

  const handleImageClick = (e) => {
    if (!readOnly && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMarkerPosition({ x, y });
      onLocationChange({ type: 'image', x, y, imageUrl: file });
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

      <div ref={containerRef} className="border rounded-lg overflow-hidden h-[400px]">
        {locationType === "map" ? (
          <MapView
            position={position}
            setPosition={handlePositionChange}
            readOnly={readOnly}
          />
        ) : (
          <FileView
            file={file}
            setFile={setFile}
            markerPosition={markerPosition}
            setMarkerPosition={setMarkerPosition}
            containerRef={containerRef}
            readOnly={readOnly}
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            onDocumentLoadSuccess={onDocumentLoadSuccess}
            handleImageClick={handleImageClick}
          />
        )}
      </div>

      {/* Display coordinates */}
      {position && locationType === "map" && (
        <div className="mt-2 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Coordenadas do local:</p>
          <p className="text-sm">Latitude: {position.lat.toFixed(6)}</p>
          <p className="text-sm">Longitude: {position.lng.toFixed(6)}</p>
        </div>
      )}

      {markerPosition && locationType === "file" && (
        <div className="mt-2 p-2 bg-muted rounded-md">
          <p className="text-sm font-medium">Posição no documento:</p>
          <p className="text-sm">X: {markerPosition.x.toFixed(2)}%</p>
          <p className="text-sm">Y: {markerPosition.y.toFixed(2)}%</p>
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