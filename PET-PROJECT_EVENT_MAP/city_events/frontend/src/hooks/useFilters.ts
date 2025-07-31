import { useState, useCallback } from 'react';
import { EventFilters } from '../types/event';

export const useFilters = () => {
  const [filters, setFilters] = useState<EventFilters>({
    category: '',
    dateRange: [null, null],
    priceRange: [0, 10000],
    searchQuery: '',
  });

  const updateFilter = useCallback((key: keyof EventFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      category: '',
      dateRange: [null, null],
      priceRange: [0, 10000],
      searchQuery: '',
    });
  }, []);

  // Исправленная логика для hasActiveFilters - возвращает boolean
  const hasActiveFilters = Boolean(
    filters.category || 
    filters.dateRange?.[0] || 
    filters.dateRange?.[1] || 
    (filters.priceRange && (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000)) || 
    filters.searchQuery
  );

  return { 
    filters, 
    updateFilter, 
    resetFilters, 
    hasActiveFilters 
  };
};