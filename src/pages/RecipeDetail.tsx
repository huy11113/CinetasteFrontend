// src/pages/RecipeDetail.tsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Clock, ChefHat, Star, Users, Bookmark, Share2, Film, Sparkles, MessageCircle, ThumbsUp, Loader2 } from 'lucide-react';
import Button from '../components/ui/Button';
import apiClient from '../services/apiClient'; 
import { type RecipeDetail, type RecipeStep, type RecipeIngredient } from '../types';

// --- HÀM HELPER CHUYỂN ĐỔI (giống trang Browse.tsx) 
const mapDifficulty = (diff: number): 'Easy' | 'Medium' | 'Hard' => {
  if (diff <= 1) return 'Easy';
  if (diff >= 3) return 'Hard';
  return 'Medium';
};

// --- COMPONENT LOADING (MỚI) ---
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh]">
    <Loader2 className="w-16 h-16 text-cinematic-accent animate-spin" />
  </div>
);

// --- COMPONENT LỖI (MỚI) ---
const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="text-center py-20">
    <h2 className="text-2xl font-semibold text-red-400 mb-4">Đã xảy ra lỗi</h2>
    <p className="text-gray-400">{message}</p>
    <Button as="link" href="/browse" className="mt-6">
      Quay lại trang khám phá
    </Button>
  </div>
);

export default function RecipeDetail() {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
  const [showAIPanel, setShowAIPanel] = useState(false);

  // --- STATE MỚI ĐỂ LẤY DỮ LIỆU ---
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  // --------------------------------

  // --- GỌI API KHI COMPONENT MỞ RA ---
  useEffect(() => {
    if (!id) {
      setError("Không tìm thấy ID công thức.");
      setIsLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<RecipeDetail>(`/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết công thức:", err);
        setError("Không thể tải công thức. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]); // Chạy lại khi ID thay đổi
  // ---------------------------------

  const toggleIngredient = (index: number) => {
    setCheckedIngredients(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  // --- XỬ LÝ LOADING VÀ LỖI ---
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorDisplay message={error} />
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen pt-20 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorDisplay message="Không tìm thấy công thức này." />
      </div>
    );
  }
  // -------------------------------

  // Dữ liệu comments (Tạm thời vẫn dùng static, bạn sẽ kết nối sau nhé)
  const comments = [
    { id: 1, user: 'Sarah Chen', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, comment: '...', date: '2 days ago', likes: 12 },
    { id: 2, user: 'Marco Rodriguez', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200', rating: 5, comment: '...', date: '1 week ago', likes: 8 },
  ];

  // --- RENDER DỮ LIỆU ĐỘNG ---
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="relative h-[60vh] mb-8">
        <img
          src={recipe.mainImageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinematic-darker via-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            {recipe.movie && (
              <div className="flex items-center space-x-2 mb-4">
                <Film className="w-5 h-5 text-cinematic-gold" />
                <span className="text-cinematic-gold font-medium">{recipe.movie.title} ({recipe.movie.year})</span>
              </div>
            )}
            <h1 className="text-5xl font-display font-bold text-white mb-4">{recipe.title}</h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-gray-300">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-cinematic-gold fill-cinematic-gold" />
                <span className="font-semibold">{recipe.avgRating.toFixed(1)}</span>
                <span className="text-gray-400">({recipe.ratingsCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-5 h-5" />
                <span>{(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <ChefHat className="w-5 h-5" />
                <span>{mapDifficulty(recipe.difficulty)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-5 h-5" />
                <span>{recipe.servings} servings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <img
                  src={recipe.author.avatarUrl}
                  alt={recipe.author.name}
                  className="w-12 h-12 rounded-full border-2 border-cinematic-accent"
                />
                <div>
                  <p className="text-sm text-gray-400">Recipe by</p>
                  <p className="text-white font-semibold">{recipe.author.name}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{recipe.summary}</p>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 overflow-hidden mb-8">
              <div className="flex border-b border-gray-800">
                {(['ingredients', 'instructions', 'nutrition'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                      activeTab === tab
                        ? 'bg-cinematic-accent text-white'
                        : 'text-gray-400 hover:text-white hover:bg-cinematic-gray-light'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="p-6">
                {activeTab === 'ingredients' && (
                  <div className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <label
                        key={index}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-cinematic-gray-light cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={checkedIngredients.includes(index)}
                          onChange={() => toggleIngredient(index)}
                          className="w-5 h-5 rounded bg-cinematic-gray-light border-gray-600 text-cinematic-accent focus:ring-cinematic-accent mt-1"
                        />
                        <span className={`text-gray-300 ${checkedIngredients.includes(index) ? 'line-through opacity-50' : ''}`}>
                          <span className="font-semibold">{ingredient.quantityUnit}</span> {ingredient.name}
                          {ingredient.isOptional && <span className="text-xs text-gray-500"> (optional)</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                )}

                {activeTab === 'instructions' && (
                  <div className="space-y-6">
                    {recipe.instructions.map((instruction) => (
                      <div key={instruction.step} className="flex space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cinematic-accent flex items-center justify-center text-white font-bold">
                          {instruction.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-2">{instruction.title}</h4>
                          <p className="text-gray-400 mb-3">{instruction.description}</p>
                          {instruction.imageUrl && (
                            <img src={instruction.imageUrl} alt={`Step ${instruction.step}`} className="rounded-lg border border-gray-700" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(recipe.nutrition).length > 0 ? (
                      Object.entries(recipe.nutrition).map(([key, value]) => (
                        <div key={key} className="bg-cinematic-gray-light rounded-lg p-4 text-center">
                          <p className="text-2xl font-bold text-cinematic-accent mb-1">{value}</p>
                          <p className="text-sm text-gray-400 capitalize">{key}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-full text-center">Thông tin dinh dưỡng không có sẵn.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* (Phần Comments giữ nguyên, bạn sẽ kết nối sau) */}
            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
              <h3 className="text-2xl font-display font-bold text-white mb-6">Reviews & Comments</h3>
              {/* (Code comments tĩnh giữ nguyên) */}
            </div>

          </main>

          <aside className="lg:w-80">
            <div className="bg-gradient-to-br from-cinematic-accent to-cinematic-gold rounded-xl p-6 mb-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold flex items-center">
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Sous-Chef
                </h3>
              </div>
              <p className="text-white/90 text-sm mb-4">
                Get instant help with ingredient substitutions, dietary modifications, and cooking tips!
              </p>
              <Button
                variant="secondary"
                className="w-full bg-white text-cinematic-accent hover:bg-gray-100"
                onClick={() => setShowAIPanel(!showAIPanel)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Ask AI Assistant
              </Button>

              {showAIPanel && (
                <div className="mt-4 space-y-3">
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Make it vegan
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Reduce cooking time
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Substitute ingredients
                  </button>
                  <button className="w-full text-left px-4 py-3 bg-white/20 hover:bg-white/30 rounded-lg text-white text-sm transition-colors">
                    Adjust servings
                  </button>
                </div>
              )}
            </div>

            <div className="bg-cinematic-gray rounded-xl border border-gray-800 p-6">
              <h3 className="text-white font-bold mb-4">Similar Recipes</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <a key={i} href="#" className="flex space-x-3 group">
                    <img
                      src={`https://images.pexels.com/photos/${1279330 + i}/pexels-photo-${1279330 + i}.jpeg?auto=compress&cs=tinysrgb&w=200`}
                      alt="Recipe"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium group-hover:text-cinematic-accent transition-colors line-clamp-2">
                        Another Delicious Recipe
                      </h4>
                      <div className="flex items-center space-x-2 mt-1 text-xs text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span>30 min</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
