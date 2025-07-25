import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api/auth';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(form.username, form.email, form.password);
      setSuccess('Регистрация прошла успешно! Можете войти.');
      setTimeout(() => navigate('/login'), 2000);
    } catch {
      setError('Ошибка при регистрации');
    }
  }

  return (
    <form className="auth-form liquid-glass" onSubmit={onSubmit}>
      <h2>Регистрация</h2>

      <input
        name="username"
        value={form.username}
        onChange={onChange}
        placeholder="Логин"
        required
      />

      <input
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="Email"
        type="email"
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

      <button type="submit">Зарегистрироваться</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}
