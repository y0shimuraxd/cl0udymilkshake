import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popupVariants } from '../../utils/animations';
import { useAccessibility } from '../../hooks/useAccessibility';
import GlassCard from '../UI/GlassCard';
import IconButton from '../UI/IconButton';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';

interface AuthPopupProps {
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

const AuthPopup: React.FC<AuthPopupProps> = ({ onClose }) => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { handleKeyDown } = useAccessibility();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md"
        variants={popupVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => handleKeyDown(e, onClose)}
      >
        <GlassCard className="p-6 relative">
          {/* Close button */}
          <IconButton
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4"
            aria-label="Закрыть"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </IconButton>

          {/* Tab switcher */}
          <div className="flex mb-6 bg-accent/10 rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'login'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-dark/60 hover:text-dark/80'
              }`}
            >
              Войти
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                mode === 'register'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-dark/60 hover:text-dark/80'
              }`}
            >
              Регистрация
            </button>
          </div>

          {/* Form content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: mode === 'register' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: mode === 'register' ? -20 : 20 }}
              transition={{ duration: 0.2 }}
            >
              {mode === 'login' ? <LoginForm /> : <RegisterForm />}
            </motion.div>
          </AnimatePresence>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
};

export default AuthPopup;