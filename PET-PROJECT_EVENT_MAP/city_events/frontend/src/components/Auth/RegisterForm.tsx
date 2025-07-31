import React from 'react';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import AnimatedButton from '../UI/AnimatedButton';
import FormInput from '../UI/FormInput';

const RegisterForm: React.FC = () => {
  const { register, loading, error } = useAuthContext();
  
  const { values, errors, handleChange, isValid } = useFormValidation({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }, (values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};
    
    if (!values.username) {
      errors.username = 'Имя пользователя обязательно';
    } else if (values.username.length < 3) {
      errors.username = 'Имя пользователя должно содержать минимум 3 символа';
    }
    
    if (!values.email) {
      errors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Введите корректный email';
    }
    
    if (!values.password) {
      errors.password = 'Пароль обязателен';
    } else if (values.password.length < 6) {
      errors.password = 'Пароль должен содержать минимум 6 символов';
    }
    
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Подтвердите пароль';
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    
    return errors;
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      await register(values.username, values.email, values.password);
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
          Создать аккаунт
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
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Введите email"
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

      <FormInput
        label="Подтвердите пароль"
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Повторите пароль"
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
        {loading ? 'Регистрация...' : 'Зарегистрироваться'}
      </AnimatedButton>
    </motion.form>
  );
};

export default RegisterForm;
