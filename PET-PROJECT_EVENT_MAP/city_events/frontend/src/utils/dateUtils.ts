export const formatDate = (dateString: string, locale: string = 'ru-RU'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatTime = (timeString: string): string => {
  return timeString.slice(0, 5);
};

export const formatDateTime = (dateString: string, timeString: string): string => {
  const date = formatDate(dateString);
  const time = formatTime(timeString);
  return `${date} в ${time}`;
};

export const isToday = (dateString: string): boolean => {
  const today = new Date();
  const eventDate = new Date(dateString);
  return (
    today.getDate() === eventDate.getDate() &&
    today.getMonth() === eventDate.getMonth() &&
    today.getFullYear() === eventDate.getFullYear()
  );
};

export const isTomorrow = (dateString: string): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const eventDate = new Date(dateString);
  return (
    tomorrow.getDate() === eventDate.getDate() &&
    tomorrow.getMonth() === eventDate.getMonth() &&
    tomorrow.getFullYear() === eventDate.getFullYear()
  );
};

export const getRelativeDate = (dateString: string): string => {
  if (isToday(dateString)) return 'Сегодня';
  if (isTomorrow(dateString)) return 'Завтра';
  return formatDate(dateString);
};

export const getDaysUntil = (dateString: string): number => {
  const today = new Date();
  const eventDate = new Date(dateString);
  const diffTime = eventDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};