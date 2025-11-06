// src/contexts/ThemeContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'cinema' | 'kitchen';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Lấy theme từ localStorage hoặc mặc định là 'cinema'
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('cinetaste-theme');
    return (saved === 'kitchen' ? 'kitchen' : 'cinema') as ThemeMode;
  });

  // Cập nhật class trên <html> để áp dụng theme
  useEffect(() => {
    const root = document.documentElement;
    
    // Xóa class cũ
    root.classList.remove('theme-cinema', 'theme-kitchen');
    
    // Thêm class mới
    root.classList.add(`theme-${theme}`);
    
    // Lưu vào localStorage
    localStorage.setItem('cinetaste-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'cinema' ? 'kitchen' : 'cinema');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}