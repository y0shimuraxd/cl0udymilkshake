import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Profile({ token }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/auth/user/`, {
      headers: { Authorization: `Token ${token}` },
    }).then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [token]);

  if (!user) return <p>Загрузка...</p>;

  return (
    <div className="profile liquid-glass">
      <h2>Профиль пользователя</h2>
      <p>Логин: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
