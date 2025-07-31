import { useCallback } from 'react';

export const useAccessibility = () => {
  const handleKeyDown = useCallback((event: React.KeyboardEvent, onClose?: () => void) => {
    if (event.key === 'Escape' && onClose) {
      onClose();
    }
  }, []);

  const handleFocusTrap = useCallback((event: React.KeyboardEvent, firstElement: HTMLElement, lastElement: HTMLElement) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  }, []);

  return {
    handleKeyDown,
    handleFocusTrap,
  };
};