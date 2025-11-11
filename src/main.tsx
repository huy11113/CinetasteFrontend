// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { GoogleOAuthProvider } from '@react-oauth/google'; // <-- THÊM IMPORT

// Thay YOUR_GOOGLE_CLIENT_ID bằng Client ID bạn lấy ở Bước 2
const GOOGLE_CLIENT_ID = "1080321137443-un7be17uehr6gi5bshilu3vu5k94m50g.apps.googleusercontent.com";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> {/* <-- BỌC NGOÀI CÙNG */}
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);