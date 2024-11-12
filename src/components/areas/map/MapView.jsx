import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker from "./LocationMarker";

const defaultCenter = {
  lat: -14.235004,
  lng: -51.92528
};

const MapView = ({ position, setPosition, readOnly }) => {
  return (
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
        setPosition={setPosition}
        readOnly={readOnly}
      />
    </MapContainer>
  );
};

export default MapView;