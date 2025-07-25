// src/components/EventForm.jsx
import React, { useEffect, useState } from 'react';
import {
  TextField, Button, Box, MenuItem, FormControlLabel, Switch,
} from '@mui/material';
import api from '../services/api';
import { getCoordsByAddress } from '../utils/geocode';

const EventForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '', description: '', date: '', time: '',
    address: '', category: '', is_free: true, price: '', url: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const coords = await getCoordsByAddress(formData.address);
      const geoData = {
        ...formData,
        latitude: coords[0],
        longitude: coords[1],
      };
      onSubmit(geoData);
    } catch (err) {
      alert('Не удалось получить координаты. Проверьте адрес.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="event-form">
      <TextField label="Название" name="title" value={formData.title} onChange={handleChange} required />
      <TextField label="Описание" name="description" value={formData.description} onChange={handleChange} required multiline />
      <TextField type="date" name="date" value={formData.date} onChange={handleChange} required />
      <TextField type="time" name="time" value={formData.time} onChange={handleChange} required />
      <TextField label="Адрес (улица, город)" name="address" value={formData.address} onChange={handleChange} required />
      <TextField label="Категория" select name="category" value={formData.category} onChange={handleChange} required>
        {categories.map(cat => (
          <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
        ))}
      </TextField>
      <FormControlLabel control={<Switch checked={formData.is_free} onChange={handleChange} name="is_free" />} label="Бесплатно" />
      {!formData.is_free && (
        <TextField label="Цена" type="number" name="price" value={formData.price} onChange={handleChange} />
      )}
      <TextField label="Ссылка (если есть)" name="url" value={formData.url} onChange={handleChange} />
      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? 'Сохраняю...' : 'Сохранить'}
      </Button>
    </Box>
  );
};

export default EventForm;
