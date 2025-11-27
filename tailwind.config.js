/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // --- BỘ MÀU ---
      colors: {
        // 1. Màu cũ (Giữ nguyên để không lỗi code cũ)
        cinematic: {
          dark: '#0a0a0a',
          darker: '#050505',
          gray: '#1a1a1a',
          'gray-light': '#2a2a2a',
          accent: '#ff6b6b',
          'accent-light': '#ff8787',
          gold: '#ffd700',
          'gold-light': '#ffe44d',
        },
        // 2. Màu MỚI cho giao diện AI Studio (cine-*)
        cine: {
          bg: '#050505',       // Đen sâu
          card: '#1a1f2e',     // Đen xám thẻ (quan trọng cho CreativeChef)
          gold: '#E5C07B',     // Vàng kim loại sang trọng
          'gold-dim': '#BFA15F',
          burgundy: '#4A0404', // Đỏ rượu vang
          blue: '#1A237E',
          muted: '#525252',
        }
      },
      
      // --- FONT CHỮ ---
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], // Font tiêu đề điện ảnh
        display: ['Oswald', 'sans-serif'],    // Font cho nút bấm/nhãn to
        mono: ['Fira Code', 'monospace'],     // Font cho thông số kỹ thuật
        cinematic: ['Oswald', 'sans-serif'],  // Alias cho code tham khảo
      },

      // --- HÌNH NỀN & GRADIENT ĐẶC BIỆT ---
      backgroundImage: {
        'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'gradient-luxury': 'radial-gradient(circle at 50% 0%, #1a1a1a 0%, #050505 100%)',
        'aurora': 'linear-gradient(45deg, #000000, #1a0b00, #001a14, #000000)',
        'btn-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
      },

      // --- CẤU HÌNH ANIMATION ---
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite',
        
        // Animation mới cho AI Lens & Creative Chef
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse-slow': 'spin-reverse 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 10s ease infinite',
        'shimmer': 'shimmer 2s infinite',
        'blob': 'blob 7s infinite', // <--- QUAN TRỌNG: Hiệu ứng nền trôi
      },

      // --- KEYFRAMES CHI TIẾT ---
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 107, 107, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 107, 107, 0.6)' },
        },
        // Keyframes mới
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        // Keyframe blob cho Creative Chef
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
      },

      // --- SHADOW ---
      boxShadow: {
        'glow-red': '0 0 20px rgba(255, 107, 107, 0.3)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
        'cinema': '0 20px 50px -12px rgba(0, 0, 0, 0.9)',
        'gold-glow': '0 0 20px rgba(229, 192, 123, 0.15)',
        'red-glow': '0 0 20px rgba(128, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};