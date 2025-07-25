import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getCategories() {
  const res = await axios.get(`${API_URL}/categories/`);
  return res.data;
}
