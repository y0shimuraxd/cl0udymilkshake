// components/EventForm.js
import React, { useState } from 'react';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import Map from './DynamicMap';

const EventForm = ({ onSubmit, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    address: '',
    category: '',
    is_free: false,
    price: '',
    url: '',
  });

  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fullData = {
        ...formData,
        location: coordinates
          ? `POINT(${coordinates.lng} ${coordinates.lat})`
          : null,
      };
      await onSubmit(fullData);
      setError('');
    } catch (err) {
      setError('Ошибка при создании события');
      if (err.response) {
        console.error('Ошибка при создании события:', err.response.data);
      } else {
        console.error('Ошибка при создании события:', err.message);
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h5" gutterBottom>
        Создать событие
      </Typography>

      <TextField
        label="Название"
        name="title"
        fullWidth
        margin="normal"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <TextField
        label="Описание"
        name="description"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        label="Дата"
        name="date"
        type="date"
        fullWidth
        margin="normal"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Время"
        name="time"
        type="time"
        fullWidth
        margin="normal"
        value={formData.time}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      <TextField
        label="Адрес"
        name="address"
        fullWidth
        margin="normal"
        value={formData.address}
        onChange={handleChange}
        required
      />

      <TextField
        select
        label="Категория"
        name="category"
        fullWidth
        margin="normal"
        value={formData.category}
        onChange={handleChange}
        required
      >
        {categories.length > 0 ? (
          categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="">
            Категории недоступны
          </MenuItem>
        )}
      </TextField>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.is_free}
            onChange={handleChange}
            name="is_free"
          />
        }
        label="Бесплатное мероприятие"
      />
      {!formData.is_free && (
        <TextField
          label="Цена"
          name="price"
          type="number"
          fullWidth
          margin="normal"
          value={formData.price}
          onChange={handleChange}
        />
      )}
      <TextField
        label="Ссылка"
        name="url"
        fullWidth
        margin="normal"
        value={formData.url}
        onChange={handleChange}
      />

      <Map coordinates={coordinates} setCoordinates={setCoordinates} />

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Добавить
      </Button>
    </Box>
  );
};

export default EventForm;
