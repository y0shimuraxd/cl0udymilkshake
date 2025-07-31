import React, { createContext, useState, useContext } from 'react';

type PopupType = 'event' | 'addEvent' | 'auth' | null;

interface UIContextType {
  // Sidebar
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Popup system
  popupType: PopupType;
  showPopup: (type: Exclude<PopupType, null>) => void;
  hidePopup: () => void;
  
  // Legacy modal states (можно удалить если не используются)
  isAddEventModalOpen: boolean;
  setAddEventModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  
  // Auth modal mode
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
  
  // View mode
  viewMode: 'map' | 'list' | 'calendar';
  setViewMode: (mode: 'map' | 'list' | 'calendar') => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [popupType, setPopupType] = useState<PopupType>(null);
  const [isAddEventModalOpen, setAddEventModalOpen] = useState(false);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'calendar'>('map');

  const showPopup = (type: Exclude<PopupType, null>) => {
    setPopupType(type);
    
    // Синхронизация с legacy состояниями (если нужно)
    if (type === 'addEvent') {
      setAddEventModalOpen(true);
    } else if (type === 'auth') {
      setAuthModalOpen(true);
    }
  };

  const hidePopup = () => {
    setPopupType(null);
    
    // Синхронизация с legacy состояниями
    setAddEventModalOpen(false);
    setAuthModalOpen(false);
  };

  const value: UIContextType = {
    isSidebarOpen,
    setSidebarOpen,
    
    popupType,
    showPopup,
    hidePopup,
    
    isAddEventModalOpen,
    setAddEventModalOpen,
    isAuthModalOpen,
    setAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    viewMode,
    setViewMode,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within UIProvider');
  }
  return context;
};