import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Чтобы маркеры нормально отображались в Next.js (фикс бага с иконками leaflet)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

const MapView = ({ events = [], onViewportChange }) => {
  const position = [57.6261, 39.8845]; // Ярославль

  return (
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: '500px', width: '100%', borderRadius: '12px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}
      whenCreated={(map) => {
        map.on('moveend', () => {
          const bounds = map.getBounds();
          onViewportChange && onViewportChange({
            northEast: bounds.getNorthEast(),
            southWest: bounds.getSouthWest(),
          });
        });
      }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.latitude, event.longitude]}
        >
          <Popup>
            <strong>{event.title}</strong><br />
            {event.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
