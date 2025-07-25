import React, { useState } from 'react';

export default function AddEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику отправки данных на сервер
    console.log({ title, description, date, location });
    alert('Мероприятие добавлено!');

    // Очистить форму
    setTitle('');
    setDescription('');
    setDate('');
    setLocation('');
  };

  return (
    <div className="add-event">
      <h2>Добавить мероприятие</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Введите название"
          />
        </label>
        <label>
          Описание:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Описание мероприятия"
            rows={4}
          />
        </label>
        <label>
          Дата и время:
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Место проведения:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Где будет мероприятие?"
          />
        </label>
        <button type="submit">Добавить</button>
      </form>
    </div>
  );
}
