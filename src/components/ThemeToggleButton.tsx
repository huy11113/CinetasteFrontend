// src/components/ThemeToggleButton.tsx
import { Film, ChefHat } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-cinematic-gray-light hover:text-white w-full text-left rounded-md transition-colors"
    >
      {theme === 'cinema' ? (
        <>
          <ChefHat className="w-4 h-4 mr-3 text-gray-400" />
          <div className="flex-1">
            <span className="block">Chuyển sang Warm Kitchen</span>
            <span className="block text-xs text-gray-500 mt-0.5">Giao diện ấm áp</span>
          </div>
        </>
      ) : (
        <>
          <Film className="w-4 h-4 mr-3 text-gray-400" />
          <div className="flex-1">
            <span className="block">Chuyển sang Cinema Dark</span>
            <span className="block text-xs text-gray-500 mt-0.5">Giao diện tối màu</span>
          </div>
        </>
      )}
    </button>
  );
}