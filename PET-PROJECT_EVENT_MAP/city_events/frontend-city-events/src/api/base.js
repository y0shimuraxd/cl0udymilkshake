// src/api/base.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  // можно добавить headers, timeout и т.п.
});

export default api;
