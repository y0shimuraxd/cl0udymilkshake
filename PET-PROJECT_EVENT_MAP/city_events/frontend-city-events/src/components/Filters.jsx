import React, { useEffect, useState } from 'react';
import { getCategories } from '../api/categories';

export default function Filters({ filters, setFilters }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  function onChange(e) {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="filters liquid-glass">
      <select name="category" value={filters.category} onChange={onChange}>
        <option value="">Все категории</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={onChange}
        placeholder="Дата"
      />

      <select name="price" value={filters.price} onChange={onChange}>
        <option value="">Все цены</option>
        <option value="free">Бесплатно</option>
        <option value="paid">Платно</option>
      </select>
    </div>
  );
}
