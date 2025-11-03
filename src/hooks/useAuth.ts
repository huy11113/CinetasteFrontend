// src/hooks/useAuth.ts
import { useContext } from 'react';
// ✅ Import này sẽ hoạt động sau khi bạn sửa file trên
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext<AuthContextType | undefined>(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}