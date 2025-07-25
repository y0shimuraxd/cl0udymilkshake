import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Замените на ваш бэкенд URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Добавляем токен к запросам
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default {
  // Аутентификация
  register: (data) => api.post('/register/', data),
  login: (data) => api.post('/login/', data),
  logout: () => api.post('/logout/'),
  getCurrentUser: () => api.get('/me/'),
  
  // События
  getEvents: (params) => api.get('/events/', { params }),
  getEvent: (id) => api.get(`/events/${id}/`),
  createEvent: (data) => api.post('/events/', data),
  
  // Категории
  getCategories: () => api.get('/categories/'),
};