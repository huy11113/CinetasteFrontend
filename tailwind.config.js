/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-cinematic': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      },
      boxShadow: {
        'glow-red': '0 0 20px rgba(255, 107, 107, 0.3)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
      },
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
      },
    },
  },
  plugins: [],
};
