// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../services/apiClient';
import { jwtDecode } from 'jwt-decode';

// Định nghĩa thông tin User ta lấy từ token
interface User {
  username: string; // Lấy từ 'sub'
  userId: string; // Lấy từ 'userId'
}

// ✅ THÊM "export" Ở ĐÂY
export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (loginIdentifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ✅ THÊM "export" Ở ĐÂY
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Tạo Provider (component logic)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hook này chạy 1 lần khi ứng dụng tải (F5)
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<{ sub: string; userId: string; exp: number }>(storedToken);
        
        // Kiểm tra token hết hạn
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser({ username: decodedToken.sub, userId: decodedToken.userId });
          setToken(storedToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } else {
          localStorage.removeItem('jwtToken');
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        localStorage.removeItem('jwtToken');
      }
    }
    setIsLoading(false);
  }, []);

  // Hàm Đăng nhập
  const login = async (loginIdentifier: string, password: string) => {
    const response = await apiClient.post('/auth/login', {
      loginIdentifier,
      password,
    });
    
    const { token } = response.data; 
    const decodedToken = jwtDecode<{ sub: string; userId: string }>(token);
    
    localStorage.setItem('jwtToken', token);
    setUser({ username: decodedToken.sub, userId: decodedToken.userId });
    setToken(token);
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Hàm Đăng ký
  const register = async (username: string, email: string, password: string) => {
    await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
  };

  // Hàm Đăng xuất
  const logout = () => {
    localStorage.removeItem('jwtToken');
    setUser(null);
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization'];
    window.location.href = '/login'; 
  };

  // Cung cấp các giá trị này cho toàn bộ ứng dụng
  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
} // <-- Đảm bảo không có dấu ngoặc thừa ở dây