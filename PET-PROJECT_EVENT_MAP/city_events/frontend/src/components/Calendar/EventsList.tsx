import React from 'react';
import { Event } from '../../types/event';
import { formatDate } from '../../utils/dateUtils';
import { motion } from 'framer-motion';

interface Props {
  events: Event[];
  onSelect: (event: Event) => void;
}

const EventsList: React.FC<Props> = ({ events, onSelect }) => (
  <div className="glass p-4">
    <h3 className="font-bold mb-2">Список событий</h3>
    <div className="flex flex-col gap-2">
      {events.map(event => (
        <motion.div
          key={event.id}
          className="p-2 rounded-lg hover:bg-accent/20 transition cursor-pointer"
          onClick={() => onSelect(event)}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="font-semibold">{event.name}</div>
          <div className="text-sm">{formatDate(event.date)}</div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default EventsList;