// src/pages/Browse.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

export default function Browse() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: [] as string[],
    cookingTime: '' as string,
    cuisine: [] as string[],
    dietary: [] as string[],
  });

  // --- Lấy tham số từ URL ---
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  // -------------------------

  const recipes = [
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
    {
      id: '3',
      title: 'Tiramisu - Godfather Italian Dessert',
      image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'The Godfather',
      cookingTime: 60,
      difficulty: 'Hard' as const,
      rating: 4.7,
      reviewCount: 189,
    },
    {
      id: '4',
      title: 'Big Kahuna Burger - Pulp Fiction Style',
      image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Pulp Fiction',
      cookingTime: 30,
      difficulty: 'Easy' as const,
      rating: 4.6,
      reviewCount: 412,
    },
    {
      id: '5',
      title: 'Chocolate Cake - Matilda Famous Recipe',
      image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Matilda',
      cookingTime: 90,
      difficulty: 'Medium' as const,
      rating: 4.9,
      reviewCount: 678,
    },
    {
      id: '6',
      title: 'Spaghetti & Meatballs - Lady and the Tramp',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Lady and the Tramp',
      cookingTime: 50,
      difficulty: 'Medium' as const,
      rating: 4.8,
      reviewCount: 345,
    },
    {
      id: '7',
      title: 'Turkish Delight - Chronicles of Narnia',
      image: 'https://images.pexels.com/photos/3776942/pexels-photo-3776942.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Narnia',
      cookingTime: 120,
      difficulty: 'Hard' as const,
      rating: 4.5,
      reviewCount: 156,
    },
    {
      id: '8',
      title: 'Beef Wellington - Gordon Ramsay Style',
      image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800',
      movieTitle: 'Chef',
      cookingTime: 150,
      difficulty: 'Hard' as const,
      rating: 4.9,
      reviewCount: 423,
    },
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

  // --- Cập nhật state khi URL thay đổi ---
  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);
  // ------------------------------------

  // --- Hàm xử lý tìm kiếm trên trang Browse ---
  const handleBrowseSearch = (query: string) => {
    setSearchQuery(query);
    // Cập nhật URL mà không reload trang
    setSearchParams(query ? { q: query } : {});
    // TODO: Gọi API fetch công thức với query mới
    console.log("Đang tìm kiếm:", query);
  };
  // -----------------------------------------

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    if (category === 'cookingTime') {
      setFilters({ ...filters, [category]: filters[category] === value ? '' : value });
    } else {
      const current = filters[category] as string[];
      setFilters({
        ...filters,
        [category]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="section-title">Discover Recipes</h1>
          <p className="text-gray-400">Explore dishes from your favorite movies</p>
        </div>

        {/* --- SỬA ĐỔI: Kết nối SearchBar với state --- */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleBrowseSearch}
            // `key` rất quan trọng để React "reset" component khi query từ URL thay đổi
            key={searchQuery} 
            initialValue={searchQuery} // Thêm prop initialValue
            placeholder="Tìm theo phim, món ăn, hoặc nguyên liệu..."
          />
        </div>
        {/* ------------------------------------------- */}

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-cinematic-gray rounded-xl p-6 border border-gray-800 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Filter className="w-5 h-5 mr-2 text-cinematic-accent" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Difficulty</h4>
                  <div className="space-y-2">
                    {['Easy', 'Medium', 'Hard'].map((level) => (
                      <label key={level} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.difficulty.includes(level)}
                          onChange={() => toggleFilter('difficulty', level)}
                          className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Cooking Time</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Under 15 min', value: '15' },
                      { label: '15-30 min', value: '30' },
                      { label: '30-60 min', value: '60' },
                      { label: 'Over 1 hour', value: '60+' },
                    ].map((time) => (
                      <label key={time.value} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="radio"
                          name="cookingTime"
                          checked={filters.cookingTime === time.value}
                          onChange={() => toggleFilter('cookingTime', time.value)}
                          className="w-4 h-4 bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white">{time.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Cuisine</h4>
                  <div className="space-y-2">
                    {['Italian', 'French', 'American', 'Asian', 'Mexican'].map((cuisine) => (
                      <label key={cuisine} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.cuisine.includes(cuisine)}
                          onChange={() => toggleFilter('cuisine', cuisine)}
                          className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white">{cuisine}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-700 pt-6">
                  <h4 className="text-sm font-medium text-gray-300 mb-3">Dietary</h4>
                  <div className="space-y-2">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'].map((diet) => (
                      <label key={diet} className="flex items-center space-x-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.dietary.includes(diet)}
                          onChange={() => toggleFilter('dietary', diet)}
                          className="w-4 h-4 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent"
                        />
                        <span className="text-sm text-gray-400 group-hover:text-white">{diet}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="secondary" className="w-full" onClick={() => setFilters({ difficulty: [], cookingTime: '', cuisine: [], dietary: [] })}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400">
                Showing <span className="text-white font-semibold">{recipes.length}</span> recipes
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden btn-secondary flex items-center space-x-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters</span>
                </button>
                <select className="px-4 py-2 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-cinematic-accent">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Newest</option>
                  <option>Cooking Time</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white hover:bg-cinematic-gray transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-cinematic-accent text-white'
                        : 'bg-cinematic-gray-light text-gray-400 hover:bg-cinematic-gray'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 bg-cinematic-gray-light border border-gray-700 rounded-lg text-white hover:bg-cinematic-gray transition-colors">
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}