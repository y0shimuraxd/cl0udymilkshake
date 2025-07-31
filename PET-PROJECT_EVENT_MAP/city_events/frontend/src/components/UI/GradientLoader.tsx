import React from 'react';
import { motion } from 'framer-motion';

interface GradientLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GradientLoader: React.FC<GradientLoaderProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-accent via-primary to-accent ${className}`}
      animate={{ 
        rotate: 360,
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        rotate: { duration: 1, repeat: Infinity, ease: "linear" },
        scale: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
      }}
    />
  );
};

export default GradientLoader;