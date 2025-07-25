import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventForm from './EventForm';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const prepareEventData = (formData) => {
  return {
    title: formData.title,
    description: formData.description,
    date: formData.date,
    time: formData.time,
    location: formData.address,        // переименование address → location
    category_id: formData.category,    // category → category_id
    is_free: formData.is_free,
    price: formData.price,
    url: formData.url && formData.url.startsWith('http') 
      ? formData.url 
      : (formData.url ? 'https://' + formData.url : ''),
  };
};

const AddEventComponent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const preparedData = prepareEventData(formData);
      await api.createEvent(preparedData);
      navigate('/');
    } catch (error) {
      console.error('Ошибка создания события:', error);
      throw error;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Добавить новое мероприятие
        </Typography>
        <EventForm onSubmit={handleSubmit} />
      </Box>
    </Container>
  );
};

export default AddEventComponent;
