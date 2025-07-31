// Обновленные типы для соответствия бэкэнду
export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Location {
  type: 'Point';
  coordinates: [number, number];
}

export interface Event {
  id: number;
  title: string; // бэкэнд использует title, а не name
  date: string;
  time: string;
  location: Location; // бэкэнд использует location, а не coordinates
  address: string;
  description?: string; // бэкэнд использует description, а не shortDescription
  image?: string | null;
  price?: string; // бэкэнд возвращает строку, а не число
  category?: Category; // бэкэнд возвращает объект, а не строку
  url?: string; // socialLink/ticketUrl объединены в url
  is_free: boolean;
  status: string;
  creator: number;
  created_at: string;
  updated_at?: string;
}

// Для совместимости со старым кодом, добавим геттеры
export interface EventWithGetters extends Event {
  // Геттеры для совместимости
  get name(): string;
  get coordinates(): [number, number];
  get shortDescription(): string | undefined;
  get socialLink(): string | undefined;
  get ticketUrl(): string | undefined;
}

export interface EventFormData {
  title: string;
  date: string;
  time: string;
  address: string;
  coordinates: [number, number];
  price?: string;
  category?: string;
  url?: string;
  description?: string;
  image?: string;
}

export interface EventFilters {
  category?: string;
  dateRange?: [string | null, string | null];
  priceRange?: [number, number];
  searchQuery?: string;
}