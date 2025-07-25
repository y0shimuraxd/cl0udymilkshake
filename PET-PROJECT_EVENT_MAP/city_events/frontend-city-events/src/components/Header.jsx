import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ token, setToken }) {
  const navigate = useNavigate();

  function logout() {
    setToken('');
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <header className="header">
      <nav>
        <Link to="/" className="logo">Афиша Ярославля</Link>
        <div className="nav-links">
          <Link to="/">Карта</Link>
          {token && <Link to="/add">Добавить мероприятие</Link>}
          {token && <Link to="/profile">Профиль</Link>}
          {!token && <Link to="/login">Войти</Link>}
          {!token && <Link to="/register">Регистрация</Link>}
          {token && <button onClick={logout} className="btn-logout">Выйти</button>}
        </div>
      </nav>
    </header>
  );
}
