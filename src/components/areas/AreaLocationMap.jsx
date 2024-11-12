import { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";

const defaultCenter = {
  lat: -14.235004,
  lng: -51.92528
};

const AreaLocationMap = ({ 
  location, 
  onLocationChange, 
  readOnly = false,
  mapImage,
  onMapImageChange 
}) => {
  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    setMap(map);
    if (location) {
      map.panTo(location);
    }
  }, [location]);

  const handleClick = useCallback((e) => {
    if (!readOnly) {
      const newLocation = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      onLocationChange(newLocation);
      captureMap(newLocation);
    }
  }, [onLocationChange, readOnly]);

  const captureMap = useCallback(async (newLocation) => {
    if (map) {
      map.panTo(newLocation);
      await new Promise(resolve => setTimeout(resolve, 500)); // Aguarda o mapa centralizar
      
      const element = document.getElementById('map-container');
      const canvas = await html2canvas(element);
      const imageData = canvas.toDataURL('image/png');
      onMapImageChange(imageData);
    }
  }, [map, onMapImageChange]);

  return (
    <div className="space-y-4">
      {mapImage && (
        <div className="border rounded-lg overflow-hidden">
          <img 
            src={mapImage} 
            alt="Local selecionado no mapa" 
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      <div 
        id="map-container" 
        className="border rounded-lg overflow-hidden"
      >
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={location || defaultCenter}
            zoom={location ? 15 : 4}
            onLoad={onLoad}
            onClick={handleClick}
            options={{
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
          >
            {location && <Marker position={location} />}
          </GoogleMap>
        </LoadScript>
      </div>
      {!readOnly && (
        <p className="text-sm text-muted-foreground">
          Clique no mapa para selecionar a localização
        </p>
      )}
    </div>
  );
};

export default AreaLocationMap;