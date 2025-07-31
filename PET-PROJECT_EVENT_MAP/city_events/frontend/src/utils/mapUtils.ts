import { Event, Category } from '../types/event';

// Обновляем функции для работы с объектом категории
export const getEventIcon = (category?: Category | string): string => {
  // Обрабатываем как объект, так и строку для совместимости
  let categoryName: string;
  
  if (!category) {
    return '/icons/event.svg';
  }
  
  if (typeof category === 'string') {
    categoryName = category;
  } else if (typeof category === 'object' && category.name) {
    categoryName = category.name;
  } else {
    return '/icons/event.svg';
  }
  
  switch (categoryName.toLowerCase()) {
    case 'concert':
    case 'концерт':
      return '/icons/concert.svg';
    case 'exhibition':
    case 'выставка':
      return '/icons/exhibition.svg';
    case 'masterclass':
    case 'мастер-класс':
      return '/icons/masterclass.svg';
    case 'theater':
    case 'театр':
      return '/icons/theater.svg';
    case 'sport':
    case 'спорт':
      return '/icons/sport.svg';
    case 'festival':
    case 'фестиваль':
      return '/icons/festival.svg';
    default:
      return '/icons/event.svg';
  }
};

export const getEventColor = (category?: Category | string): string => {
  // Обрабатываем как объект, так и строку для совместимости
  let categoryName: string;
  
  if (!category) {
    return '#C5B0CD';
  }
  
  if (typeof category === 'string') {
    categoryName = category;
  } else if (typeof category === 'object' && category.name) {
    categoryName = category.name;
  } else {
    return '#C5B0CD';
  }
  
  switch (categoryName.toLowerCase()) {
    case 'concert':
    case 'концерт':
      return '#FF6B6B';
    case 'exhibition':
    case 'выставка':
      return '#4ECDC4';
    case 'masterclass':
    case 'мастер-класс':
      return '#45B7D1';
    case 'theater':
    case 'театр':
      return '#96CEB4';
    case 'sport':
    case 'спорт':
      return '#FFEAA7';
    case 'festival':
    case 'фестиваль':
      return '#DDA0DD';
    default:
      return '#C5B0CD';
  }
};

export const clusterEvents = (events: Event[], maxDistance: number = 50) => {
  const clusters: Event[][] = [];
  const used: boolean[] = new Array(events.length).fill(false);

  for (let i = 0; i < events.length; i++) {
    if (used[i]) continue;

    const cluster = [events[i]];
    used[i] = true;

    for (let j = i + 1; j < events.length; j++) {
      if (used[j]) continue;

      const distance = calculateDistance(
        events[i].coordinates,
        events[j].coordinates
      );

      if (distance <= maxDistance) {
        cluster.push(events[j]);
        used[j] = true;
      }
    }

    clusters.push(cluster);
  }

  return clusters;
};

export const calculateDistance = (
  coord1: [number, number],
  coord2: [number, number]
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
  const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
  try {
    // This would use a geocoding service like Yandex Geocoder
    // For now, return null to indicate manual coordinate input is needed
    return null;
  } catch (error) {
    console.error('Error geocoding address:', error);
    return null;
  }
};