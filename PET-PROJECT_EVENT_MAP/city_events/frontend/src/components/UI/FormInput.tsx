import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface FormInputProps extends Omit<HTMLMotionProps<"input">, "ref"> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

const FormInput: React.FC<FormInputProps> = ({ 
  label, 
  error, 
  helperText, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-dark/80">
          {label}
        </label>
      )}
      <motion.input
        className={`form-input w-full ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
        whileFocus={{ scale: 1.02 }}
        {...props}
      />
      {error && (
        <motion.p 
          className="text-sm text-red-500"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
      {helperText && !error && (
        <p className="text-sm text-dark/60">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormInput;