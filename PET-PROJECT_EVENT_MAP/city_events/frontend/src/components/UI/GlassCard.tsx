import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: 'default' | 'strong';
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  const glassClass = variant === 'strong' ? 'glass-strong' : 'glass';
  
  return (
    <motion.div
      className={`${glassClass} shadow-glass ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;