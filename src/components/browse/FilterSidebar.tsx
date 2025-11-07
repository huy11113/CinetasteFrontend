// src/components/browse/FilterSidebar.tsx
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';

// Định nghĩa kiểu cho props
interface FilterSidebarProps {
  showFilters: boolean;
  filters: {
    difficulty: string[];
    cookingTime: string;
    cuisine: string[];
    dietary: string[];
  };
  onToggleFilter: (category: keyof FilterSidebarProps['filters'], value: string) => void;
  onClearFilters: () => void;
  onClose: () => void; // Hàm để đóng sidebar trên mobile
}

export default function FilterSidebar({
  showFilters,
  filters,
  onToggleFilter,
  onClearFilters,
  onClose,
}: FilterSidebarProps) {
  return (
    <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
      <div className="bg-cinematic-gray rounded-xl p-6 border border-gray-800 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Filter className="w-5 h-5 mr-2 text-cinematic-accent" />
            Bộ lọc
          </h3>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Difficulty */}
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">Độ khó</h4>
            <div className="space-y-2">
              {['Easy', 'Medium', 'Hard'].map((level) => (
                <label key={level} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.difficulty.includes(level)}
                    onChange={() => onToggleFilter('difficulty', level)}
                    className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cooking Time */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Thời gian nấu</h4>
            <div className="space-y-2">
              {[
                { label: 'Dưới 15 phút', value: '15' },
                { label: '15-30 phút', value: '30' },
                { label: '30-60 phút', value: '60' },
                { label: 'Trên 1 giờ', value: '60+' },
              ].map((time) => (
                <label key={time.value} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="cookingTime"
                    checked={filters.cookingTime === time.value}
                    onChange={() => onToggleFilter('cookingTime', time.value)}
                    className="w-4 h-4 bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white">{time.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Cuisine */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Ẩm thực</h4>
            <div className="space-y-2">
              {['Italian', 'French', 'American', 'Asian', 'Mexican'].map((cuisine) => (
                <label key={cuisine} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.cuisine.includes(cuisine)}
                    onChange={() => onToggleFilter('cuisine', cuisine)}
                    className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white">{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div className="border-t border-gray-700 pt-6">
            <h4 className="text-sm font-medium text-gray-300 mb-3">Chế độ ăn</h4>
            <div className="space-y-2">
              {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((diet) => (
                <label key={diet} className="flex items-center space-x-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.dietary.includes(diet)}
                    onChange={() => onToggleFilter('dietary', diet)}
                    className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-white">{diet}</span>
                </label>
              ))}
            </div>
          </div>

          <Button variant="secondary" className="w-full" onClick={onClearFilters}>
            Xóa bộ lọc
          </Button>
        </div>
      </div>
    </aside>
  );
}