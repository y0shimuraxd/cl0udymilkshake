import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popupVariants } from '../../utils/animations';
import { useAccessibility } from '../../hooks/useAccessibility';
import { formatDateTime, getRelativeDate, getDaysUntil } from '../../utils/dateUtils';
import { Event } from '../../types/event';
import GlassCard from '../UI/GlassCard';
import AnimatedButton from '../UI/AnimatedButton';
import IconButton from '../UI/IconButton';

interface EventPopupProps {
  event: Event | null;
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  const { handleKeyDown } = useAccessibility();

  if (!event) return null;

  const daysUntil = getDaysUntil(event.date);
  const isUpcoming = daysUntil > 0;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={popupVariants}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <GlassCard
          className="max-w-md w-full mx-4 relative"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => handleKeyDown(e, onClose)}
        >
          {/* Close button */}
          <IconButton
            onClick={onClose}
            className="absolute top-4 right-4 z-10"
            size="sm"
            variant="ghost"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>

          {/* Event image */}
          {event.image && (
            <div className="relative mb-4">
              <img 
                src={event.image} 
                alt={event.name} 
                className="w-full h-48 object-cover rounded-lg"
              />
              {isUpcoming && (
                <div className="absolute top-2 left-2 bg-accent/90 text-white px-2 py-1 rounded text-sm">
                  Через {daysUntil} {daysUntil === 1 ? 'день' : 'дней'}
                </div>
              )}
            </div>
          )}

          {/* Event content */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">{event.name}</h2>
              <div className="flex items-center gap-2 text-accent mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDateTime(event.date, event.time)}</span>
              </div>
              <div className="flex items-center gap-2 text-dark/70 mb-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{event.address}</span>
              </div>
              {event.price && (
                <div className="flex items-center gap-2 text-dark/70">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-semibold">{event.price} ₽</span>
                </div>
              )}
            </div>

            {/* Description */}
            {event.fullDescription && (
              <div>
                <h3 className="font-semibold text-primary mb-2">Описание</h3>
                <p className="text-dark/80 leading-relaxed">{event.fullDescription}</p>
              </div>
            )}

            {/* Category */}
            {event.category && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark/60">Категория:</span>
                <span className="px-2 py-1 bg-accent/20 text-accent rounded text-sm">
                  {event.category}
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              {event.ticketUrl && (
                <AnimatedButton 
                  variant="primary" 
                  className="flex-1"
                  onClick={() => window.open(event.ticketUrl, '_blank')}
                >
                  Купить билет
                </AnimatedButton>
              )}
              {event.socialLink && (
                <AnimatedButton 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => window.open(event.socialLink, '_blank')}
                >
                  Соц. сети
                </AnimatedButton>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </AnimatePresence>
  );
};

export default EventPopup;