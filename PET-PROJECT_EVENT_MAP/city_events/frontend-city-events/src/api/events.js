import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getEvents(filters = {}) {
  const params = {};
  if (filters.category) params.category_id = filters.category;
  if (filters.date) params.date = filters.date;
  if (filters.price) {
    if (filters.price === 'free') params.is_free = true;
    if (filters.price === 'paid') params.is_free = false;
  }

  const res = await axios.get(`${API_URL}/events/`, { params });
  return res.data;
}

export async function addEvent(eventData, token) {
  const res = await axios.post(`${API_URL}/events/`, eventData, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return res.data;
}
