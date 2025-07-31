import React from 'react';

const Header: React.FC = () => (
  <header className="glass flex items-center justify-between px-8 py-4 shadow-glass mb-8">
    <div className="text-2xl font-extrabold text-primary tracking-tight drop-shadow-lg">CityEvents</div>
    <nav className="flex gap-6">
      <a href="/" className="text-dark/80 hover:text-primary transition">Главная</a>
      <a href="/add-event" className="text-dark/80 hover:text-primary transition">Добавить событие</a>
    </nav>
  </header>
);

export default Header;