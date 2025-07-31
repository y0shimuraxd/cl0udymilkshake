import React from 'react';
import { Placemark } from '@pbe/react-yandex-maps';
import { motion } from 'framer-motion';
import { getEventIcon, getEventColor } from '../../utils/mapUtils';
import { Event } from '../../types/event';

interface CustomMarkerProps {
  event: Event;
  onClick: () => void;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ event, onClick }) => {
  // Теперь функции сами обработают объект категории
  const iconUrl = getEventIcon(event.category);
  const color = getEventColor(event.category);

  return (
    <Placemark
      geometry={event.location.coordinates} // используем location.coordinates вместо coordinates
      onClick={onClick}
      options={{
        iconLayout: 'default#image',
        iconImageHref: iconUrl,
        iconImageSize: [40, 40],
        iconImageOffset: [-20, -20],
        iconColor: color,
        iconContentOffset: [0, 0],
        iconContentLayout: 'default#imageWithContent',
      }}
      properties={{
        hintContent: event.title, // используем title вместо name
        balloonContentHeader: event.title,
        balloonContentBody: `
          <div style="padding: 10px;">
            <p><strong>Дата:</strong> ${event.date}</p>
            <p><strong>Время:</strong> ${event.time}</p>
            <p><strong>Адрес:</strong> ${event.address}</p>
            ${!event.is_free && event.price ? `<p><strong>Цена:</strong> ${event.price} ₽</p>` : ''}
            ${event.is_free ? `<p><strong>Вход:</strong> Бесплатно</p>` : ''}
            ${event.description ? `<p><strong>Описание:</strong> ${event.description}</p>` : ''}
            ${event.url ? `<p><strong>Ссылка:</strong> <a href="${event.url}" target="_blank">Подробнее</a></p>` : ''}
          </div>
        `,
      }}
    />
  );
};

export default CustomMarker;