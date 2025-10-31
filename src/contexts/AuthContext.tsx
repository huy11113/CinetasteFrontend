// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../services/apiClient';
import { jwtDecode } from 'jwt-decode'; // Cài đặt: npm install jwt-decode

interface User {
  username: string;
  userId: string;
  // Thêm các trường khác nếu bạn lưu trong token, ví dụ: role
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (loginIdentifier: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra token khi tải ứng dụng
    setIsLoading(true);
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<{ sub: string; userId: string }>(storedToken);
        setUser({ username: decodedToken.sub, userId: decodedToken.userId });
        setToken(storedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('jwtToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (loginIdentifier: string, password: string) => {
    // Gọi API login từ user-service
    const response = await apiClient.post('/auth/login', {
      loginIdentifier,
      password,
    });
    
    const { token, username } = response.data;
    
    // Giải mã token để lấy thông tin
    const decodedToken = jwtDecode<{ sub: string; userId: string }>(token);
    
    localStorage.setItem('jwtToken', token);
    setUser({ username: decodedToken.sub, userId: decodedToken.userId });
    setToken(token);
  };

  const register = async (name: string, email: string, password: string) => {
    // API backend của bạn chỉ yêu cầu username, email, password
    await apiClient.post('/auth/register', {
      username: name, // Giả sử name là username
      email,
      password,
    });
    // Bạn có thể tự động đăng nhập họ sau khi đăng ký hoặc điều hướng đến trang login
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    setToken(null);
    // Điều hướng về trang chủ
    window.location.href = '/'; 
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}