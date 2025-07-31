import React from 'react';
import { motion } from 'framer-motion';
import IconButton from './IconButton';

type ViewMode = 'map' | 'list';

interface ViewToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
  className?: string;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ 
  mode, 
  onModeChange, 
  className = "" 
}) => {
  return (
    <motion.div 
      className={`glass p-1 rounded-xl flex ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <IconButton
        onClick={() => onModeChange('map')}
        variant={mode === 'map' ? 'primary' : 'ghost'}
        size="sm"
        className="rounded-lg"
        aria-label="Показать карту"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
        </svg>
      </IconButton>
      
      <IconButton
        onClick={() => onModeChange('list')}
        variant={mode === 'list' ? 'primary' : 'ghost'}
        size="sm"
        className="rounded-lg"
        aria-label="Показать список"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      </IconButton>
    </motion.div>
  );
};

export default ViewToggle;
