import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const data = await login(form.username, form.password);
      setToken(data.token);
      navigate('/');
    } catch {
      setError('Неверные логин или пароль');
    }
  }

  return (
    <form className="auth-form liquid-glass" onSubmit={onSubmit}>
      <h2>Вход</h2>

      <input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="Логин"
        required
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={onChange}
        placeholder="Пароль"
        required
      />

      <button type="submit">Войти</button>

      {error && <p className="error">{error}</p>}

      <p>
        Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
      </p>
    </form>
  );
}
