import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import api from '../services/api';

const EventMap = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.getEvents();
        setEvents(res.data.features || []);
      } catch (error) {
        console.error('Ошибка загрузки мероприятий:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <YMaps query={{ apikey: process.env.NEXT_PUBLIC_YANDEX_API_KEY }}>
      <Map defaultState={{ center: [57.6261, 39.8845], zoom: 12 }} width="100%" height="500px">
        {events.map((event) => (
          <Placemark
            key={event.id}
            geometry={event.geometry.coordinates.reverse()} // [lat, lon]
            properties={{
              balloonContent: `
                <strong>${event.properties.title}</strong><br/>
                ${event.properties.description}<br/>
                ${event.properties.date} ${event.properties.time}
              `,
            }}
            options={{
              preset: 'islands#icon',
              iconColor: '#00C9A7',
            }}
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default EventMap;
