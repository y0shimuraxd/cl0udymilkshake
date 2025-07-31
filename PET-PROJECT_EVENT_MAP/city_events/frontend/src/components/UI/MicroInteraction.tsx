import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MicroInteractionProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  type?: 'hover' | 'tap' | 'float' | 'pulse';
  className?: string;
}

const MicroInteraction: React.FC<MicroInteractionProps> = ({ 
  children, 
  type = 'hover',
  className = '',
  ...props 
}) => {
  const animations = {
    hover: {
      whileHover: { scale: 1.05, y: -2 },
      whileTap: { scale: 0.95 }
    },
    tap: {
      whileTap: { scale: 0.9 }
    },
    float: {
      animate: { 
        y: [0, -10, 0],
        transition: { 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut" as const
        }
      }
    },
    pulse: {
      animate: { 
        scale: [1, 1.05, 1],
        transition: { 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "easeInOut" as const
        }
      }
    }
  };

  return (
    <motion.div
      className={className}
      {...animations[type]}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default MicroInteraction;