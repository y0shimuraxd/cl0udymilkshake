import { Variants } from 'framer-motion';

export const popupVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95, 
    y: 40,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 40,
    transition: { duration: 0.2 }
  },
};

export const slideInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0, 
    y: 60,
    transition: { duration: 0.2 }
  },
};

export const slideInDown: Variants = {
  hidden: { 
    opacity: 0, 
    y: -60,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      duration: 0.4
    }
  },
  exit: { 
    opacity: 0, 
    y: -60,
    transition: { duration: 0.2 }
  },
};

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  },
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 24,
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  },
};

export const markerPulse = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [1, 0.7, 1],
    transition: { 
      repeat: Infinity, 
      duration: 1.5, 
      ease: 'easeInOut' 
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};