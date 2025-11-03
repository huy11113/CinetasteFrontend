// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../services/apiClient';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast'; // <-- Dùng cho thông báo

// SỬA LỖI: Thêm "export"
export interface User {
  username: string;
  userId: string;
  displayName: string | null;
  profileImageUrl: string | null;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (loginIdentifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper: Lưu user vào localStorage
const storeUserInLocalStorage = (token: string, user: User) => {
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('cinetasteUser', JSON.stringify(user));
};

// Helper: Xóa user khỏi localStorage
const removeUserFromLocalStorage = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('cinetasteUser');
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hook này chạy 1 lần khi ứng dụng tải (F5)
  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('cinetasteUser'); // <-- Nâng cấp: Lấy user

    if (storedToken && storedUser) { // <-- Nâng cấp: Kiểm tra cả hai
      try {
        const decodedToken = jwtDecode<{ sub: string; userId: string; exp: number }>(storedToken);
        
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(JSON.parse(storedUser)); // <-- Dùng user từ storage
          setToken(storedToken);
          apiClient.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        } else {
          removeUserFromLocalStorage();
        }
      } catch (error) {
        console.error("Token không hợp lệ:", error);
        removeUserFromLocalStorage();
      }
    }
    setIsLoading(false);
  }, []);

  // Hàm Đăng nhập (Nâng cấp với Toast)
  const login = async (loginIdentifier: string, password: string) => {
    const loginPromise = apiClient.post('/auth/login', {
      loginIdentifier,
      password,
    });

    // Tích hợp Toast
    toast.promise(loginPromise, {
      loading: 'Đang đăng nhập...',
      success: (response) => {
        const { token, username, displayName, profileImageUrl } = response.data; 
        const decodedToken = jwtDecode<{ sub: string; userId: string }>(token);
        
        const userData: User = {
          username: username,
          userId: decodedToken.userId,
          displayName: displayName,
          profileImageUrl: profileImageUrl,
        };

        storeUserInLocalStorage(token, userData);
        setUser(userData);
        setToken(token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return `Chào mừng trở lại, ${displayName || username}!`;
      },
      error: (err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          return 'Sai tên đăng nhập hoặc mật khẩu.';
        }
        return 'Đã xảy ra lỗi. Vui lòng thử lại.';
      },
    });

    await loginPromise; 
  };

  // Hàm Đăng ký
  const register = async (username: string, email: string, password: string) => {
    await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
  };

  // Hàm Đăng xuất (Nâng cấp với Toast)
  const logout = () => {
    removeUserFromLocalStorage();
    setUser(null);
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization'];
    toast.success('Đã đăng xuất!'); // <-- Thông báo
    window.location.href = '/login'; 
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}