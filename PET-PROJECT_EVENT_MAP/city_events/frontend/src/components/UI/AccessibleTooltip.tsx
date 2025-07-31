import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AccessibleTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const AccessibleTooltip: React.FC<AccessibleTooltipProps> = ({ 
  content, 
  children, 
  position = 'top',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-accent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-accent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-accent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-accent'
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={`absolute z-50 px-3 py-2 text-sm text-white bg-accent rounded-lg shadow-lg ${positionClasses[position]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            role="tooltip"
          >
            {content}
            <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibleTooltip;