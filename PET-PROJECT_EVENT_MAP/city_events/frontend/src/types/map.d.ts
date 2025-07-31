import { Event } from './event';

export interface MapContextType {
  events: Event[];
  selectedEvent: Event | null;
  setSelectedEvent: (event: Event | null) => void;
  center: [number, number];
  setCenter: (center: [number, number]) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  loading: boolean;
  error: string | null;
}

export interface MapMarker {
  id: number;
  coordinates: [number, number];
  event: Event;
}