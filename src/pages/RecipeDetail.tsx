import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, ChefHat, Flame, Star, Share2, 
  Bookmark, Heart, Printer, Wand2, ChevronLeft, 
  Check, PlayCircle, Sparkles, Lightbulb
} from 'lucide-react';
import { recipeService } from '../services/recipeService';
import { Recipe } from '../types';
import toast from 'react-hot-toast';

// --- CONFIG: BẢNG MAP ICON CHO FRONTEND ---
// Tự động gắn Emoji dựa trên key nhận được từ Backend
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
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions' | 'nutrition' | 'reviews'>('ingredients');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      try {
        const data = await recipeService.getRecipeById(id);
        setRecipe(data);
      } catch (error) {
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
      <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!recipe) return (
    <div className="min-h-screen bg-[#0E0E10] text-white flex flex-col items-center justify-center gap-4">
      <p className="text-xl text-[#A3A3A3]">Không tìm thấy công thức này</p>
      <Link to="/" className="text-[#D4AF37] hover:underline">Quay về trang chủ</Link>
    </div>
  );

  // Tính phần trăm hoàn thành nguyên liệu
  const progressPercent = recipe.ingredients ? (checkedIngredients.size / recipe.ingredients.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#EAEAEA] font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO SECTION (CINEMATIC HEADER) */}
      <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden group">
        <img 
          src={recipe.mainImageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover transform transition-transform duration-[3s] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/40 to-transparent" />

        {/* Top Navigation */}
        <div className="absolute top-6 left-4 right-4 lg:left-8 lg:right-8 flex justify-between items-center z-20">
          <Link to="/" className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all border border-white/10 group">
            <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
          </Link>
          <div className="flex gap-3">
            {[Heart, Bookmark, Share2].map((Icon, idx) => (
              <button key={idx} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all border border-white/10">
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        {/* Title & Stats Card */}
        <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8 z-10 animate-fade-in-up">
          <div className="max-w-7xl mx-auto">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#D4AF37] to-[#B23A48]" />
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div>
                  {recipe.movie && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider mb-3">
                      <PlayCircle className="w-3 h-3" />
                      {recipe.movie.title}
                    </div>
                  )}
                  <h1 className="text-3xl lg:text-5xl font-bold font-display text-white mb-2 leading-tight">
                    {recipe.title}
                  </h1>
                  <p className="text-[#A3A3A3] line-clamp-2 max-w-2xl text-lg font-light">{recipe.summary}</p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-4 lg:gap-8 text-sm font-medium items-center">
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-[#D4AF37] fill-[#D4AF37]" />
                    <div>
                      <span className="text-white text-xl font-bold block leading-none">{recipe.avgRating || 0}</span>
                      <span className="text-[#A3A3A3] text-xs">{recipe.ratingsCount || 0} reviews</span>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/20 hidden lg:block" />
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-center">
                      <Clock className="w-5 h-5 text-[#D4AF37] mb-1" />
                      <span className="text-[#EAEAEA]">{recipe.prepTimeMinutes + recipe.cookTimeMinutes}m</span>
                    </div>
                    <div className="flex flex-col items-center ml-4">
                      <ChefHat className="w-5 h-5 text-[#D4AF37] mb-1" />
                      <span className="text-[#EAEAEA]">
                        {recipe.difficulty === 1 ? 'Dễ' : recipe.difficulty === 2 ? 'Vừa' : 'Khó'}
                      </span>
                    </div>
                    {/* Calories (Nếu có) */}
                    <div className="flex flex-col items-center ml-4">
                      <Flame className="w-5 h-5 text-[#B23A48] mb-1" />
                      <span className="text-[#EAEAEA]">kcal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F2C94C] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-1">
                <Printer className="w-5 h-5" /> In Công Thức
              </button>
              <button className="flex-1 bg-white/5 border border-[#D4AF37]/50 text-[#D4AF37] font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10 transition-all">
                <Wand2 className="w-5 h-5" /> Tùy Chỉnh AI
              </button>
            </div>

            {/* Tabs & Content */}
            <div className="bg-[#1A1A1E] rounded-2xl border border-white/5 overflow-hidden min-h-[600px]">
              <div className="flex border-b border-white/5 bg-[#141416]">
                {[
                  { id: 'ingredients', label: 'Nguyên Liệu' },
                  { id: 'instructions', label: 'Cách Làm' },
                  { id: 'nutrition', label: 'Dinh Dưỡng' },
                  { id: 'reviews', label: 'Đánh Giá' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 py-5 text-sm font-bold tracking-wide transition-all relative ${
                      activeTab === tab.id ? 'text-[#D4AF37]' : 'text-[#777] hover:text-white'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent shadow-[0_-2px_10px_rgba(212,175,55,0.5)]" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-8">
                {/* 1. Ingredients */}
                {activeTab === 'ingredients' && (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold text-white">Thành phần</h3>
                      <span className="text-[#D4AF37] font-mono text-sm">
                        {checkedIngredients.size}/{recipe.ingredients?.length || 0} done
                      </span>
                    </div>
                    {/* Progress */}
                    <div className="h-1 bg-gray-800 rounded-full mb-8 overflow-hidden">
                      <div className="h-full bg-[#D4AF37] transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
                    </div>
                    {/* List */}
                    <div className="space-y-4">
                      {recipe.ingredients?.map((ing, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => toggleIngredient(idx)}
                          className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${
                            checkedIngredients.has(idx) 
                              ? 'bg-[#D4AF37]/5 border-[#D4AF37]/30' 
                              : 'bg-white/5 border-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                            checkedIngredients.has(idx) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-[#A3A3A3] group-hover:border-[#D4AF37]'
                          }`}>
                            {checkedIngredients.has(idx) && <Check className="w-4 h-4 text-black" />}
                          </div>
                          <div className={`flex-1 ${checkedIngredients.has(idx) ? 'line-through text-[#777]' : 'text-[#EAEAEA]'}`}>
                            <span className="font-bold text-white">{ing.quantity} {ing.unit}</span> {ing.name}
                          </div>
                          {ing.notes && <span className="text-xs text-[#A3A3A3] italic">{ing.notes}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Instructions */}
                {activeTab === 'instructions' && (
                  <div className="space-y-10 animate-fade-in">
                    {recipe.instructions?.map((step, idx) => (
                      <div key={idx} className="flex gap-6 group">
                         <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B23A48] text-white font-bold text-lg flex items-center justify-center shadow-lg z-10 border-4 border-[#1A1A1E]">
                              {step.stepOrder}
                            </div>
                            {idx !== (recipe.instructions?.length || 0) - 1 && (
                              <div className="w-0.5 flex-1 bg-white/10 my-2 group-hover:bg-[#D4AF37]/30 transition-colors" />
                            )}
                         </div>
                         <div className="flex-1 pb-4">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/30 transition-all hover:bg-white/10">
                               <div className="flex justify-between items-start mb-3">
                                  <h4 className="font-bold text-lg text-white">Bước {step.stepOrder}</h4>
                                  <span className="text-xs flex items-center gap-1 text-[#A3A3A3] bg-black/30 px-2 py-1 rounded border border-white/5">
                                    <Clock className="w-3 h-3" /> {step.durationMinutes || 0}m
                                  </span>
                               </div>
                               <p className="text-[#EAEAEA] leading-relaxed text-lg">{step.instructions}</p>
                               {/* Hint Box mẫu */}
                               {idx % 2 === 0 && (
                                 <div className="mt-4 flex gap-3 bg-[#D4AF37]/5 p-4 rounded-lg border border-[#D4AF37]/20">
                                   <Lightbulb className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                                   <p className="text-sm text-[#D4AF37]/90">Mẹo: Hãy chú ý nhiệt độ để món ăn đạt hương vị chuẩn nhất.</p>
                                 </div>
                               )}
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. Nutrition (TỰ ĐỘNG MAP ICON TỪ BACKEND CŨ) */}
                {activeTab === 'nutrition' && (
                  <div className="grid grid-cols-2 gap-4 animate-fade-in">
                    {recipe.nutrition ? (
                      // Xử lý Map từ Backend: Object.entries({key: value})
                      Object.entries(recipe.nutrition).map(([key, value], idx) => {
                        const config = NUTRITION_MAP[key.toLowerCase()] || NUTRITION_MAP.default;
                        return (
                          <div key={idx} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                            <span className="text-4xl mb-3">{config.emoji}</span>
                            <span className="text-[#A3A3A3] text-xs uppercase tracking-wider mb-1 font-bold">{config.label || key}</span>
                            <span className="text-2xl font-bold text-[#D4AF37]">{String(value)}</span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-span-2 text-center text-gray-500 italic py-10">Chưa có thông tin dinh dưỡng</div>
                    )}
                  </div>
                )}

                {/* 4. Reviews */}
                {activeTab === 'reviews' && (
                  <div className="text-center py-12 animate-fade-in">
                    <div className="text-6xl font-bold text-[#D4AF37] mb-2">{recipe.avgRating}</div>
                    <div className="flex justify-center gap-1 text-[#D4AF37] mb-6">
                      {[1,2,3,4,5].map(s => (
                        <Star key={s} className={`w-6 h-6 ${s <= Math.round(recipe.avgRating) ? 'fill-current' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <p className="text-[#A3A3A3]">Tính năng đánh giá chi tiết đang được phát triển.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* AI Chef Card */}
              <div className="bg-gradient-to-br from-[#1A1A1E] to-[#251A1C] p-6 rounded-2xl border border-[#D4AF37]/20 relative overflow-hidden group hover:border-[#D4AF37]/50 transition-colors">
                <div className="absolute -top-4 -right-4 p-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-12">
                   <Sparkles className="w-32 h-32 text-[#D4AF37]" />
                </div>
                <div className="flex items-center gap-3 mb-4 relative z-10">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B23A48] flex items-center justify-center shadow-lg">
                     <Wand2 className="w-6 h-6 text-white" />
                   </div>
                   <h3 className="font-bold text-xl text-white">AI Sous-Chef</h3>
                </div>
                <p className="text-[#A3A3A3] text-sm mb-6 relative z-10">
                  Bạn muốn món này ít cay hơn, hoặc đổi sang nguyên liệu chay? Hãy để AI giúp bạn biến tấu công thức ngay lập tức.
                </p>
                <Link to="/ai-studio" className="relative z-10 block w-full py-3 bg-[#D4AF37] text-black font-bold text-center rounded-xl hover:bg-[#F2C94C] transition-all shadow-lg hover:shadow-[#D4AF37]/20">
                   Thử Ngay
                </Link>
              </div>

              {/* Author Card */}
              {recipe.author && (
                <div className="bg-[#1A1A1E] p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                  <img 
                    src={recipe.author.profileImageUrl || `https://ui-avatars.com/api/?name=${recipe.author.displayName}&background=random`} 
                    alt={recipe.author.displayName}
                    className="w-14 h-14 rounded-full border-2 border-[#D4AF37] p-0.5"
                  />
                  <div>
                    <p className="text-xs text-[#A3A3A3] uppercase tracking-wider">Creator</p>
                    <h4 className="text-white font-bold text-lg">{recipe.author.displayName}</h4>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}