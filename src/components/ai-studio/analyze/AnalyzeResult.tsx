// src/components/ai-studio/analyze/AnalyzeResult.tsx
import React, { useState } from 'react';
import { 
  Info, Sparkles, Globe, Leaf, UtensilsCrossed, Wine, Clock, 
  ChefHat, Flame, Droplets, Wind, Zap, ArrowRight, Star, Film, 
  BookOpen, Link as LinkIcon, ShieldAlert, RefreshCw
} from 'lucide-react';
import { AnalyzeDishResponse, NutritionEstimate, RecipeDetail } from './types';

// ============================================
// SUB-COMPONENTS
// ============================================

const ResultPlaceholder: React.FC = () => {
  const placeholderFeatures = [
    { icon: ChefHat, text: 'Công thức chi tiết' },
    { icon: Film, text: 'Bối cảnh phim ảnh' },
    { icon: Globe, text: 'Xuất xứ & Lịch sử' },
    { icon: Sparkles, text: 'Mẹo từ AI Chef' }
  ];

  return (
    <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-cinematic-gray/50 to-black rounded-3xl border border-gray-800 p-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-cinematic-accent/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-cinematic-gold/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="relative z-10 mb-8">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cinematic-accent/20 to-cinematic-gold/20 border border-gray-700 flex items-center justify-center shadow-2xl backdrop-blur-sm animate-float">
          <Sparkles className="w-16 h-16 text-gray-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-cinematic-gold/50 rounded-full blur-sm animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cinematic-accent/50 rounded-full blur-sm animate-ping" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <h3 className="text-3xl font-display tracking-wider font-bold mb-3 text-gray-200 relative z-10">Sẵn Sàng Phân Tích</h3>
      <p className="max-w-md text-center text-gray-400 leading-relaxed relative z-10 mb-8">
        Hệ thống AI sẽ phân tích từng chi tiết trong ảnh để khám phá công thức, giá trị dinh dưỡng và câu chuyện điện ảnh độc đáo.
      </p>
      
      <div className="grid grid-cols-2 gap-4 w-full max-w-md relative z-10">
        {placeholderFeatures.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-900/30 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-cinematic-accent/10 flex items-center justify-center shrink-0">
              <item.icon className="w-5 h-5 text-cinematic-accent" />
            </div>
            <span className="text-sm text-gray-300 font-medium">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotFoodResult: React.FC<{ description: string; onReset: () => void }> = ({ description, onReset }) => (
  <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-cinematic-gray/50 to-black rounded-3xl border border-gray-800 p-12 animate-slide-up">
    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-blue-500/10 to-gray-500/10 border border-gray-700 flex items-center justify-center shadow-2xl mb-8">
      <UtensilsCrossed className="w-16 h-16 text-blue-400" />
    </div>
    <h3 className="text-3xl font-display tracking-wider font-bold mb-3 text-white">Ống Kính Không Nhận Diện Được Món Ăn</h3>
    <p className="max-w-md text-gray-400 leading-relaxed mb-8">
      AI cho rằng hình ảnh này không phải là một món ăn. <br/>
      <strong>Lý do từ AI:</strong> "{description}"
    </p>
    <button
      onClick={onReset}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-cinematic-accent hover:bg-red-700 text-white font-bold rounded-xl transition-all hover:scale-105"
    >
      <RefreshCw className="w-4 h-4" />
      Thử Lại Với Ảnh Khác
    </button>
  </div>
);

const BlockedContentResult: React.FC<{ onReset: () => void }> = ({ onReset }) => (
  <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center bg-gradient-to-br from-cinematic-gray/50 to-black rounded-3xl border border-cinematic-accent/50 p-12 animate-slide-up">
    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cinematic-accent/20 to-red-900/20 border border-cinematic-accent/50 flex items-center justify-center shadow-2xl mb-8">
      <ShieldAlert className="w-16 h-16 text-cinematic-accent" />
    </div>
    <h3 className="text-3xl font-display tracking-wider font-bold mb-3 text-white">Nội Dung Không Phù Hợp</h3>
    <p className="max-w-md text-gray-400 leading-relaxed mb-8">
      Hình ảnh bạn tải lên đã bị chặn vì vi phạm chính sách an toàn của chúng tôi. Vui lòng sử dụng một hình ảnh khác.
    </p>
    <button
      onClick={onReset}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-cinematic-accent hover:bg-red-700 text-white font-bold rounded-xl transition-all hover:scale-105"
    >
      <RefreshCw className="w-4 h-4" />
      Thử Lại Với Ảnh Khác
    </button>
  </div>
);

// Overview Tab
const OverviewTab: React.FC<{ result: AnalyzeDishResponse }> = ({ result }) => {
  const stats = result.recipe ? [
    { icon: Clock, label: 'Chuẩn bị', value: `${result.recipe.prepTimeMinutes} phút`, color: 'text-blue-400' },
    { icon: Flame, label: 'Nấu', value: `${result.recipe.cookTimeMinutes} phút`, color: 'text-orange-400' },
    { icon: UtensilsCrossed, label: 'Khẩu phần', value: `${result.recipe.servings}`, color: 'text-green-400' },
    { icon: Sparkles, label: 'Độ khó', value: result.recipe.difficulty, color: 'text-yellow-400' }
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-cinematic-gray-light/50 rounded-xl p-4 border border-gray-800 hover:border-gray-700 transition-all group">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2 group-hover:scale-110 transition-transform`} />
              <div className="text-2xl font-bold text-white h-8 flex items-center">
                {stat.label === 'Độ khó' && typeof stat.value === 'number' ? (
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className={i < (stat.value as number) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                    ))}
                  </div>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-xs text-gray-500 uppercase font-medium tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      )}

      {result.movie_context && (
        <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-xl tracking-wider">
            <Film className="w-5 h-5 text-cinematic-gold" />
            Câu Chuyện Điện Ảnh
          </h4>
          <div className="space-y-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <p className="font-bold text-white text-lg">Phim: "{result.movie_context.title}"</p>
              <p className="text-gray-400 text-sm mt-2"><strong>Bối cảnh:</strong> {result.movie_context.scene_description}</p>
              <p className="text-gray-400 text-sm mt-2"><strong>Ý nghĩa:</strong> {result.movie_context.significance}</p>
            </div>
            {result.movie_context.wikipedia_link && (
              <a 
                href={result.movie_context.wikipedia_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-cinematic-gold/10 text-cinematic-gold font-bold text-sm rounded-lg border border-cinematic-gold/30 hover:bg-cinematic-gold/20 transition-colors"
              >
                <LinkIcon className="w-4 h-4" />
                Tìm hiểu thêm về phim
              </a>
            )}
          </div>
        </div>
      )}

      {result.cultural_significance && (
        <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2 text-xl tracking-wider">
            <BookOpen className="w-5 h-5 text-cinematic-gold" />
            Nguồn Gốc & Văn Hóa
          </h4>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">{result.cultural_significance}</p>
        </div>
      )}

      {(result.pairing_suggestions?.drinks?.length > 0 || result.pairing_suggestions?.sideDishes?.length > 0) && (
        <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-xl tracking-wider">
            <Wine className="w-5 h-5 text-cinematic-gold" />
            Gợi Ý Kết Hợp
          </h4>
          <div className="space-y-4">
            {result.pairing_suggestions?.drinks?.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wider">Đồ uống</p>
                <div className="flex flex-wrap gap-2">
                  {result.pairing_suggestions.drinks.map((item, i) => (
                    <span key={i} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg text-sm text-purple-200 border border-purple-500/30 font-medium">
                      <Wine className="w-4 h-4" /> {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {result.pairing_suggestions?.sideDishes?.length > 0 && (
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wider">Món ăn kèm</p>
                <div className="flex flex-wrap gap-2">
                  {result.pairing_suggestions.sideDishes.map((item, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-800/50 rounded-lg text-sm text-gray-300 border border-gray-700 font-medium hover:border-gray-600 transition-colors">{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {result.tips?.length > 0 && (
        <div className="bg-gradient-to-br from-cinematic-accent/10 to-cinematic-gold/10 border border-cinematic-accent/30 rounded-2xl p-6">
          <h4 className="text-cinematic-gold font-bold mb-4 flex items-center gap-2 text-xl tracking-wider">
            <ChefHat className="w-5 h-5" />
            Mẹo Từ AI Chef
          </h4>
          <ul className="space-y-3">
            {result.tips.map((tip, i) => (
              <li key={i} className="text-sm text-gray-300 flex gap-3 items-start group">
                <span className="text-cinematic-accent mt-1.5 w-2 h-2 rounded-full bg-cinematic-accent shrink-0 group-hover:scale-150 transition-transform"></span>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Recipe Tab
const RecipeTab: React.FC<{ recipe: RecipeDetail }> = ({ recipe }) => {
  if (!recipe) return <div className="text-center text-gray-400 py-10">Không có dữ liệu công thức.</div>;
  
  return (
    <div className="animate-fade-in">
      <div className="md:flex md:gap-8 lg:gap-12">
        {/* Cột nguyên liệu */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800 sticky top-4">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-xl tracking-wider">
              <UtensilsCrossed className="w-5 h-5 text-cinematic-gold" />
              Nguyên Liệu
            </h4>
            <p className="text-sm text-gray-400 mb-4">Dành cho {recipe.servings} khẩu phần.</p>
            <ul className="space-y-3">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-cinematic-accent shrink-0"></div>
                  <div>
                    <span className="font-medium text-white">{ing.name}</span>
                    <span className="text-gray-400 ml-1"> - {ing.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cột hướng dẫn */}
        <div className="md:w-2/3">
          <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
            <h4 className="text-white font-bold mb-6 flex items-center gap-2 text-xl tracking-wider">
              <ChefHat className="w-5 h-5 text-cinematic-gold" />
              Hướng Dẫn
            </h4>
            <div className="space-y-6">
              {recipe.instructions.map((inst) => (
                <div key={inst.step} className="flex gap-4 items-start group">
                  <div className="flex-shrink-0 mt-1 w-12 h-12 text-xl rounded-full bg-gradient-to-br from-cinematic-accent to-cinematic-gold flex items-center justify-center font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {inst.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-gray-300 leading-relaxed text-base">{inst.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Nutrition Tab
const NutritionTab: React.FC<{ nutrition: NutritionEstimate; healthTags: string[] }> = ({ nutrition, healthTags }) => {
  if (!nutrition) return <div className="text-center text-gray-400 py-10">Không có dữ liệu dinh dưỡng.</div>;
  
  const nutritionItems = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal', color: 'from-red-500 to-orange-500', icon: Flame },
    { label: 'Protein', value: nutrition.protein, unit: 'g', color: 'from-blue-500 to-cyan-500', icon: Zap },
    { label: 'Carbs', value: nutrition.carbs, unit: 'g', color: 'from-yellow-500 to-amber-500', icon: Wind },
    { label: 'Fat', value: nutrition.fat, unit: 'g', color: 'from-purple-500 to-pink-500', icon: Droplets }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nutritionItems.map((item) => (
          <div key={item.label} className="bg-cinematic-gray-light rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            <div className="relative z-10">
              <item.icon className={`w-6 h-6 mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
              <div className="text-3xl font-bold text-white mb-1">
                {item.value}
                <span className="text-sm text-gray-500 font-normal ml-1">{item.unit}</span>
              </div>
              <div className="text-xs uppercase text-gray-500 font-bold tracking-wider">{item.label}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl p-6">
        <h4 className="text-green-400 font-bold mb-4 flex items-center gap-2 text-xl tracking-wider">
          <Leaf className="w-5 h-5" />
          Thông Tin Sức Khỏe
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          Dựa trên hồ sơ dinh dưỡng, món ăn này cung cấp một nguồn cân bằng các chất dinh dưỡng đa lượng thiết yếu.
          {healthTags && healthTags.length > 0 && (
            <span> Nó đặc biệt phù hợp với các chế độ ăn: <span className="text-green-400 font-bold">{healthTags.join(', ')}</span>.</span>
          )}
        </p>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

type TabId = 'overview' | 'recipe' | 'nutrition';
const TABS = [
  { id: 'overview' as TabId, label: 'Tổng Quan', icon: Info },
  { id: 'recipe' as TabId, label: 'Công Thức', icon: ChefHat },
  { id: 'nutrition' as TabId, label: 'Dinh Dưỡng', icon: Sparkles }
];

interface AnalysisResultProps {
  result: AnalyzeDishResponse | null;
  loading: boolean;
  onReset: () => void;
  errorType: 'api_block' | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, loading, onReset, errorType }) => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  
  // Error states
  if (errorType === 'api_block') {
    return <BlockedContentResult onReset={onReset} />;
  }
  
  if (result && result.dish_name === "Không phải món ăn") {
    return <NotFoodResult description={result.description} onReset={onReset} />;
  }

  // Empty state
  if (!result && !loading) {
    return <ResultPlaceholder />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-gray-500 bg-gradient-to-br from-cinematic-gray/50 to-black rounded-3xl border border-gray-800 p-12">
        <div className="relative mb-4">
          <div className="w-24 h-24 border-4 border-gray-800 rounded-full"></div>
          <div className="w-24 h-24 border-4 border-cinematic-accent border-t-transparent rounded-full animate-spin absolute top-0"></div>
          <Sparkles className="w-10 h-10 text-cinematic-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>
        <p className="text-white font-bold text-lg mb-2 tracking-wider">AI Chef Đang Phân Tích...</p>
        <p className="text-gray-400 text-sm">Đang trích xuất bí mật ẩm thực</p>
      </div>
    );
  }

  // Result Display
  if (result) {
    return (
      <div className="bg-gradient-to-br from-cinematic-gray to-black rounded-3xl border border-gray-800 overflow-hidden animate-slide-up shadow-2xl relative">
        <div className="h-1 bg-gradient-to-r from-cinematic-accent via-cinematic-gold to-cinematic-accent relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
        </div>
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-gray-800 bg-gradient-to-b from-gray-900/50 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cinematic-accent/10 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-cinematic-gold mb-3">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">AI Nhận Diện Hoàn Tất</span>
            </div>
            
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-4xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 leading-tight mb-1 tracking-wide">
                  {result.dish_name}
                </h2>
                <div className="flex items-center gap-3 text-gray-400 text-sm mt-3">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4" />
                    <span className="text-white font-medium">{result.origin}</span>
                  </div>
                  {result.recipe && (
                    <>
                      <span className="text-gray-700">•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{result.recipe.prepTimeMinutes + result.recipe.cookTimeMinutes} phút</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              {result.health_tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-end max-w-xs">
                  {result.health_tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-900/30 text-green-400 text-xs font-bold border border-green-500/30 backdrop-blur-sm">
                      <Leaf className="w-3.5 h-3.5" /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm p-5 rounded-2xl border border-gray-800/50">
              <p className="text-gray-300 leading-relaxed italic text-sm md:text-base">"{result.description}"</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-800 bg-cinematic-gray/30 px-6 md:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-bold text-sm transition-all relative whitespace-nowrap ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cinematic-accent to-cinematic-gold"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6 md:p-8">
          {activeTab === 'overview' && <OverviewTab result={result} />}
          {activeTab === 'recipe' && <RecipeTab recipe={result.recipe} />}
          {activeTab === 'nutrition' && <NutritionTab nutrition={result.nutrition_estimate} healthTags={result.health_tags} />}
        </div>
        
        {/* Actions */}
        <div className="p-6 md:p-8 pt-0">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-4 text-base shadow-lg bg-gradient-to-r from-cinematic-gold via-amber-500 to-cinematic-gold text-black border-none font-bold hover:shadow-glow-gold transition-all relative overflow-hidden group rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              <span className="flex items-center justify-center gap-2 relative z-10">
                <ArrowRight className="w-5 h-5" />
                Lưu Công Thức
              </span>
            </button>
            <button onClick={onReset} className="px-6 py-4 bg-cinematic-gray-light border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-xl font-bold transition-all hover:scale-105">
              Phân Tích Món Khác
            </button>
          </div>
          <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-2">
            <Info className="w-3 h-3" />
            <span>Kết quả do AI tạo ra. Vui lòng xác minh thông tin quan trọng.</span>
          </p>
        </div>
      </div>
    );
  }
  
  return null;
};

export default AnalysisResult;