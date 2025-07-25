// pages/AddEventPage.js
import React, { useEffect, useState } from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventForm from '../components/EventForm';
import api from '../services/api';
import { useRouter } from 'next/router';

const prepareEventData = (formData) => {
  return {
    title: formData.title,
    description: formData.description,
    date: formData.date,
    time: formData.time,
    address: formData.address, // сохраняем адрес отдельно
    location: formData.location, // POINT(lng lat) будет формироваться из карты
    category_id: formData.category,
    is_free: formData.is_free,
    price: formData.price,
    url: formData.url && formData.url.startsWith('http')
      ? formData.url
      : (formData.url ? 'https://' + formData.url : ''),
  };
};

const AddEventPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await api.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Ошибка загрузки категорий:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const preparedData = prepareEventData(formData);
      await api.createEvent(preparedData);
      router.push('/');
    } catch (error) {
      console.error('Ошибка создания события:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Добавить новое мероприятие
        </Typography>

        {loading ? (
          <Typography>Загрузка категорий...</Typography>
        ) : (
          <EventForm onSubmit={handleSubmit} categories={categories} />
        )}
      </Box>
    </Container>
  );
};

export default AddEventPage;
