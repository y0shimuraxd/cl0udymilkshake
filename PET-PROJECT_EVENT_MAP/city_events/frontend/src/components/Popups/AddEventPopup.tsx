import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { popupVariants } from '../../utils/animations';
import { useFormValidation } from '../../hooks/useFormValidation';
import { useAccessibility } from '../../hooks/useAccessibility';
import { createEvent } from '../../utils/api';
import { EventFormData } from '../../types/event';
import { required, minLength, price, coordinates, futureDate } from '../../utils/validators';
import GlassCard from '../UI/GlassCard';
import AnimatedButton from '../UI/AnimatedButton';
import FormInput from '../UI/FormInput';
import IconButton from '../UI/IconButton';

interface AddEventPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const initialValues: EventFormData = {
  name: '',
  date: '',
  time: '',
  address: '',
  coordinates: [57.6261, 39.8845], // Ярославль
  price: undefined,
  category: '',
  socialLink: '',
  shortDescription: '',
  fullDescription: '',
  image: '',
};

const validationSchema = (values: EventFormData) => {
  const errors: Partial<Record<keyof EventFormData, string>> = {};

  errors.name = required(values.name) || minLength(3)(values.name);
  errors.date = required(values.date) || futureDate(values.date);
  errors.time = required(values.time);
  errors.address = required(values.address);

  if (values.price !== undefined && values.price !== null && values.price > 0) {
    errors.price = price(values.price.toString());
  }

  if (values.socialLink) {
    // Add URL validation if needed
  }

  return errors;
};

const AddEventPopup: React.FC<AddEventPopupProps> = ({ isOpen, onClose, onSuccess }) => {
  const { handleKeyDown } = useAccessibility();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    isValid,
  } = useFormValidation(initialValues, validationSchema);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await createEvent(values);
      reset();
      onClose();
      onSuccess?.();
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={popupVariants}
          onClick={handleClose}
          aria-modal="true"
          role="dialog"
        >
          <GlassCard
            className="max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">Добавить событие</h2>
              <IconButton
                onClick={handleClose}
                size="sm"
                variant="ghost"
                disabled={isSubmitting}
                aria-label="Закрыть"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </IconButton>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Название события *"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                error={touched.name ? errors.name : undefined}
                placeholder="Введите название события"
                disabled={isSubmitting}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormInput
                  label="Дата *"
                  name="date"
                  type="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={() => handleBlur('date')}
                  error={touched.date ? errors.date : undefined}
                  disabled={isSubmitting}
                />
                <FormInput
                  label="Время *"
                  name="time"
                  type="time"
                  value={values.time}
                  onChange={handleChange}
                  onBlur={() => handleBlur('time')}
                  error={touched.time ? errors.time : undefined}
                  disabled={isSubmitting}
                />
              </div>

              <FormInput
                label="Адрес *"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={() => handleBlur('address')}
                error={touched.address ? errors.address : undefined}
                placeholder="Введите адрес события"
                disabled={isSubmitting}
              />

              <FormInput
                label="Цена (₽)"
                name="price"
                type="number"
                value={values.price || ''}
                onChange={handleChange}
                onBlur={() => handleBlur('price')}
                error={touched.price ? errors.price : undefined}
                placeholder="0"
                min="0"
                disabled={isSubmitting}
              />

              <FormInput
                label="Категория"
                name="category"
                value={values.category}
                onChange={handleChange}
                placeholder="Концерт, выставка, мастер-класс..."
                disabled={isSubmitting}
              />

              <FormInput
                label="Ссылка на соц. сети"
                name="socialLink"
                value={values.socialLink}
                onChange={handleChange}
                placeholder="https://..."
                disabled={isSubmitting}
              />

              <FormInput
                label="Краткое описание"
                name="shortDescription"
                value={values.shortDescription}
                onChange={handleChange}
                placeholder="Краткое описание события"
                disabled={isSubmitting}
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-dark/80">
                  Полное описание
                </label>
                <textarea
                  name="fullDescription"
                  value={values.fullDescription}
                  onChange={handleChange}
                  placeholder="Подробное описание события..."
                  className="form-input w-full h-24 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <FormInput
                label="Ссылка на изображение"
                name="image"
                value={values.image}
                onChange={handleChange}
                placeholder="https://..."
                disabled={isSubmitting}
              />

              {/* Submit button */}
              <div className="flex gap-3 pt-4">
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={isSubmitting || !isValid}
                >
                  {isSubmitting ? 'Добавление...' : 'Добавить событие'}
                </AnimatedButton>
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Отмена
                </AnimatedButton>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddEventPopup;