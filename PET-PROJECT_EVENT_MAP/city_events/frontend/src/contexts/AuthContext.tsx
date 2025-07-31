import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContextType, User } from '../types/auth';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../utils/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Начинаем с true для проверки токена
  const [error, setError] = useState<string | null>(null);

  // Проверяем токен при загрузке приложения
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (token) {
        try {
          // Получаем данные пользователя с сервера
          const userData = await getCurrentUser();
          setUser({
            ...userData,
            token, // Добавляем токен к данным пользователя
          });
        } catch (error) {
          // Токен недействителен
          console.error('Invalid token:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiLogin({ username, password });
      
      // Получаем полные данные пользователя
      const userData = await getCurrentUser();
      
      const user: User = {
        ...userData,
        token: response.token,
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    // Можно также вызвать API logout
    // apiLogout().catch(console.error);
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiRegister({ username, email, password });
      
      // При регистрации ваш сериализатор сразу возвращает пользователя с токеном
      const user: User = {
        id: response.id,
        username: response.username,
        email: response.email,
        token: response.token,
      };
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const useAuthContext = useAuth;