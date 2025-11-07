// src/components/ThemeToggleButton.tsx
import { Film, ChefHat } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggleButton() {
  // Lấy theme hiện tại và hàm toggle
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center px-4 py-2 text-sm hover:bg-cinematic-gray-light w-full text-left rounded-md transition-colors group"
    >
      {/* Hiển thị theo theme hiện tại */}
      {theme === 'cinema' ? (
        // Đang ở Cinema Dark → Hiển thị nút chuyển sang Kitchen
        <>
          {/* Icon với background */}
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 
                          flex items-center justify-center mr-3 flex-shrink-0
                          group-hover:bg-amber-500/20 transition-colors">
            <ChefHat className="w-4 h-4 text-amber-500" />
          </div>
          
          {/* Text */}
          <div className="flex-1 text-gray-300 group-hover:text-white transition-colors">
            <span className="block font-medium">Chuyển sang Warm Kitchen</span>
            <span className="block text-xs text-gray-500 mt-0.5">
              Giao diện ấm áp, sáng màu
            </span>
          </div>
        </>
      ) : (
        // Đang ở Kitchen Warm → Hiển thị nút chuyển sang Cinema
        <>
          {/* Icon với background */}
          <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/30 
                          flex items-center justify-center mr-3 flex-shrink-0
                          group-hover:bg-red-500/20 transition-colors">
            <Film className="w-4 h-4 text-red-500" />
          </div>
          
          {/* Text - Màu khác vì đang ở theme sáng */}
          <div className="flex-1 text-gray-700 group-hover:text-gray-900 transition-colors">
            <span className="block font-medium">Chuyển sang Cinema Dark</span>
            <span className="block text-xs text-gray-500 mt-0.5">
              Giao diện tối màu, hiện đại
            </span>
          </div>
        </>
      )}
    </button>
  );
}