import axios from 'axios';
import { Event, EventFormData, EventFilters } from '../types/event';
import { LoginData, RegisterData, LoginResponse, RegisterResponse } from '../types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    // Django Token Authentication использует формат "Token <token>"
    config.headers.Authorization = `Token ${token}`;
  }
  
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // Можно добавить редирект на страницу логина
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

// Events API
export const fetchEvents = async (filters: EventFilters = {}): Promise<Event[]> => {
  try {
    const response = await api.get('/events/', { params: filters });
    return response.data.results || response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
  }
};

export const createEvent = async (eventData: EventFormData): Promise<Event> => {
  try {
    const response = await api.post('/events/', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    if (error.response?.data) {
      const errorMessage = typeof error.response.data === 'string' 
        ? error.response.data 
        : error.response.data.detail || 'Failed to create event';
      throw new Error(errorMessage);
    }
    throw new Error('Failed to create event');
  }
};

export const updateEvent = async (id: number, eventData: Partial<EventFormData>): Promise<Event> => {
  try {
    const response = await api.put(`/events/${id}/`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw new Error('Failed to update event');
  }
};

export const deleteEvent = async (id: number): Promise<void> => {
  try {
    await api.delete(`/events/${id}/`);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Failed to delete event');
  }
};

// Auth API
export const login = async (credentials: LoginData): Promise<LoginResponse> => {
  try {
    const response = await api.post('/login/', credentials);
    
    // Сохраняем токен
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error);
    if (error.response?.data) {
      // Обработка ошибок от Django
      let errorMessage = 'Invalid credentials';
      
      if (error.response.data.error) {
        errorMessage = error.response.data.error;
      } else if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.detail) {
        errorMessage = error.response.data.detail;
      }
      
      throw new Error(errorMessage);
    }
    throw new Error('Invalid credentials');
  }
};

export const register = async (data: RegisterData): Promise<RegisterResponse> => {
  try {
    const response = await api.post('/register/', data);
    
    // Сохраняем токен
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error registering:', error);
    if (error.response?.data) {
      // Обработка ошибок валидации от Django
      const errorMessages: string[] = [];
      
      // Обработка разных типов ошибок
      if (error.response.data.username) {
        errorMessages.push(`Username: ${Array.isArray(error.response.data.username) ? error.response.data.username.join(', ') : error.response.data.username}`);
      }
      if (error.response.data.email) {
        errorMessages.push(`Email: ${Array.isArray(error.response.data.email) ? error.response.data.email.join(', ') : error.response.data.email}`);
      }
      if (error.response.data.password) {
        errorMessages.push(`Password: ${Array.isArray(error.response.data.password) ? error.response.data.password.join(', ') : error.response.data.password}`);
      }
      if (error.response.data.non_field_errors) {
        errorMessages.push(...error.response.data.non_field_errors);
      }
      
      const errorMessage = errorMessages.length > 0 
        ? errorMessages.join('. ') 
        : 'Registration failed';
      
      throw new Error(errorMessage);
    }
    throw new Error('Registration failed');
  }
};

export const logout = async () => {
  try {
    // Если у вас есть endpoint для logout на бэкенде
    await api.post('/logout/');
  } catch (error) {
    console.error('Error logging out:', error);
  } finally {
    // Очищаем токен в любом случае
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
};

// Get current user info
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/me/');
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Categories API
export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories/');
    return response.data.results || response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};