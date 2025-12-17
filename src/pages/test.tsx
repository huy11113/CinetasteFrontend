import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, ChefHat, Star, Share2, 
  Heart, Printer, Wand2, ChevronLeft, 
  Check, PlayCircle, Sparkles, Lightbulb,
  Utensils, Calendar
} from 'lucide-react';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../types';
import toast from 'react-hot-toast';
import CommentsSection from '../components/ui/CommentsSection'; // Import Component Bình Luận Mới

// --- CONFIG: BẢNG MAP ICON ---
const NUTRITION_MAP: Record<string, { emoji: string; label: string }> = {
  calories: { emoji: "🔥", label: "Calories" },
  kcal: { emoji: "🔥", label: "Kcal" },
  protein: { emoji: "🥩", label: "Protein" },
  carbs: { emoji: "🍞", label: "Carbs" },
  fat: { emoji: "🥑", label: "Fat" },
  fiber: { emoji: "🌿", label: "Fiber" },
  sugar: { emoji: "🍬", label: "Sugar" },
  default: { emoji: "🍽️", label: "Other" }
};

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>(); // Thêm type cho id
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  // Tab mặc định là 'instructions' để người dùng thấy cách làm ngay
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition' | 'reviews'>('instructions');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const data = await recipeService.getRecipeById(id);
        setRecipe(data as unknown as Recipe);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải công thức");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) newChecked.delete(index);
    else newChecked.add(index);
    setCheckedIngredients(newChecked);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0E0E10] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#D4AF37] animate-pulse font-medium">Đang chuẩn bị nguyên liệu...</p>
      </div>
    </div>
  );

  if (!recipe) return (
    <div className="min-h-screen bg-[#0E0E10] text-white flex flex-col items-center justify-center gap-6">
      <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center">
        <Utensils className="w-10 h-10 text-gray-500" />
      </div>
      <p className="text-xl text-[#A3A3A3]">Không tìm thấy công thức này</p>
      <Link to="/" className="px-6 py-2 bg-[#D4AF37] text-black font-bold rounded-full hover:bg-[#F2C94C] transition-colors">
        Quay về trang chủ
      </Link>
    </div>
  );

  const progressPercent = recipe.ingredients ? (checkedIngredients.size / recipe.ingredients.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA] font-sans selection:bg-[#D4AF37] selection:text-black pb-20">
      
      {/* ==================================================================
          1. HEADER & HERO SECTION
      ================================================================== */}
      <div className="relative h-[55vh] lg:h-[65vh] w-full group">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={recipe.mainImageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover transform transition-transform duration-[10s] group-hover:scale-110 filter brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0E0E10]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/60 to-transparent" />
        </div>

        {/* Navbar Actions */}
        <div className="absolute top-6 left-0 right-0 px-6 lg:px-12 flex justify-between items-center z-50">
          <Link to="/" className="group flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-all">
            <ChevronLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium text-white hidden sm:inline">Quay lại</span>
          </Link>
          <div className="flex gap-3">
            {[Heart, Share2].map((Icon, idx) => (
              <button key={idx} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-[#D4AF37] hover:text-black hover:scale-110 transition-all border border-white/10">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 lg:px-12 pb-12 z-40">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-end justify-between gap-8">
            <div className="flex-1 space-y-4">
              {/* Movie Tag */}
              {recipe.movie && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#D4AF37]/20 mb-2 animate-fade-in-up">
                  <PlayCircle className="w-3.5 h-3.5 fill-black" />
                  {recipe.movie.title}
                </div>
              )}
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight font-display drop-shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {recipe.title}
              </h1>
              
              <div className="flex items-center gap-4 text-sm font-medium text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {recipe.author && (
                  <Link to={`/profile/${recipe.author.username || recipe.author.id}`} className="flex items-center gap-2 group cursor-pointer hover:bg-white/10 px-2 py-1 rounded-full transition-all">
                    <img 
                      src={recipe.author.avatarUrl || `https://ui-avatars.com/api/?name=${recipe.author.name}&background=random`}
                      alt={recipe.author.name}
                      className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#D4AF37]"
                    />
                    <span className="text-white group-hover:text-[#D4AF37] transition-colors">{recipe.author.name}</span>
                  </Link>
                )}
                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(recipe.createdAt).toLocaleDateString('vi-VN')}</span>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="flex gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col items-center min-w-[90px]">
                <Clock className="w-6 h-6 text-[#D4AF37] mb-2" />
                <span className="text-xs text-gray-400 uppercase">Thời gian</span>
                <span className="font-bold text-white">{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
              </div>
              <div className="bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col items-center min-w-[90px]">
                <ChefHat className="w-6 h-6 text-[#D4AF37] mb-2" />
                <span className="text-xs text-gray-400 uppercase">Độ khó</span>
                <span className="font-bold text-white">
                  {recipe.difficulty === 1 ? 'Dễ' : recipe.difficulty === 2 ? 'Vừa' : 'Khó'}
                </span>
              </div>
              <div className="bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col items-center min-w-[90px]">
                <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37] mb-2" />
                <span className="text-xs text-gray-400 uppercase">Đánh giá</span>
                <span className="font-bold text-white">{recipe.avgRating} <span className="text-xs font-normal text-gray-500">({recipe.ratingsCount})</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================
          2. MAIN LAYOUT
      ================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* --- LEFT COLUMN (CONTENT - 8 CỘT) --- */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Description */}
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300 leading-relaxed font-light border-l-4 border-[#D4AF37] pl-4 italic">
                "{recipe.summary}"
              </p>
            </div>

            {/* TAB NAVIGATION */}
            <div className="sticky top-4 z-30 bg-[#0E0E10]/95 backdrop-blur-sm py-2 border-b border-white/10 mb-8">
              <div className="flex gap-8 overflow-x-auto no-scrollbar">
                {[
                  { id: 'instructions', label: 'Cách Làm' },
                  { id: 'ingredients', label: 'Nguyên Liệu' },
                  { id: 'nutrition', label: 'Dinh Dưỡng' },
                  { id: 'reviews', label: 'Bình Luận' } // Đổi tên nhãn
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                      activeTab === tab.id ? 'text-[#D4AF37]' : 'text-gray-500 hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37] shadow-[0_-2px_10px_rgba(212,175,55,0.5)]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENTS */}
            <div className="min-h-[400px]">
              
              {/* --- INSTRUCTIONS --- */}
              {activeTab === 'instructions' && (
                <div className="space-y-12 animate-fade-in">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white font-display">Hướng dẫn chi tiết</h3>
                    <button className="text-sm flex items-center gap-2 text-[#D4AF37] hover:underline">
                      <Printer className="w-4 h-4" /> In hướng dẫn
                    </button>
                  </div>
                  
                  <div className="relative border-l border-white/10 ml-6 md:ml-10 space-y-12 pb-4">
                    {recipe.instructions?.map((step, idx) => (
                      <div key={idx} className="relative pl-8 md:pl-12 group">
                        {/* Step Number Bubble */}
                        <div className="absolute -left-[21px] md:-left-[25px] top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1A1A1E] border-4 border-[#0E0E10] flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300">
                          <span className="text-[#D4AF37] font-bold text-lg">{step.step}</span>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                            Bước {step.step}
                          </h4>
                          <p className="text-gray-300 text-lg leading-8">
                            {step.description}
                          </p>
                          
                          {step.imageUrl && (
                            <div className="mt-4 rounded-xl overflow-hidden border border-white/10 shadow-lg max-w-xl">
                              <img src={step.imageUrl} alt={`Bước ${step.step}`} className="w-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                          )}

                          {idx % 3 === 0 && (
                            <div className="mt-4 flex gap-4 bg-[#D4AF37]/5 p-4 rounded-xl border border-[#D4AF37]/20">
                              <div className="p-2 bg-[#D4AF37]/10 rounded-full h-fit">
                                <Lightbulb className="w-5 h-5 text-[#D4AF37]" />
                              </div>
                              <div>
                                <h5 className="font-bold text-[#D4AF37] text-sm mb-1">Mẹo nhỏ từ bếp trưởng</h5>
                                <p className="text-sm text-gray-400">Luôn nếm thử ở mỗi bước để đảm bảo gia vị được cân bằng hoàn hảo trước khi sang bước tiếp theo.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- INGREDIENTS --- */}
              {activeTab === 'ingredients' && (
                <div className="animate-fade-in">
                  <div className="bg-[#1A1A1E] rounded-2xl p-6 lg:p-8 border border-white/5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white font-display mb-1">Nguyên liệu cần chuẩn bị</h3>
                        <p className="text-gray-400 text-sm">Khẩu phần cho <span className="text-white font-bold">{recipe.servings} người</span></p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[#D4AF37] font-bold text-lg">
                          {Math.round(progressPercent)}%
                        </span>
                        <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-[#D4AF37] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {recipe.ingredients?.map((ing, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => toggleIngredient(idx)}
                          className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 select-none ${
                            checkedIngredients.has(idx) 
                              ? 'bg-[#D4AF37]/5 border-[#D4AF37]/30 opacity-70' 
                              : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                          }`}
                        >
                          <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                            checkedIngredients.has(idx) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-gray-500'
                          }`}>
                            {checkedIngredients.has(idx) && <Check className="w-3.5 h-3.5 text-black" />}
                          </div>
                          <div className={checkedIngredients.has(idx) ? 'line-through text-gray-500' : 'text-gray-200'}>
                            <span className={`font-bold ${checkedIngredients.has(idx) ? 'text-gray-500' : 'text-white'}`}>
                              {ing.quantityUnit}
                            </span>
                            {' '}{ing.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- NUTRITION --- */}
              {activeTab === 'nutrition' && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-bold text-white font-display mb-8">Giá trị dinh dưỡng</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {recipe.nutrition && Object.keys(recipe.nutrition).length > 0 ? (
                      Object.entries(recipe.nutrition).map(([key, value], idx) => {
                        const config = NUTRITION_MAP[key.toLowerCase()] || NUTRITION_MAP.default;
                        return (
                          <div key={idx} className="bg-[#1A1A1E] p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:border-[#D4AF37]/30 hover:-translate-y-1 transition-all duration-300">
                            <span className="text-4xl mb-4 filter drop-shadow-lg">{config.emoji}</span>
                            <span className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-2">{config.label || key}</span>
                            <span className="text-2xl font-bold text-[#D4AF37]">{String(value)}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-full py-12 text-center bg-[#1A1A1E] rounded-2xl border border-dashed border-white/10">
                        <p className="text-gray-500">Chưa có thông tin dinh dưỡng cho món này.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- REVIEWS (COMMENTS SECTION) --- */}
              {activeTab === 'reviews' && (
                <div className="animate-fade-in">
                   {/* Truyền recipeId vào component comment */}
                   <CommentsSection recipeId={id!} />
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT COLUMN (SIDEBAR) --- */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* AI Action Card - Highlighted */}
            <div className="bg-gradient-to-br from-[#1A1A1E] to-black p-1 rounded-2xl relative group">
              {/* Border Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] via-[#B23A48] to-[#D4AF37] rounded-2xl opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
              
              <div className="bg-[#131315] p-6 rounded-xl relative h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B23A48] flex items-center justify-center shadow-lg shadow-[#D4AF37]/20 mb-4 animate-bounce-slow">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-white mb-2 font-display">AI Sous-Chef</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Bạn muốn món này ít cay hơn, chuyển sang món chay, hay thay đổi khẩu phần? AI sẽ giúp bạn viết lại công thức trong tích tắc.
                </p>
                <Link to="/ai-studio" className="w-full py-3 bg-[#D4AF37] text-black font-bold rounded-xl hover:bg-[#F2C94C] transition-all shadow-lg hover:shadow-[#D4AF37]/30 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" /> Biến tấu ngay
                </Link>
              </div>
            </div>

            {/* Ingredient Checklist Summary (Mini) */}
            <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-white/5">
              <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#D4AF37]" /> Công cụ
              </h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <Printer className="w-4 h-4" /> In bản rút gọn
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <Share2 className="w-4 h-4" /> Chia sẻ với bạn bè
                </li>
                <li className="flex items-center gap-2 cursor-pointer hover:text-white">
                  <Bookmark className="w-4 h-4" /> Lưu vào bộ sưu tập
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}