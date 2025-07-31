import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import AnimatedButton from '../UI/AnimatedButton';
import FormInput from '../UI/FormInput';

const LoginForm: React.FC = () => {
  const { login, loading, error } = useAuthContext();
  
  const { values, errors, handleChange, isValid } = useFormValidation({
    username: '',
    password: ''
  }, (values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};
    
    if (!values.username) {
      errors.username = 'Имя пользователя обязательно';
    } else if (values.username.length < 3) {
      errors.username = 'Имя пользователя должно содержать минимум 3 символа';
    }
    
    if (!values.password) {
      errors.password = 'Пароль обязателен';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    return errors;
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      await login(values.username, values.password);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">
          Войти в аккаунт
        </h2>
      </div>

      <FormInput
        label="Имя пользователя"
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        error={errors.username}
        placeholder="Введите имя пользователя"
        required
      />

      <FormInput
        label="Пароль"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Введите пароль"
        required
      />

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm"
        >
          {error}
        </motion.div>
      )}

      <AnimatedButton
        type="submit"
        variant="primary"
        className="w-full"
        disabled={loading || !isValid}
      >
        {loading ? 'Вход...' : 'Войти'}
      </AnimatedButton>
    </motion.form>
  );
};

export default LoginForm;
