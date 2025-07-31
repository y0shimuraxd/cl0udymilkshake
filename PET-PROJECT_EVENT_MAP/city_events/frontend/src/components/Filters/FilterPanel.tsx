import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventFilters } from '../../types/event';
import { slideInDown } from '../../utils/animations';
import AnimatedButton from '../UI/AnimatedButton';
import IconButton from '../UI/IconButton';

interface FilterPanelProps {
  filters: EventFilters;
  updateFilter: (key: keyof EventFilters, value: any) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ 
  filters, 
  updateFilter, 
  resetFilters, 
  hasActiveFilters 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
    'Концерт',
    'Выставка', 
    'Мастер-класс',
    'Театр',
    'Спорт',
    'Фестиваль',
    'Другое'
  ];

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={slideInDown}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary">Фильтры</h3>
        <IconButton
          onClick={() => setIsExpanded(!isExpanded)}
          size="sm"
          variant="ghost"
          aria-label={isExpanded ? 'Свернуть фильтры' : 'Развернуть фильтры'}
        >
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </IconButton>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark/80">
                Поиск по названию
              </label>
              <input
                type="text"
                value={filters.searchQuery || ''}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                placeholder="Введите название события..."
                className="form-input w-full"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark/80">
                Категория
              </label>
              <select
                value={filters.category || ''}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="form-input w-full"
              >
                <option value="">Все категории</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Date range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark/80">
                Период
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.dateRange?.[0] || ''}
                  onChange={(e) => updateFilter('dateRange', [e.target.value, filters.dateRange?.[1]])}
                  className="form-input"
                />
                <input
                  type="date"
                  value={filters.dateRange?.[1] || ''}
                  onChange={(e) => updateFilter('dateRange', [filters.dateRange?.[0], e.target.value])}
                  className="form-input"
                />
              </div>
            </div>

            {/* Price range */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-dark/80">
                Цена: {filters.priceRange?.[0]}₽ - {filters.priceRange?.[1]}₽
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.priceRange?.[0] || 0}
                  onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value), filters.priceRange?.[1] || 10000])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={filters.priceRange?.[1] || 10000}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange?.[0] || 0, parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Reset button */}
            {hasActiveFilters && (
              <AnimatedButton
                onClick={resetFilters}
                variant="secondary"
                className="w-full"
              >
                Сбросить фильтры
              </AnimatedButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterPanel;