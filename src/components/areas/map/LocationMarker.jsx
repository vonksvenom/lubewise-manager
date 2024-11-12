import { Marker, useMapEvents } from "react-leaflet";

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

export default LocationMarker;