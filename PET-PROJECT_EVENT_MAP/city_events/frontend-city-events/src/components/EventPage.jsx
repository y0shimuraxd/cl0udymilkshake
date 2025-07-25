import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEventById } from '../api/events'; // предполагается, что есть такой API-запрос

const EventPage = () => {
  const { id } = useParams(); // получаем id события из URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEventById(id)
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Ошибка при загрузке события:', err);
        setError('Не удалось загрузить мероприятие');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>Мероприятие не найдено</p>;

  return (
    <div className="event-page">
      <h1>{event.title || event.properties?.title}</h1>
      <p>{event.description || event.properties?.description}</p>
      <p>
        <strong>Дата:</strong> {event.date || ''}
      </p>
      <p>
        <strong>Время:</strong> {event.time || ''}
      </p>
      <p>
        <strong>Место проведения:</strong>{' '}
        {event.geometry?.coordinates
          ? `Широта: ${event.geometry.coordinates[1]}, Долгота: ${event.geometry.coordinates[0]}`
          : 'Не указано'}
      </p>
      {/* Добавь дополнительные поля или стили по необходимости */}
    </div>
  );
};

export default EventPage;
