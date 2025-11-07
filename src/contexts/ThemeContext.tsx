// src/contexts/ThemeContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

// Định nghĩa kiểu theme (chỉ có 2 giá trị hợp lệ)
export type ThemeMode = 'cinema' | 'kitchen';

// Interface cho Context
interface ThemeContextType {
  theme: ThemeMode;      // Theme hiện tại
  toggleTheme: () => void; // Hàm chuyển đổi theme
}

// Tạo Context
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider Component
export function ThemeProvider({ children }: { children: ReactNode }) {
  // State lưu theme hiện tại
  // Đọc từ localStorage lúc khởi tạo, mặc định là 'cinema'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cinetaste-theme');
    return (saved === 'kitchen' ? 'kitchen' : 'cinema') as ThemeMode;
  });

  // Effect này chạy mỗi khi theme thay đổi
  useEffect(() => {
    const root = document.documentElement; // <html> element
    
    // Bước 1: Xóa class cũ
    root.classList.remove('theme-cinema', 'theme-kitchen');
    
    // Bước 2: Thêm class mới
    root.classList.add(`theme-${theme}`);
    
    // Bước 3: Lưu vào localStorage
    localStorage.setItem('cinetaste-theme', theme);
  }, [theme]); // Chỉ chạy khi theme thay đổi

  // Hàm toggle (đảo ngược theme)
  const toggleTheme = () => {
    setTheme(prev => prev === 'cinema' ? 'kitchen' : 'cinema');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}