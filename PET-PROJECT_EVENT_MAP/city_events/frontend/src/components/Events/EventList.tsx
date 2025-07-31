import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Event } from '../../types/event';
import { formatDateTime, getRelativeDate } from '../../utils/dateUtils';
import GlassCard from '../UI/GlassCard';
import AnimatedButton from '../UI/AnimatedButton';

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onAddEvent: () => void;
  isLoading?: boolean;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  onEventClick, 
  onAddEvent,
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="p-4 animate-pulse">
              <div className="h-4 bg-accent/20 rounded mb-2"></div>
              <div className="h-3 bg-accent/20 rounded w-2/3"></div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary">
          События ({events.length})
        </h2>
        <AnimatedButton onClick={onAddEvent} variant="primary">
          Добавить событие
        </AnimatedButton>
      </div>

      <AnimatePresence>
        {events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-dark/50 text-lg mb-4">
              Событий не найдено
            </div>
            <AnimatedButton onClick={onAddEvent} variant="secondary">
              Добавить первое событие
            </AnimatedButton>
          </motion.div>
        ) : (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard 
                className="p-6 cursor-pointer hover:shadow-glass-lg transition-all duration-300"
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-primary mb-2">
                      {event.name}
                    </h3>
                    <p className="text-dark/80 mb-3 line-clamp-2">
                      {event.shortDescription}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-dark/60">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDateTime(event.date, event.time)}
                      </span>
                      {event.category && (
                        <span className="px-2 py-1 bg-accent/20 rounded-full text-xs">
                          {event.category}
                        </span>
                      )}
                      {event.price && (
                        <span className="font-medium text-primary">
                          {event.price}₽
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-right text-sm text-dark/50">
                      {getRelativeDate(event.date)}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventList;
