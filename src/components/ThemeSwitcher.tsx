// src/components/ThemeSwitcher.tsx
import { Film, ChefHat } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Giao diện trang web
      </h3>
      <p className="text-gray-400 text-sm mb-6">
        Chọn phong cách hiển thị phù hợp với bạn
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cinema Theme */}
        <button
          onClick={() => theme === 'kitchen' && toggleTheme()}
          className={`relative p-4 rounded-lg border-2 transition-all ${
            theme === 'cinema'
              ? 'border-cinematic-accent bg-cinematic-accent/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <Film className="w-6 h-6 text-cinematic-accent" />
            {theme === 'cinema' && (
              <span className="px-2 py-1 bg-cinematic-accent text-white text-xs rounded-full font-semibold">
                Đang dùng
              </span>
            )}
          </div>
          
          <h4 className="text-white font-semibold mb-1">Cinema Dark</h4>
          <p className="text-gray-400 text-sm">
            Phong cách rạp chiếu phim - tối màu, hiện đại
          </p>

          {/* Preview */}
          <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
            <div className="h-16 bg-black"></div>
            <div className="bg-zinc-900 p-2 space-y-1">
              <div className="h-2 bg-red-500 rounded w-3/4"></div>
              <div className="h-2 bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </button>

        {/* Kitchen Theme */}
        <button
          onClick={() => theme === 'cinema' && toggleTheme()}
          className={`relative p-4 rounded-lg border-2 transition-all ${
            theme === 'kitchen'
              ? 'border-cinematic-accent bg-cinematic-accent/10'
              : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <ChefHat className="w-6 h-6 text-orange-400" />
            {theme === 'kitchen' && (
              <span className="px-2 py-1 bg-cinematic-accent text-white text-xs rounded-full font-semibold">
                Đang dùng
              </span>
            )}
          </div>
          
          <h4 className="text-white font-semibold mb-1">Warm Kitchen</h4>
          <p className="text-gray-400 text-sm">
            Gam màu kem & terracotta - ấm cúng như nhà bếp
          </p>

          {/* Preview */}
          <div className="mt-4 rounded-lg overflow-hidden border border-gray-700">
            <div className="h-16 bg-gradient-to-br from-amber-900 to-stone-800"></div>
            <div className="bg-stone-900 p-2 space-y-1">
              <div className="h-2 bg-orange-500 rounded w-3/4"></div>
              <div className="h-2 bg-amber-600 rounded w-1/2"></div>
            </div>
          </div>
        </button>
      </div>

      <div className="mt-4 p-4 bg-cinematic-gray-light rounded-lg">
        <p className="text-gray-400 text-sm">
          💡 <strong>Mẹo:</strong> Cài đặt sẽ được lưu tự động và áp dụng mỗi khi bạn truy cập lại trang web.
        </p>
      </div>
    </div>
  );
}