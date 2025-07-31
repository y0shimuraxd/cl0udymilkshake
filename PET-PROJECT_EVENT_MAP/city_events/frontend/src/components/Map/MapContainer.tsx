import React, { useEffect, useRef } from 'react';
import { YMaps, Map, Clusterer } from '@pbe/react-yandex-maps';
import { useMapContext } from '../../contexts/MapContext';
import CustomMarker from './CustomMarker';
import { motion } from 'framer-motion';

const MapContainer: React.FC = () => {
  const { events, center, zoom, setSelectedEvent, loading } = useMapContext();
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (mapRef.current) {
      // Additional map configuration can go here
    }
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
          <p className="text-dark/60">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return (
    <YMaps>
      <Map
        state={{ center, zoom }}
        width="100%"
        height="100%"
        options={{ 
          suppressMapOpenBlock: true,
          suppressObsoleteBrowserNotifier: true,
        }}
        instanceRef={mapRef}
      >
        <Clusterer
          options={{
            preset: 'islands#invertedVioletClusterIcons',
            groupByCoordinates: false,
            clusterDisableClickZoom: true,
            clusterHideIconOnBalloonOpen: false,
            geoObjectHideIconOnBalloonOpen: false,
          }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <CustomMarker
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            </motion.div>
          ))}
        </Clusterer>
      </Map>
    </YMaps>
  );
};

export default MapContainer;