// src/contexts/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import apiClient from '../services/apiClient';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

export interface User {
  username: string;
  userId: string;
  displayName: string | null;
  profileImageUrl: string | null;
}

export interface LoginResponse {
  token: string;
  username: string;
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
  handleSocialLogin: (loginResponse: LoginResponse) => void;
  refreshUserProfile: () => Promise<void>; // ✅ HÀM MỚI
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const storeUserInLocalStorage = (token: string, user: User) => {
  localStorage.setItem('jwtToken', token);
  localStorage.setItem('cinetasteUser', JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('cinetasteUser');
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    const storedUser = localStorage.getItem('cinetasteUser'); 

    if (storedToken && storedUser) { 
      try {
        const decodedToken = jwtDecode<{ sub: string; userId: string; exp: number }>(storedToken);
        
        if (decodedToken.exp * 1000 > Date.now()) {
          setUser(JSON.parse(storedUser)); 
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

  const login = async (loginIdentifier: string, password: string) => {
    const loginPromise = apiClient.post('/auth/login', {
      loginIdentifier,
      password,
    });

    toast.promise(loginPromise, {
      loading: 'Đang đăng nhập...',
      success: (response) => {
        handleSocialLogin(response.data); 
        const { username, displayName } = response.data; 
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

  const register = async (username: string, email: string, password: string) => {
    await apiClient.post('/auth/register', {
      username,
      email,
      password,
    });
  };

  const logout = () => {
    removeUserFromLocalStorage();
    setUser(null);
    setToken(null);
    delete apiClient.defaults.headers.common['Authorization'];
    toast.success('Đã đăng xuất!');
    window.location.href = '/login'; 
  };

  const handleSocialLogin = (loginResponse: LoginResponse) => {
    const { token, username, displayName, profileImageUrl } = loginResponse;
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
  };

  // ✅ HÀM MỚI: Refresh thông tin user từ server
  const refreshUserProfile = async () => {
    try {
      // Gọi API lấy thông tin user hiện tại
      const response = await apiClient.get('/users/me/profile');
      const { username, displayName, profileImageUrl, id } = response.data;
      
      // Cập nhật state và localStorage
      const updatedUser: User = {
        username,
        userId: id,
        displayName,
        profileImageUrl,
      };
      
      setUser(updatedUser);
      
      // Cập nhật localStorage (giữ nguyên token)
      if (token) {
        storeUserInLocalStorage(token, updatedUser);
      }
      
      console.log('✅ User profile refreshed:', updatedUser);
    } catch (error) {
      console.error('❌ Failed to refresh user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      isLoading, 
      login, 
      register, 
      logout, 
      handleSocialLogin,
      refreshUserProfile // ✅ Export hàm mới
    }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}