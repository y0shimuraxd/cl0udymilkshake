import React, { useState } from 'react';
import { addEvent } from '../api/events';

export default function EventForm({ token }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    address: '',
    latitude: '',
    longitude: '',
    price: '',
    is_free: false,
    category: '',
  });
  const [message, setMessage] = useState('');

  function onChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.latitude || !form.longitude) {
      setMessage('Укажите координаты (latitude и longitude) обязательно');
      return;
    }

    const eventData = {
      title: form.title,
      description: form.description,
      date: form.date,
      address: form.address,
      location: {
        type: 'Point',
        coordinates: [parseFloat(form.longitude), parseFloat(form.latitude)],
      },
      price: form.price ? parseFloat(form.price) : null,
      is_free: form.is_free,
      category: form.category,
    };

    try {
      await addEvent(eventData, token);
      setMessage('Мероприятие успешно добавлено!');
      setForm({
        title: '',
        description: '',
        date: '',
        address: '',
        latitude: '',
        longitude: '',
        price: '',
        is_free: false,
        category: '',
      });
    } catch (err) {
      setMessage('Ошибка при добавлении мероприятия');
    }
  }

  return (
    <form className="event-form liquid-glass" onSubmit={onSubmit}>
      <h2>Добавить мероприятие</h2>

      <input
        name="title"
        value={form.title}
        onChange={onChange}
        placeholder="Название"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={onChange}
        placeholder="Описание"
        required
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={onChange}
        required
      />

      <input
        name="address"
        value={form.address}
        onChange={onChange}
        placeholder="Адрес"
      />

      <input
        name="latitude"
        value={form.latitude}
        onChange={onChange}
        placeholder="Широта"
        type="number"
        step="0.000001"
        required
      />

      <input
        name="longitude"
        value={form.longitude}
        onChange={onChange}
        placeholder="Долгота"
        type="number"
        step="0.000001"
        required
      />

      <input
        name="price"
        value={form.price}
        onChange={onChange}
        placeholder="Цена (если платно)"
        type="number"
        step="0.01"
      />

      <label>
        <input
          type="checkbox"
          name="is_free"
          checked={form.is_free}
          onChange={onChange}
        />
        Бесплатно
      </label>

      <input
        name="category"
        value={form.category}
        onChange={onChange}
        placeholder="ID категории"
        required
      />

      <button type="submit">Добавить</button>

      {message && <p>{message}</p>}
    </form>
  );
}
