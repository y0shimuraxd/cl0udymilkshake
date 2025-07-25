import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      setCoordinates({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
};

const MapComponent = ({ coordinates, setCoordinates }) => {
  return (
    <MapContainer
      center={[55.75, 37.61]}
      zoom={11}
      style={{ height: '400px', marginTop: '20px' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationMarker setCoordinates={setCoordinates} />
      {coordinates && <Marker position={[coordinates.lat, coordinates.lng]} />}
    </MapContainer>
  );
};

export default MapComponent;
