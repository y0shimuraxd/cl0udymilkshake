import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { getEvents } from '../api/events';

const EventMap = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvents()
      .then(raw => {
        // Если приходит GeoJSON, используем features, иначе raw
        const data = raw?.features ?? raw;

        // Проверяем, что data — массив, иначе пустой массив
        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.warn('Полученные данные не являются массивом:', data);
          setEvents([]);
        }
      })
      .catch(err => {
        console.error('Ошибка загрузки мероприятий:', err);
        setError('Не удалось загрузить события');
      });
  }, []);

  if (error) {
    return <div style={{ color: 'red', padding: '1rem' }}>{error}</div>;
  }

  return (
    <YMaps apikey={import.meta.env.VITE_YANDEX_MAP_API_KEY}>
      <Map
        defaultState={{ center: [57.6261, 39.8845], zoom: 12 }}
        width="100%"
        height="500px"
      >
        {Array.isArray(events) &&
          events.map((event, i) => {
            // Получаем координаты из GeoJSON или из обычного объекта
            const coords = event.geometry?.coordinates || [event.latitude, event.longitude];

            // Если координаты есть и это массив из 2 чисел — отрисовываем Placemark
            if (!Array.isArray(coords) || coords.length < 2) return null;

            const title = event.properties?.title || event.title || 'Событие';
            const description = event.properties?.description || event.description || '';

            return (
              <Placemark
                key={i}
                geometry={coords}
                properties={{
                  balloonContentHeader: title,
                  balloonContentBody: (
                    <div className="liquid-glass-popup">
                      <p>{description}</p>
                      <em>{event.date || ''} {event.time || ''}</em>
                    </div>
                  ),
                }}
                options={{
                  preset: 'islands#blueIcon',
                }}
              />
            );
          })}
      </Map>
    </YMaps>
  );
};

export default EventMap;
