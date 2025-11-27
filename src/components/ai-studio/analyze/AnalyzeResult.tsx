import React, { useState } from 'react';
import { 
  Globe, UtensilsCrossed, Wine, Clock, Flame, Star, ChefHat, Leaf,
  Film, ChevronRight, RefreshCw, Sparkles, Camera
} from 'lucide-react';
import { AnalyzeDishResponse, NutritionEstimate, AIRecipeDetail } from '../../../types';
import CinematicError from './CinematicError';

// ============================================================================
// 1. UI HELPER COMPONENTS
// ============================================================================

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-8 border-b border-white/10 pb-4">
    {subtitle && <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cine-gold to-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-2 font-sans">{subtitle}</span>}
    <h3 className="font-serif text-3xl md:text-4xl text-white tracking-tight drop-shadow-lg">{title}</h3>
  </div>
);

interface InfoCardProps {
  label: string;
  value: string | number;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  subtext?: string;
}

const InfoCard = ({ label, value, icon: Icon, subtext }: InfoCardProps) => (
  <div className="bg-glass-gradient backdrop-blur-md p-6 border border-white/10 hover:border-cine-gold/50 hover:shadow-gold-glow transition-all duration-500 group h-full rounded-xl relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500">
        <Icon className="w-16 h-16 text-white" />
    </div>
    <div className="flex items-start justify-between mb-4 relative z-10">
      <span className="text-[10px] text-cine-muted uppercase tracking-widest font-bold font-sans group-hover:text-cine-gold transition-colors">{label}</span>
      <Icon className="w-4 h-4 text-cine-gold" />
    </div>
    <div className="font-serif text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 font-medium mb-1 relative z-10">{value}</div>
    {subtext && <div className="text-xs text-gray-500 font-sans relative z-10">{subtext}</div>}
  </div>
);

const Tag: React.FC<{ text: string; type?: 'default' | 'gold' }> = ({ text, type = 'default' }) => (
  <span className={`
    inline-flex items-center px-4 py-2 text-xs font-medium border rounded-full font-sans transition-all duration-300
    ${type === 'gold' 
      ? 'bg-cine-gold/5 text-cine-gold border-cine-gold/30 hover:bg-cine-gold/20 hover:shadow-gold-glow' 
      : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:bg-white/10'}
  `}>
    {text}
  </span>
);

// ============================================================================
// 2. TAB CONTENTS
// ============================================================================

const OverviewTab = ({ result }: { result: AnalyzeDishResponse }) => (
  <div className="animate-fade-in space-y-16">
    
    {/* Cinematic Context Card */}
    <div className="bg-gradient-to-br from-[#111] to-[#050505] p-8 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-cinema group">
        {/* Background Glow Effect */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-cine-gold/5 rounded-full blur-[100px] group-hover:bg-cine-gold/10 transition-colors duration-700"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cine-burgundy/10 rounded-full blur-[100px] group-hover:bg-cine-burgundy/20 transition-colors duration-700"></div>

        <div className="relative z-10">
            <h4 className="text-cine-gold text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 font-sans">
                <Film className="w-4 h-4" /> Bối Cảnh Phim
            </h4>
            <h2 className="font-serif text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400 mb-8 leading-tight">
                {result.movie_context.title}
            </h2>
            
            <div className="flex flex-col gap-6 pl-8 border-l-2 border-cine-gold/30">
                <p className="font-serif text-xl md:text-2xl text-gray-300 italic leading-relaxed">
                    "{result.movie_context.scene_description}"
                </p>
                <p className="font-sans text-sm text-gray-400 leading-loose max-w-3xl">
                  <strong className="text-cine-gold block mb-2 uppercase text-[10px] tracking-widest">Ý Nghĩa Cảnh Quay</strong> 
                  {result.movie_context.significance}
                </p>
            </div>

            {result.movie_context.wikipedia_link && (
                <div className="mt-10">
                  <a href={result.movie_context.wikipedia_link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-cine-gold font-sans uppercase tracking-wider border-b border-transparent hover:border-cine-gold pb-1 transition-all group">
                    Tra cứu Wikipedia <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
            )}
        </div>
    </div>

    {/* Cultural & Pairing Section */}
    <div>
      <SectionTitle title="Hồ Sơ Văn Hóa" subtitle="Cultural Profile" />
      <div className="grid md:grid-cols-2 gap-12">
        
        <div className="space-y-6">
          <p className="text-gray-300 font-sans text-lg leading-loose text-justify first-letter:text-6xl first-letter:font-serif first-letter:text-cine-gold first-letter:mr-4 first-letter:float-left">
            {result.cultural_significance}
          </p>
          <div className="flex items-center gap-4 pt-8 border-t border-white/10">
             <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Globe className="w-6 h-6 text-gray-400" />
             </div>
             <div>
               <div className="text-[10px] text-gray-500 uppercase font-bold font-sans mb-1">Nguồn Gốc</div>
               <div className="text-white font-serif text-2xl">{result.origin}</div>
             </div>
          </div>
        </div>

        <div className="bg-[#0A0A0A] p-10 border border-white/10 rounded-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-40 h-40 bg-cine-gold/5 rounded-full blur-3xl group-hover:bg-cine-gold/10 transition-colors duration-700"></div>
           
           <h4 className="font-serif text-2xl text-white mb-8 pb-4 border-b border-white/10 relative z-10">Thực Đơn Gợi Ý</h4>
           
           <div className="space-y-10 relative z-10">
             <div>
               <div className="flex items-center gap-3 mb-4">
                 <Wine className="w-5 h-5 text-cine-gold" />
                 <span className="text-xs font-bold text-gray-400 uppercase font-sans tracking-wider">Đồ Uống</span>
               </div>
               <div className="flex flex-wrap gap-3">
                 {result.pairing_suggestions.drinks.map((item, i) => <Tag key={i} text={item} />)}
               </div>
             </div>

             <div>
               <div className="flex items-center gap-3 mb-4">
                 <UtensilsCrossed className="w-5 h-5 text-cine-gold" />
                 <span className="text-xs font-bold text-gray-400 uppercase font-sans tracking-wider">Ăn Kèm</span>
               </div>
               <div className="flex flex-wrap gap-3">
                 {result.pairing_suggestions.side_dishes.map((item, i) => <Tag key={i} text={item} />)}
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>

    {/* Quick Stats Row */}
    {result.recipe && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <InfoCard label="Độ Khó" value={`${result.recipe.difficulty}/5`} icon={Star} subtext="Sao" />
        {/* Lưu ý: Sử dụng đúng tên biến từ Backend */}
        <InfoCard label="Chuẩn Bị" value={`${result.recipe.prep_time_minutes}'`} icon={Clock} subtext="Phút" />
        <InfoCard label="Nấu" value={`${result.recipe.cook_time_minutes}'`} icon={Flame} subtext="Phút" />
        <InfoCard label="Khẩu Phần" value={result.recipe.servings} icon={ChefHat} subtext="Người" />
      </div>
    )}
  </div>
);

const RecipeTab = ({ recipe }: { recipe: AIRecipeDetail }) => (
  <div className="animate-fade-in grid lg:grid-cols-12 gap-12">
     {/* Ingredients Column */}
     <div className="lg:col-span-4">
       <div className="bg-[#111] p-8 border-t-4 border-cine-gold rounded-b-xl shadow-cinema sticky top-32">
         <h4 className="font-serif text-3xl text-white mb-8">Nguyên Liệu</h4>
         <ul className="space-y-6 font-sans">
           {recipe.ingredients.map((ing, i) => (
             <li key={i} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-0 last:pb-0 group">
               <div className="w-2 h-2 rounded-full bg-cine-gold mt-2 shrink-0 group-hover:scale-150 group-hover:shadow-gold-glow transition-all duration-300"></div>
               <div className="flex-1">
                 <span className="text-white font-medium block text-lg group-hover:text-cine-gold transition-colors duration-300">{ing.name}</span>
                 <span className="text-sm text-gray-500">{ing.quantity} {ing.unit}</span>
               </div>
             </li>
           ))}
         </ul>
       </div>
     </div>

     {/* Instructions Column */}
     <div className="lg:col-span-8">
       <h4 className="font-serif text-3xl text-white mb-10 pl-4 border-l-4 border-cine-gold">Quy Trình Chế Biến</h4>
       <div className="space-y-16 pl-6 border-l border-white/10 ml-3">
         {recipe.instructions.map((inst) => (
           <div key={inst.step} className="relative pl-12 group">
             <span className="absolute -left-[25px] top-0 w-12 h-12 bg-[#080808] border border-gray-800 text-gray-500 rounded-full flex items-center justify-center font-serif text-xl shadow-xl group-hover:border-cine-gold group-hover:text-white group-hover:scale-110 group-hover:shadow-gold-glow transition-all duration-300 z-10">
               {inst.step}
             </span>
             <p className="text-gray-300 text-xl font-sans font-light leading-relaxed group-hover:text-white transition-colors duration-300">
               {inst.description}
             </p>
           </div>
         ))}
       </div>
     </div>
  </div>
);

const NutritionTab = ({ nutrition, healthTags, tips }: { nutrition: NutritionEstimate, healthTags: string[], tips: string[] }) => (
  <div className="animate-fade-in max-w-5xl mx-auto">
     {/* Nutrition Grid */}
     <div className="mb-16">
       <SectionTitle title="Bảng Dinh Dưỡng" subtitle="Nutritional Facts" />
       <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 overflow-hidden rounded-2xl shadow-cinema">
         {[
           { label: 'Calories', val: nutrition.calories, unit: 'kcal', color: 'from-white to-gray-300' },
           { label: 'Protein', val: nutrition.protein_g, unit: 'g', color: 'from-blue-200 to-blue-400' },
           { label: 'Carbs', val: nutrition.carbs_g, unit: 'g', color: 'from-amber-200 to-amber-400' },
           { label: 'Fat', val: nutrition.fat_g, unit: 'g', color: 'from-red-200 to-red-400' },
         ].map((stat, i) => (
           <div key={i} className="bg-[#0F0F0F] p-10 text-center hover:bg-[#151515] transition-colors duration-300 group relative">
             <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className={`text-4xl md:text-6xl font-serif mb-2 text-transparent bg-clip-text bg-gradient-to-b ${stat.color}`}>{stat.val}</div>
             <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold font-sans group-hover:text-cine-gold transition-colors">{stat.label} <span className="normal-case text-gray-600">({stat.unit})</span></div>
           </div>
         ))}
       </div>
     </div>

     {/* Health Tags & Tips */}
     <div className="grid md:grid-cols-2 gap-8">
       <div className="bg-[#0F0F0F] p-10 border border-white/10 rounded-2xl hover:border-green-500/30 transition-all duration-500">
         <h4 className="flex items-center gap-3 font-serif text-2xl text-white mb-8">
           <Leaf className="w-6 h-6 text-green-500" /> Phù Hợp Với
         </h4>
         <div className="flex flex-wrap gap-3">
           {healthTags.map((tag, i) => <Tag key={i} text={tag} type="gold" />)}
         </div>
       </div>

       <div className="bg-[#0F0F0F] p-10 border border-white/10 rounded-2xl hover:border-cine-gold/30 hover:shadow-gold-glow transition-all duration-500">
         <h4 className="flex items-center gap-3 font-serif text-2xl text-white mb-8">
           <Sparkles className="w-6 h-6 text-cine-gold" /> Lời Khuyên Của Chef
         </h4>
         <ul className="space-y-5">
           {tips.map((tip, i) => (
             <li key={i} className="flex items-start gap-4 text-base text-gray-400 italic font-serif leading-relaxed">
               <span className="text-cine-gold mt-1.5 text-xl">•</span> {tip}
             </li>
           ))}
         </ul>
       </div>
     </div>
  </div>
);

// ============================================================================
// 3. MAIN COMPONENT (WITH HERO IMAGE)
// ============================================================================

// Thêm prop imageUrl vào đây
const AnalyzeResult = ({ data, imageUrl, onReset }: { data: AnalyzeDishResponse; imageUrl?: string | null; onReset: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recipe' | 'nutrition'>('overview');

  // Kiểm tra lỗi "Không phải món ăn"
  if (data.dish_name.toLowerCase().includes("không phải món ăn") || data.dish_name === "Unknown Dish") {
    return (
      <CinematicError 
        type="not_food"
        title="Không Thể Nhận Diện"
        description={data.description || "Hình ảnh này có vẻ không phải là một món ăn. Hãy thử lại với một góc chụp khác đậm chất điện ảnh hơn!"}
        onReset={onReset}
      />
    );
  }

  return (
    <div className="bg-cine-bg text-gray-200 pb-24 border-t border-white/10 relative animate-fade-in rounded-b-3xl">
        
        {/* HERO BANNER - ẢNH NỀN CỦA MÓN ĂN */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden group border-b border-white/10">
            
            {/* 1. Lớp Ảnh Nền */}
            {imageUrl ? (
                <div className="absolute inset-0">
                    <img 
                        src={imageUrl} 
                        alt="Dish Hero" 
                        className="w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-[20s] ease-linear"
                    />
                    {/* Hiệu ứng nhiễu phim */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                    
                    {/* Gradient Overlay để chữ dễ đọc */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-transparent to-[#050505]/90"></div>
                </div>
            ) : (
                // Fallback nếu không có ảnh (Hiệu ứng Aurora cũ)
                <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#050505] animate-aurora bg-[length:400%_400%]">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
                </div>
            )}

            {/* 2. Nội Dung Text */}
            <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-6 text-center">
                
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md animate-slide-up shadow-lg">
                   <Camera className="w-3 h-3 text-cine-gold" />
                   <span className="text-[10px] font-bold tracking-[0.3em] text-cine-gold uppercase font-sans">
                     Kết Quả Phân Tích
                   </span>
                </div>

                {/* Tên Món Ăn */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 leading-tight drop-shadow-2xl animate-slide-up shadow-black">
                    {data.dish_name}
                </h1>

                {/* Mô Tả */}
                <p className="text-lg md:text-xl font-light font-sans text-gray-200/90 max-w-4xl mx-auto leading-relaxed italic drop-shadow-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    "{data.description}"
                </p>
            </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="sticky top-0 bg-cine-bg/95 backdrop-blur-xl z-40 border-b border-white/10 shadow-2xl">
            <div className="flex justify-center max-w-4xl mx-auto">
                {[
                    { id: 'overview', label: 'Hồ Sơ Chi Tiết' },
                    { id: 'recipe', label: 'Kịch Bản Bếp' },
                    { id: 'nutrition', label: 'Dinh Dưỡng' }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as 'overview' | 'recipe' | 'nutrition')}
                        className={`
                          flex-1 py-6 text-xs md:text-sm font-bold tracking-[0.2em] uppercase transition-all border-b-2 font-sans
                          ${activeTab === tab.id 
                            ? 'text-cine-gold border-cine-gold bg-white/[0.03]' 
                            : 'text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/[0.01]'}
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-7xl mx-auto px-6 py-24 min-h-[600px]">
            {activeTab === 'overview' && <OverviewTab result={data} />}
            {activeTab === 'recipe' && <RecipeTab recipe={data.recipe} />}
            {activeTab === 'nutrition' && <NutritionTab nutrition={data.nutrition_estimate} healthTags={data.health_tags} tips={data.tips} />}
        </div>

        {/* FOOTER ACTION */}
        <div className="text-center border-t border-white/10 pt-16">
             <button onClick={onReset} className="text-gray-500 hover:text-cine-gold transition-all text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto group font-bold font-sans">
                 <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> 
                 PHÂN TÍCH CẢNH KHÁC
             </button>
        </div>

    </div>
  );
};

export default AnalyzeResult;