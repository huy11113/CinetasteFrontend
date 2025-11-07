// src/pages/Browse.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import Button from '../components/ui/Button';
import apiClient from '../services/apiClient';
import { type Recipe } from '../types';

// Import các component con mới
import FilterSidebar from '../components/browse/FilterSidebar';
import RecipeGrid from '../components/browse/RecipeGrid';
import Pagination from '../components/browse/Pagination';

// --- DỮ LIỆU TĨNH ĐỂ XEM TRƯỚC ---
const STATIC_RECIPES = [
  // (Tôi sẽ rút gọn mảng này cho ngắn, bạn có thể dùng mảng đầy đủ của mình)
  {
    id: '1',
    title: 'Ratatouille - Classic French Vegetable Stew',
    image: 'https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=800',
    movieTitle: 'Ratatouille',
    cookingTime: 45,
    difficulty: 'Medium' as const,
    rating: 4.8,
    reviewCount: 234,
  },
  {
    id: '2',
    title: 'Butter Beer - Harry Potter Magic Drink',
    image: 'https://images.pexels.com/photos/1684032/pexels-photo-1684032.jpeg?auto=compress&cs=tinysrgb&w=800',
    movieTitle: 'Harry Potter',
    cookingTime: 15,
    difficulty: 'Easy' as const,
    rating: 4.9,
    reviewCount: 567,
  },
  // ... (thêm 7 công thức còn lại của bạn vào đây)
  {
    id: '9',
    title: 'Grilled Cheese - Chef Movie Classic',
    image: 'https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=800',
    movieTitle: 'Chef',
    cookingTime: 10,
    difficulty: 'Easy' as const,
    rating: 4.7,
    reviewCount: 892,
  },
];
// ------------------------------------

// --- CÁC HÀM HELPER ---

// Kiểu dữ liệu mà RecipeCard của bạn đang mong đợi
type BrowseRecipeCard = {
  id: string;
  title: string;
  image: string;
  movieTitle: string;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  reviewCount: number;
}

// Hàm chuyển đổi độ khó
const mapDifficulty = (diff: number): 'Easy' | 'Medium' | 'Hard' => {
  if (diff <= 1) return 'Easy';
  if (diff >= 3) return 'Hard';
  return 'Medium';
};

// Hàm chuyển đổi từ API (Recipe) sang Card (BrowseRecipeCard)
const mapApiToCardProps = (recipe: Recipe): BrowseRecipeCard => ({
  id: recipe.id,
  title: recipe.title,
  image: recipe.mainImageUrl,
  movieTitle: recipe.movieTitle,
  cookingTime: (recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0),
  difficulty: mapDifficulty(recipe.difficulty),
  rating: recipe.avgRating,
  reviewCount: recipe.ratingsCount,
});
// ------------------------------------

// --- COMPONENT CHÍNH ---
export default function Browse() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    cookingTime: '' as string,
    cuisine: [] as string[],
    dietary: [] as string[],
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const [recipes, setRecipes] = useState<BrowseRecipeCard[]>(STATIC_RECIPES);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1); 
  const [totalResults, setTotalResults] = useState(STATIC_RECIPES.length);

  // --- HÀM GỌI API (ĐANG TẠM COMMENT OUT) ---
  /*
  const fetchRecipes = async (page: number, query: string) => {
    setIsLoading(true);
    try {
      const params = {
        page: page,
        size: 9, 
        sort: 'createdAt,desc',
        q: query || undefined,
        // TODO: Thêm các filter từ state 'filters' vào params
      };

      const response = await apiClient.get('/recipes', { params });
      
      const apiRecipes = (response.data.content || []).map(mapApiToCardProps);
      setRecipes(apiRecipes);
      setTotalPages(response.data.totalPages || 0);
      setTotalResults(response.data.totalElements || 0);
      setCurrentPage(response.data.number || 0);

    } catch (error) {
      console.error("Lỗi khi tải danh sách công thức:", error);
      setRecipes(STATIC_RECIPES); // Fallback
    } finally {
      setIsLoading(false);
    }
  };
  */
  // -----------------------------------------

  // --- Cập nhật state khi URL thay đổi ---
  useEffect(() => {
    const queryFromUrl = searchParams.get('q') || '';
    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10) - 1;
    
    setSearchQuery(queryFromUrl);
    setCurrentPage(pageFromUrl);
    
    // Bật dòng này khi muốn chạy API
    // fetchRecipes(pageFromUrl, queryFromUrl); 
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  // ------------------------------------

  // --- CÁC HÀM XỬ LÝ ---
  
  const handleBrowseSearch = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) {
      newParams.set('q', query);
    } else {
      newParams.delete('q');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const handlePageChange = (newPage: number) => { // newPage là 1-based
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage - 1);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (category === 'cookingTime') {
        newFilters[category] = prevFilters[category] === value ? '' : value;
      } else {
        const current = prevFilters[category] as string[];
        newFilters[category] = current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value];
      }
      return newFilters;
    });
    // TODO: Gọi lại API sau khi filter
    // fetchRecipes(0, searchQuery); 
  };

  const clearFilters = () => {
    setFilters({ difficulty: [], cookingTime: '', cuisine: [], dietary: [] });
    // TODO: Gọi lại API sau khi xóa filter
    // fetchRecipes(0, searchQuery);
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tiêu đề trang */}
        <div className="mb-8">
          <h1 className="section-title">Khám phá Công thức</h1>
          <p className="text-gray-400">Khám phá các món ăn từ bộ phim yêu thích của bạn</p>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleBrowseSearch}
            key={searchQuery} 
            initialValue={searchQuery}
            placeholder="Tìm theo phim, món ăn, hoặc nguyên liệu..."
          />
        </div>

        {/* Bố cục chính (Sidebar + Main) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Component Sidebar */}
          <FilterSidebar 
            showFilters={showFilters}
            filters={filters}
            onToggleFilter={toggleFilter}
            onClearFilters={clearFilters}
            onClose={() => setShowFilters(false)}
          />

          {/* Phần nội dung chính */}
          <main className="flex-1">
            {/* Thanh Sắp xếp / Nút lọc mobile */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                Hiển thị <span className="text-white font-semibold">{totalResults}</span> công thức
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden btn-secondary flex items-center space-x-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Lọc</span>
                </button>
                <select className="px-4 py-2 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cinematic-accent">
                  <option>Phổ biến nhất</option>
                  <option>Đánh giá cao nhất</option>
                  <option>Mới nhất</option>
                  <option>Thời gian nấu</option>
                </select>
              </div>
            </div>

            {/* Component Lưới công thức */}
            <RecipeGrid 
              isLoading={isLoading}
              recipes={recipes}
            />

            {/* Component Phân trang */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
}