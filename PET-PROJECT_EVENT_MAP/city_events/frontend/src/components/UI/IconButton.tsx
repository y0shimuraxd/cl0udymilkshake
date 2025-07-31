import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface IconButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'ghost' | 'glass' | 'primary';
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({ 
  children, 
  size = 'md',
  variant = 'default',
  className = '',
  ...props 
}) => {
  const baseClasses = "rounded-full transition-all duration-200 flex items-center justify-center";
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  
  const variantClasses = {
    default: "bg-accent text-dark hover:bg-accent/80",
    ghost: "hover:bg-white/20 text-dark",
    glass: "glass hover:bg-white/30 text-dark",
    primary: "bg-primary text-white hover:bg-primary/80"
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default IconButton;