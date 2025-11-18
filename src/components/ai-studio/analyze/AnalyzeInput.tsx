import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, FileText, Info, Sparkles, Loader2, ArrowRight, X, 
  Clock, Globe, Zap, Image as ImageIcon, Film, Leaf, UtensilsCrossed, Wine, ChefHat, Flame, Droplets, Wind, Activity
} from 'lucide-react';
import Button from '../../ui/Button';
import apiClient from '../../../services/apiClient';
import toast from 'react-hot-toast';

// --- 1. INTERFACES (Match Backend) ---
interface NutritionEstimateDto {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

interface PairingSuggestionsDto {
  drinks: string[];
  sideDishes: string[];
}

interface RecipeIngredientDto {
  name: string;
  quantity: string;
  unit: string;
}

interface RecipeInstructionDto {
  step: number;
  description: string;
}

interface RecipeDetailDto {
  difficulty: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  ingredients: RecipeIngredientDto[];
  instructions: RecipeInstructionDto[];
}

interface AnalyzeDishResponse {
  dish_name: string;
  origin: string;
  description: string;
  nutrition_estimate: NutritionEstimateDto;
  health_tags: string[];
  pairing_suggestions: PairingSuggestionsDto;
  recipe: RecipeDetailDto;
  tips: string[];
  movie_context?: {
    title: string;
    scene_description: string;
    significance: string;
    wikipedia_link?: string;
  };
}

// --- 2. RESULT UI COMPONENTS (AnalyzeResult) ---
const OverviewTab: React.FC<{ result: AnalyzeDishResponse }> = ({ result }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
       <p className="text-gray-300 leading-relaxed text-lg italic">"{result.description}"</p>
    </div>
    {result.movie_context && (
      <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 rounded-2xl p-6 border border-purple-500/30">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2 text-xl tracking-wider">
            <Film className="w-5 h-5 text-cinematic-gold" /> Bối Cảnh Điện Ảnh
          </h4>
          <p className="text-white font-bold text-lg">🎬 {result.movie_context.title}</p>
          <p className="text-gray-300 text-sm italic mt-1">"{result.movie_context.scene_description}"</p>
      </div>
    )}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2"><Wine className="w-5 h-5 text-pink-500" /> Đồ uống</h4>
          <div className="flex flex-wrap gap-2">{result.pairing_suggestions?.drinks?.map((item, i) => <span key={i} className="px-3 py-1.5 bg-pink-500/10 text-pink-300 border border-pink-500/20 rounded-lg text-sm">{item}</span>)}</div>
      </div>
      <div className="bg-cinematic-gray-light/30 rounded-2xl p-6 border border-gray-800">
          <h4 className="text-white font-bold mb-4 flex items-center gap-2"><UtensilsCrossed className="w-5 h-5 text-orange-500" /> Ăn kèm</h4>
          <div className="flex flex-wrap gap-2">{result.pairing_suggestions?.sideDishes?.map((item, i) => <span key={i} className="px-3 py-1.5 bg-orange-500/10 text-orange-300 border border-orange-500/20 rounded-lg text-sm">{item}</span>)}</div>
      </div>
    </div>
  </div>
);

const RecipeTab: React.FC<{ recipe: RecipeDetailDto }> = ({ recipe }) => {
  if (!recipe) return <div className="text-center text-gray-400 py-10">No recipe data.</div>;
  return (
    <div className="animate-fade-in grid md:grid-cols-12 gap-8">
      <div className="md:col-span-5 lg:col-span-4 space-y-6">
        <div className="bg-cinematic-gray-light/50 rounded-2xl p-6 border border-gray-800 h-full">
          <h4 className="text-cinematic-gold font-bold mb-4 flex items-center gap-2 uppercase tracking-wider text-sm"><ChefHat className="w-4 h-4" /> Ingredients</h4>
          <ul className="space-y-3">{recipe.ingredients.map((ing, i) => <li key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gray-700/50"><span className="text-gray-200 font-medium text-sm">{ing.name}</span><span className="text-cinematic-accent text-sm font-bold">{ing.quantity}</span></li>)}</ul>
        </div>
      </div>
      <div className="md:col-span-7 lg:col-span-8 space-y-6">
        <div className="space-y-4">{recipe.instructions.map((inst) => <div key={inst.step} className="flex gap-4 group"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-cinematic-gray-light border border-gray-700 flex items-center justify-center font-bold text-white group-hover:border-cinematic-gold group-hover:text-cinematic-gold transition-colors">{inst.step}</div><div className="flex-1 pt-2"><p className="text-gray-300 leading-relaxed">{inst.description}</p></div></div>)}</div>
      </div>
    </div>
  );
}

const NutritionTab: React.FC<{ nutrition: NutritionEstimateDto }> = ({ nutrition }) => {
  if (!nutrition) return <div className="text-center text-gray-400 py-10">No nutrition data.</div>;
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
    {[
      { l: 'Calories', v: nutrition.calories, u: 'kcal', c: 'text-red-500', i: Flame },
      { l: 'Protein', v: nutrition.protein, u: 'g', c: 'text-blue-500', i: Zap },
      { l: 'Carbs', v: nutrition.carbs, u: 'g', c: 'text-yellow-500', i: Wind },
      { l: 'Fat', v: nutrition.fat, u: 'g', c: 'text-purple-500', i: Droplets }
    ].map((item) => (
      <div key={item.l} className="bg-cinematic-gray-light rounded-2xl p-6 text-center border border-gray-800 hover:border-gray-700 transition-all hover:scale-105">
        <item.i className={`w-6 h-6 mx-auto mb-3 ${item.c}`} />
        <div className="text-3xl font-bold text-white mb-1">{item.v}<span className="text-sm text-gray-400 font-normal ml-1">{item.u}</span></div>
        <div className={`text-xs font-bold uppercase tracking-wider ${item.c}`}>{item.l}</div>
      </div>
    ))}
    </div>
  );
}

const AnalyzeResult: React.FC<{ result: AnalyzeDishResponse; onReset: () => void }> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recipe' | 'nutrition'>('overview');
  const resultRef = useRef<HTMLDivElement>(null);
  const TABS = [
    { id: 'overview', label: 'Tổng Quan', icon: Info },
    { id: 'recipe', label: 'Công Thức', icon: ChefHat },
    { id: 'nutrition', label: 'Dinh Dưỡng', icon: Activity }
  ] as const;

  useEffect(() => {
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  if (!result) return null;

  return (
    <div ref={resultRef} className="bg-cinematic-gray rounded-3xl border border-gray-800 overflow-hidden shadow-2xl animate-slide-up">
      <div className="p-8 bg-gradient-to-r from-gray-900 to-cinematic-gray border-b border-gray-800">
          <div className="flex justify-between items-start">
              <div>
                  <div className="flex items-center gap-2 text-cinematic-gold mb-2"><Sparkles className="w-4 h-4" /> <span className="text-xs font-bold uppercase tracking-widest">AI Detected</span></div>
                  <h2 className="text-4xl font-display font-bold text-white mb-2">{result.dish_name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {result.origin}</span>
                      {result.recipe && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {result.recipe.prepTimeMinutes + result.recipe.cookTimeMinutes} phút</span>}
                  </div>
              </div>
              <div className="flex gap-2">{result.health_tags?.map((tag, i) => <span key={i} className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-bold rounded-full border border-green-500/20 flex items-center gap-1"><Leaf className="w-3 h-3" /> {tag}</span>)}</div>
          </div>
      </div>

      <div className="border-b border-gray-800 bg-black/20 px-8">
          <div className="flex gap-6">{TABS.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`flex items-center gap-2 py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id ? 'text-cinematic-accent border-cinematic-accent' : 'text-gray-500 border-transparent hover:text-white'}`}><tab.icon className="w-4 h-4" /> {tab.label}</button>)}</div>
      </div>

      <div className="p-8 min-h-[400px]">
          {activeTab === 'overview' && <OverviewTab result={result} />}
          {activeTab === 'recipe' && <RecipeTab recipe={result.recipe} />}
          {activeTab === 'nutrition' && <NutritionTab nutrition={result.nutrition_estimate} />}
      </div>

      <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-4">
           <button onClick={onReset} className="px-6 py-3 text-gray-400 hover:text-white font-medium text-sm">Phân tích món khác</button>
           <Button className="shadow-glow-gold">Lưu vào Sổ Tay <ArrowRight className="w-4 h-4 ml-2" /></Button>
      </div>
    </div>
  );
};

// --- 3. INPUT UI COMPONENTS (Your requested design) ---
const SystemStats: React.FC = () => {
  const stats = [
    { icon: Sparkles, label: 'Độ chính xác AI', value: '99.9%', color: 'from-yellow-500 to-orange-500' },
    { icon: Clock, label: 'Thời gian Phân tích', value: '< 5s', color: 'from-blue-500 to-cyan-500' },
    { icon: Globe, label: 'CSDL Món ăn', value: '1000+', color: 'from-green-500 to-emerald-500' }
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-cinematic-gold to-transparent opacity-50"></div>
        <h3 className="text-xs font-bold text-cinematic-gold uppercase tracking-[0.2em]">Thông số hệ thống</h3>
        <div className="flex-1 h-[2px] bg-gradient-to-r from-cinematic-gold via-transparent to-transparent opacity-50"></div>
      </div>
      <div className="grid gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="group relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl`}></div>
            <div className="relative flex items-center gap-4 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-gray-800 group-hover:border-gray-700 transition-all duration-300 group-hover:translate-x-1">
              <div className={`w-12 h-12 flex-shrink-0 rounded-lg bg-gradient-to-br ${stat.color} p-[2px]`}>
                <div className="w-full h-full rounded-lg bg-cinematic-gray flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-white font-bold text-xl tracking-tight">{stat.value}</div>
                <div className="text-gray-400 text-xs font-medium mt-0.5">{stat.label}</div>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-cinematic-accent/10 to-transparent rounded-xl border-l-4 border-cinematic-accent">
        <p className="text-xs text-gray-400 leading-relaxed"><span className="text-cinematic-gold font-semibold">Chef Gemini</span> sử dụng AI tiên tiến để nhận diện món ăn từ hình ảnh phim và cung cấp công thức chi tiết.</p>
      </div>
    </div>
  );
};

const QuickActionButton: React.FC<{ icon: string; label: string; onClick: () => void; disabled: boolean; }> = ({ icon, label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="group flex items-center justify-center lg:justify-start gap-1.5 lg:gap-2 px-3 lg:px-4 py-2 lg:py-2.5 bg-gradient-to-br from-gray-800/80 to-gray-900/80 hover:from-gray-700 hover:to-gray-800 text-gray-300 hover:text-white text-xs lg:text-sm rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:scale-105 active:scale-95">
    <span className="text-sm lg:text-base group-hover:scale-110 transition-transform">{icon}</span>
    <span className="font-medium truncate">{label}</span>
  </button>
);

// --- 4. MAIN COMPONENT ---
export default function AnalyzeDish() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDishResponse | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const QUICK_CONTEXT_TAGS = [
    { icon: '🎬', label: 'Tên phim', value: 'Tên phim' },
    { icon: '👨‍🍳', label: 'Tên món ăn', value: 'Tên món ăn' },
    { icon: '🌍', label: 'Xuất xứ', value: 'Xuất xứ' },
    { icon: '🎭', label: 'Tên nhân vật', value: 'Tên nhân vật' }
  ];

  const onFileChange = (selectedFile: File) => {
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (ev) => setImage(ev.target?.result as string);
    reader.readAsDataURL(selectedFile);
    setResult(null);
  };

  const handleDrag = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); if (e.type === "dragenter" || e.type === "dragover") setDragActive(true); else if (e.type === "dragleave") setDragActive(false); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files?.[0]) onFileChange(e.dataTransfer.files[0]); };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) onFileChange(e.target.files[0]); };

  const onReset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setContext('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const onAnalyze = async () => {
    if (!file) {
      toast.error("Vui lòng chọn ảnh trước!");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    if (context.trim()) formData.append('context', context);

    try {
      const response = await apiClient.post<AnalyzeDishResponse>('/recipes/ai/analyze-dish', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setResult(response.data);
      toast.success("Phân tích thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Không thể phân tích. Thử ảnh khác nhé!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 space-y-8">
      {result ? (
        <AnalyzeResult result={result} onReset={onReset} />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-10 xl:gap-12 items-center bg-gradient-to-br from-cinematic-gray-light via-cinematic-gray to-cinematic-gray-light rounded-2xl border border-gray-800 p-6 lg:p-10 xl:p-12 shadow-2xl min-h-[550px] lg:min-h-[600px] xl:min-h-[650px] relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(220,38,38,0.1),transparent_50%)] pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cinematic-accent/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Left Column: Image Upload */}
          <div className="lg:col-span-3 relative z-10 flex justify-center items-center h-full py-8 lg:py-0">
            <div 
              className={`relative flex items-center justify-center border-2 border-dashed transition-all duration-500 ease-out group
                ${dragActive ? 'border-cinematic-accent bg-cinematic-accent/10 scale-105 shadow-xl shadow-cinematic-accent/20' : 'border-gray-700 hover:border-gray-600 bg-black/30 hover:bg-black/40'}
                ${image ? 'w-full max-w-md lg:max-w-lg aspect-[4/3] rounded-2xl' : 'w-72 h-72 sm:w-80 sm:h-80 lg:w-[22rem] lg:h-[22rem] xl:w-96 xl:h-96 rounded-full'}`}
              onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-5 rounded-2xl">
                    <div className="flex items-center gap-3 text-white bg-black/70 px-4 py-2.5 rounded-xl backdrop-blur-md border border-gray-700 max-w-[65%]">
                      <ImageIcon className="w-4 h-4 text-cinematic-gold flex-shrink-0" />
                      <span className="text-sm font-medium truncate">{file?.name}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); onReset(); }} className="z-20 p-3 bg-gradient-to-br from-cinematic-accent to-red-700 text-white rounded-xl hover:from-red-700 hover:to-cinematic-accent transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110 active:scale-95">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center pointer-events-none px-4 py-8 lg:px-6 flex flex-col items-center justify-center">
                  <div className={`relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 mx-auto flex items-center justify-center mb-4 lg:mb-6 transition-all duration-300 ${dragActive ? 'scale-110' : 'group-hover:scale-105'}`}>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cinematic-accent via-red-600 to-red-700 opacity-20 blur-2xl animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cinematic-accent to-red-700 opacity-80 blur-xl"></div>
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 text-white relative z-10 drop-shadow-lg" />
                  </div>
                  <h4 className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-2 tracking-tight">{dragActive ? '✨ Thả ảnh vào đây' : 'Tải Ảnh Lên'}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm lg:text-base mb-3 lg:mb-4">Kéo & thả hoặc nhấp để chọn</p>
                  <div className="flex items-center justify-center gap-2 text-xs lg:text-sm text-gray-500"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span>JPG, PNG, WEBP</span></div>
                </div>
              )}
              <input ref={inputRef} type="file" hidden onChange={handleInputChange} accept="image/*" />
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-2 relative z-10 h-full flex flex-col justify-center py-6 lg:py-0">
            <div className={`transition-all duration-700 ease-out ${image ? 'opacity-0 -translate-y-8 pointer-events-none absolute' : 'opacity-100 translate-y-0'}`}>
              <SystemStats />
            </div>

            <div className={`transition-all duration-700 ease-out ${image ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none absolute'}`}>
              <div className="flex flex-col h-full justify-between space-y-5 lg:space-y-6">
                <div className="space-y-3 lg:space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-cinematic-accent to-transparent opacity-50"></div>
                    <h3 className="text-xs lg:text-sm font-bold text-cinematic-accent uppercase tracking-[0.2em] whitespace-nowrap">Bối cảnh phim</h3>
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-cinematic-accent via-transparent to-transparent opacity-50"></div>
                  </div>
                  <div className="relative group">
                    <textarea value={context} onChange={(e) => setContext(e.target.value)} disabled={loading} placeholder="VD: Món Ratatouille trong phim Chuột Đầu Bếp..." className="w-full bg-black/50 backdrop-blur-sm border-2 border-gray-800 group-hover:border-gray-700 focus:border-cinematic-accent rounded-xl p-3 lg:p-4 pr-12 text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-cinematic-accent/20 transition-all text-xs lg:text-sm resize-none h-28 lg:h-32 xl:h-36 leading-relaxed" maxLength={2000} />
                    <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 flex items-center gap-2"><span className="text-xs text-gray-600">{context.length}/2000</span><FileText className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-600" /></div>
                  </div>
                  <div className="pt-3 lg:pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-2 mb-2 lg:mb-3"><Info className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-cinematic-gold" /><p className="text-xs lg:text-sm text-gray-400 font-medium">Gợi ý nhanh</p></div>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_CONTEXT_TAGS.map((tag) => (
                        <QuickActionButton key={tag.value} icon={tag.icon} label={tag.label} disabled={loading} onClick={() => { if (!context.includes(tag.value)) setContext(context ? `${context}, ${tag.value}: ` : `${tag.value}: `); }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <button onClick={onAnalyze} disabled={!image || loading} className="w-full py-4 lg:py-5 text-base lg:text-lg font-bold bg-gradient-to-r from-cinematic-accent via-red-600 to-cinematic-accent bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-xl hover:shadow-2xl hover:shadow-cinematic-accent/30 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group rounded-xl border border-red-500/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                    {loading ? (
                      <span className="flex items-center justify-center gap-2 lg:gap-3 relative z-10"><Loader2 className="w-5 h-5 lg:w-6 lg:h-6 animate-spin" /><span className="tracking-wide">Đang phân tích...</span></span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 lg:gap-3 relative z-10"><Sparkles className="w-5 h-5 lg:w-6 lg:h-6 group-hover:rotate-12 transition-transform" /><span className="tracking-wide">Phân Tích Với AI</span><ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" /></span>
                    )}
                  </button>
                  <p className="text-center text-xs lg:text-sm text-gray-500 mt-2 lg:mt-3 flex items-center justify-center gap-2"><Zap className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-yellow-500" /> Powered by Gemini AI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}