import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = "rounded-lg font-semibold shadow-glass transition-all duration-300";
  
  const variantClasses = {
    default: "bg-accent text-dark hover:bg-accent/80",
    primary: "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90",
    secondary: "bg-white/20 text-dark border border-accent/30 hover:bg-white/30"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: '0 8px 32px rgba(197, 176, 205, 0.4)' 
      }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;