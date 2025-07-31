import { useState, useEffect } from 'react';
import { Event, EventFilters } from '../types/event';
import { fetchEvents } from '../utils/api';

export const useEvents = (filters: EventFilters = {}) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEvents(filters);
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load events');
        console.error('Error loading events:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [JSON.stringify(filters)]);

  const addEvent = async (eventData: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // This would call your API to add an event
      // For now, we'll just add it to the local state
      const newEvent: Event = {
        ...eventData,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      throw err;
    }
  };

  return { events, loading, error, addEvent };
};