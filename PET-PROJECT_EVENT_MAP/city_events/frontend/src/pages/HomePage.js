import dynamic from 'next/dynamic'; // Добавьте этот импорт
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import EventList from '../components/EventList';
import api from '../services/api';

const MapView = dynamic(
  () => import('../components/MapView'),
  { 
    ssr: false,
    loading: () => <Box sx={{ height: 500, bgcolor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      Загрузка карты...
    </Box> 
  }
);

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const loadEvents = async (params = {}) => {
    try {
      const response = await api.getEvents(params);
      setEvents(response.data);
    } catch (error) {
      console.error('Ошибка загрузки событий:', error);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleViewportChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    loadEvents(updatedFilters);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Карта событий
        </Typography>
        
        <Box sx={{ mb: 4, height: '500px' }}>
          <MapView 
            events={events} 
            onViewportChange={handleViewportChange} 
          />
        </Box>
        
        <Typography variant="h5" component="h2" gutterBottom>
          Предстоящие события
        </Typography>
        
        <EventList events={events} />
      </Box>
    </Container>
  );
};

export default HomePage;