export const required = (value: string): string | undefined => {
  return value.trim() ? undefined : 'Это поле обязательно';
};

export const minLength = (min: number) => (value: string): string | undefined => {
  return value.length >= min ? undefined : `Минимум ${min} символов`;
};

export const maxLength = (max: number) => (value: string): string | undefined => {
  return value.length <= max ? undefined : `Максимум ${max} символов`;
};

export const email = (value: string): string | undefined => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? undefined : 'Неверный формат email';
};

export const phone = (value: string): string | undefined => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(value.replace(/\s/g, '')) ? undefined : 'Неверный формат телефона';
};

export const url = (value: string): string | undefined => {
  if (!value) return undefined;
  try {
    new URL(value);
    return undefined;
  } catch {
    return 'Неверный формат URL';
  }
};

export const price = (value: string): string | undefined => {
  if (!value) return undefined;
  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 ? undefined : 'Цена должна быть положительным числом';
};

export const coordinates = (value: string): string | undefined => {
  if (!value) return undefined;
  const coords = value.split(',').map(c => c.trim());
  if (coords.length !== 2) return 'Формат: широта, долгота';
  
  const lat = parseFloat(coords[0]);
  const lng = parseFloat(coords[1]);
  
  if (isNaN(lat) || isNaN(lng)) return 'Неверные координаты';
  if (lat < -90 || lat > 90) return 'Широта должна быть от -90 до 90';
  if (lng < -180 || lng > 180) return 'Долгота должна быть от -180 до 180';
  
  return undefined;
};

export const futureDate = (value: string): string | undefined => {
  if (!value) return undefined;
  const date = new Date(value);
  const now = new Date();
  return date > now ? undefined : 'Дата должна быть в будущем';
};