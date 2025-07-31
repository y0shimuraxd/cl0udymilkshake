export interface User {
  id: number;
  username: string;
  email: string;
  token?: string; // Опциональный, так как может добавляться на фронте
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Ответы от API
export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  token: string;
}