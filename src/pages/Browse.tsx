import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Loader2 } from 'lucide-react'; // Thêm Loader2
import SearchBar from '../components/ui/SearchBar';
import apiClient from '../services/apiClient';
import { type RecipeSummary } from '../types'; // Import type chuẩn

import FilterSidebar from '../components/browse/FilterSidebar';
import RecipeGrid from '../components/browse/RecipeGrid';
import Pagination from '../components/browse/Pagination';

// Hàm chuyển đổi số difficulty sang chuỗi để hiển thị UI
const mapDifficultyLabel = (diff: number): "Easy" | "Medium" | "Hard" => {
  if (diff <= 1) return "Easy";
  if (diff >= 4) return "Hard";
  return "Medium";
};

export default function Browse() {
  const [showFilters, setShowFilters] = useState(false);
  // State cho bộ lọc
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    cookingTime: '' as string,
    cuisine: [] as string[],
    dietary: [] as string[],
  });

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  
  const [recipes, setRecipes] = useState<any[]>([]); // Dữ liệu hiển thị
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1); // 1-based cho UI

  // Gọi API lấy dữ liệu
  const fetchRecipes = async (page: number) => {
    setIsLoading(true);
    try {
      // Backend Spring Boot dùng 0-based index cho page
      const params = {
        page: page - 1, 
        size: 9,
        sort: 'createdAt,desc'
      };

      const response = await apiClient.get('/recipes', { params });
      const data = response.data; // Page<RecipeResponse>

      // Map dữ liệu từ API sang format của UI Component
      const mappedRecipes = data.content.map((r: RecipeSummary) => ({
        id: r.id,
        title: r.title,
        image: r.mainImageUrl || 'https://via.placeholder.com/400x300?text=No+Image',
        movieTitle: r.movieTitle || 'Unknown Movie',
        cookingTime: (r.prepTimeMinutes || 0) + (r.cookTimeMinutes || 0),
        difficulty: mapDifficultyLabel(r.difficulty),
        rating: r.avgRating,
        reviewCount: r.ratingsCount,
      }));

      setRecipes(mappedRecipes);
      setTotalPages(data.totalPages);
      
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
      // Có thể thêm toast error ở đây
    } finally {
      setIsLoading(false);
    }
  };

  // Effect: Chạy khi URL thay đổi (page hoặc query)
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1');
    setCurrentPage(page);
    const query = searchParams.get('q') || '';
    setSearchQuery(query);

    fetchRecipes(page);
  }, [searchParams]);

  // Xử lý tìm kiếm
  const handleBrowseSearch = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (query) newParams.set('q', query);
    else newParams.delete('q');
    newParams.set('page', '1'); // Reset về trang 1
    setSearchParams(newParams);
  };

  // Xử lý chuyển trang
  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Các hàm filter (Giữ nguyên logic UI)
  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const isMulti = Array.isArray(prev[category]);
      if (!isMulti) return { ...prev, [category]: prev[category] === value ? '' : value };
      
      const list = prev[category] as string[];
      const newList = list.includes(value) 
        ? list.filter(i => i !== value) 
        : [...list, value];
      return { ...prev, [category]: newList };
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-cinematic-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-display font-bold text-white mb-2">
            Khám phá <span className="text-cinematic-gold">Ẩm thực Điện ảnh</span>
          </h1>
          <p className="text-gray-400">Hàng trăm công thức từ những bộ phim kinh điển đang chờ bạn.</p>
        </div>

        <div className="mb-8">
          <SearchBar 
            onSearch={handleBrowseSearch}
            initialValue={searchQuery}
            placeholder="Tìm món ăn, phim..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar 
            showFilters={showFilters}
            filters={filters}
            onToggleFilter={toggleFilter}
            onClearFilters={() => setFilters({ difficulty: [], cookingTime: '', cuisine: [], dietary: [] })}
            onClose={() => setShowFilters(false)}
          />

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                Trang {currentPage} / {totalPages}
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-cinematic-gray border border-gray-700 rounded-lg text-white"
              >
                <SlidersHorizontal className="w-4 h-4" /> Lọc
              </button>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-cinematic-gold animate-spin" />
              </div>
            ) : (
              <RecipeGrid isLoading={isLoading} recipes={recipes} />
            )}

            <Pagination 
              currentPage={currentPage - 1} // Pagination component dùng 0-based
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </main>
        </div>
      </div>
    </div>
  );
}