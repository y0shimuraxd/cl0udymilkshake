import React, { createContext, useState, useContext, useEffect } from 'react';
import { Event } from '../types/event';
import { MapContextType } from '../types/map';
import { fetchEvents } from '../utils/api';

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [center, setCenter] = useState<[number, number]>([57.6261, 39.8845]); // Ярославль
  const [zoom, setZoom] = useState(11);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const value: MapContextType = {
    events,
    selectedEvent,
    setSelectedEvent,
    center,
    setCenter,
    zoom,
    setZoom,
    loading,
    error,
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within MapProvider');
  }
  return context;
};