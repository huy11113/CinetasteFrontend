import React, { useState } from 'react';
import { 
  Globe, UtensilsCrossed, Wine, Clock, Flame, Star, ChefHat, Leaf,
  Film, ChevronRight, RefreshCw, Sparkles
} from 'lucide-react';
import { AnalyzeDishResponse, NutritionEstimate, RecipeDetail } from '../../../types';

// --- UI COMPONENTS ---
const InfoCard = ({ label, value, icon: Icon, subtext }: any) => (
  <div className="bg-glass-gradient backdrop-blur-md p-6 border border-white/10 hover:border-cine-gold/50 hover:shadow-gold-glow transition-all duration-500 group h-full rounded-xl relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500"><Icon className="w-16 h-16 text-white" /></div>
    <div className="flex items-start justify-between mb-4 relative z-10">
      <span className="text-[10px] text-cine-muted uppercase tracking-widest font-bold font-sans group-hover:text-cine-gold transition-colors">{label}</span>
      <Icon className="w-4 h-4 text-cine-gold" />
    </div>
    <div className="font-serif text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 font-medium mb-1 relative z-10">{value}</div>
    {subtext && <div className="text-xs text-gray-500 font-sans relative z-10">{subtext}</div>}
  </div>
);

const Tag: React.FC<{ text: string; type?: 'default' | 'gold' }> = ({ text, type = 'default' }) => (
  <span className={`inline-flex items-center px-4 py-2 text-xs font-medium border rounded-full font-sans transition-all duration-300 ${type === 'gold' ? 'bg-cine-gold/5 text-cine-gold border-cine-gold/30 hover:bg-cine-gold/20' : 'bg-white/5 text-gray-300 border-white/10 hover:border-white/30'}`}>
    {text}
  </span>
);

// --- TAB CONTENT ---
const OverviewTab = ({ result }: { result: AnalyzeDishResponse }) => (
  <div className="animate-fade-in space-y-12">
    {/* Cinematic Context */}
    <div className="bg-gradient-to-br from-[#111] to-[#050505] p-8 md:p-12 rounded-[2rem] border border-white/10 relative overflow-hidden shadow-cinema group">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-cine-gold/5 rounded-full blur-[100px] group-hover:bg-cine-gold/10 transition-colors duration-700"></div>
        <div className="relative z-10">
            <h4 className="text-cine-gold text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2 font-sans"><Film className="w-4 h-4" /> Bối Cảnh Phim</h4>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">{result.movie_context.title}</h2>
            
            <div className="flex flex-col gap-6 pl-6 border-l-2 border-cine-gold/30">
                <p className="font-serif text-xl text-gray-300 italic leading-relaxed">"{result.movie_context.scene_description}"</p>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  <strong className="text-cine-gold uppercase text-[10px] tracking-widest mr-2">Ý Nghĩa:</strong> 
                  {result.movie_context.significance}
                </p>
            </div>

            {result.movie_context.wikipedia_link && (
                <div className="mt-8">
                  <a href={result.movie_context.wikipedia_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-cine-gold font-sans uppercase tracking-wider border-b border-transparent hover:border-cine-gold pb-1 transition-all">
                    Tra cứu Wikipedia <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
            )}
        </div>
    </div>

    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-6">
        <h3 className="font-serif text-2xl text-white border-b border-white/10 pb-4">Hồ Sơ Văn Hóa</h3>
        <p className="text-gray-400 font-sans leading-loose text-justify">{result.cultural_significance}</p>
        <div className="flex items-center gap-4 pt-4">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Globe className="w-5 h-5 text-cine-gold" /></div>
            <div><div className="text-[10px] text-gray-500 uppercase font-bold mb-1">Nguồn Gốc</div><div className="text-white font-serif text-xl">{result.origin}</div></div>
        </div>
      </div>

      <div className="bg-[#0A0A0A] p-8 border border-white/10 rounded-2xl relative overflow-hidden">
          <h3 className="font-serif text-2xl text-white border-b border-white/10 pb-4 mb-6">Gợi Ý Thưởng Thức</h3>
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3"><Wine className="w-4 h-4 text-cine-gold" /><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Đồ Uống</span></div>
              <div className="flex flex-wrap gap-2">{result.pairing_suggestions.drinks.map((item, i) => <Tag key={i} text={item} />)}</div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3"><UtensilsCrossed className="w-4 h-4 text-cine-gold" /><span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ăn Kèm</span></div>
              <div className="flex flex-wrap gap-2">{result.pairing_suggestions.side_dishes.map((item, i) => <Tag key={i} text={item} />)}</div>
            </div>
          </div>
      </div>
    </div>

    {result.recipe && (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
        <InfoCard label="Độ Khó" value={`${result.recipe.difficulty}/5`} icon={Star} />
        {/* Sử dụng đúng tên biến snake_case từ Backend */}
        <InfoCard label="Chuẩn Bị" value={`${result.recipe.prep_time_minutes}'`} icon={Clock} />
        <InfoCard label="Nấu" value={`${result.recipe.cook_time_minutes}'`} icon={Flame} />
        <InfoCard label="Khẩu Phần" value={result.recipe.servings} icon={ChefHat} subtext="Người" />
      </div>
    )}
  </div>
);

const RecipeTab = ({ recipe }: { recipe: RecipeDetail }) => (
  <div className="animate-fade-in grid lg:grid-cols-12 gap-12">
     <div className="lg:col-span-4">
       <div className="bg-[#111] p-8 border-t-4 border-cine-gold rounded-b-xl shadow-cinema sticky top-8">
         <h4 className="font-serif text-2xl text-white mb-6">Nguyên Liệu</h4>
         <ul className="space-y-4 font-sans">
           {recipe.ingredients.map((ing, i) => (
             <li key={i} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0">
               <span className="text-gray-300">{ing.name}</span>
               <span className="text-cine-gold text-sm font-mono bg-cine-gold/10 px-2 py-1 rounded">{ing.quantity} {ing.unit}</span>
             </li>
           ))}
         </ul>
       </div>
     </div>
     <div className="lg:col-span-8 space-y-8">
       <h4 className="font-serif text-3xl text-white mb-8 pl-4 border-l-4 border-cine-gold">Quy Trình Chế Biến</h4>
       {recipe.instructions.map((inst) => (
         <div key={inst.step} className="flex gap-6 group">
           <div className="flex-shrink-0 w-12 h-12 bg-[#1a1a1a] text-cine-gold border border-cine-gold/20 rounded-full flex items-center justify-center font-display text-xl group-hover:bg-cine-gold group-hover:text-black transition-all duration-300">{inst.step}</div>
           <p className="text-gray-400 text-lg font-light leading-relaxed pt-2 group-hover:text-gray-200 transition-colors">{inst.description}</p>
         </div>
       ))}
     </div>
  </div>
);

const NutritionTab = ({ nutrition, healthTags, tips }: { nutrition: NutritionEstimate, healthTags: string[], tips: string[] }) => (
  <div className="animate-fade-in max-w-4xl mx-auto space-y-12">
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Calories', val: nutrition.calories, unit: 'kcal', color: 'text-white' },
           { label: 'Protein', val: nutrition.protein_g, unit: 'g', color: 'text-blue-400' },
           { label: 'Carbs', val: nutrition.carbs_g, unit: 'g', color: 'text-green-400' },
           { label: 'Fat', val: nutrition.fat_g, unit: 'g', color: 'text-red-400' },
         ].map((stat, i) => (
           <div key={i} className="bg-[#0F0F0F] p-6 rounded-xl border border-white/10 text-center">
             <div className={`text-4xl font-serif mb-2 ${stat.color}`}>{stat.val}</div>
             <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{stat.label} ({stat.unit})</div>
           </div>
         ))}
     </div>

     <div className="grid md:grid-cols-2 gap-8">
       <div className="bg-[#0F0F0F] p-8 border border-white/10 rounded-2xl">
         <h4 className="flex items-center gap-3 font-serif text-xl text-white mb-6"><Leaf className="w-5 h-5 text-green-500" /> Phù Hợp Với</h4>
         <div className="flex flex-wrap gap-2">{healthTags.map((tag, i) => <Tag key={i} text={tag} type="gold" />)}</div>
       </div>
       <div className="bg-[#0F0F0F] p-8 border border-white/10 rounded-2xl">
         <h4 className="flex items-center gap-3 font-serif text-xl text-white mb-6"><Sparkles className="w-5 h-5 text-cine-gold" /> Chef Tips</h4>
         <ul className="space-y-4">
           {tips.map((tip, i) => (
             <li key={i} className="flex items-start gap-3 text-gray-400 italic text-sm">
               <span className="text-cine-gold mt-1">•</span> {tip}
             </li>
           ))}
         </ul>
       </div>
     </div>
  </div>
);

// --- MAIN COMPONENT ---
const AnalyzeResult = ({ data, onReset }: { data: AnalyzeDishResponse, onReset: () => void }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'recipe' | 'nutrition'>('overview');

  return (
    <div className="bg-cine-bg text-gray-200 pb-24 border-t border-white/10 relative animate-fade-in rounded-b-3xl">
        {/* Hero Header */}
        <div className="py-24 px-6 text-center bg-cine-bg relative overflow-hidden border-b border-white/5">
            <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
            <div className="relative z-10">
                <span className="text-cine-gold text-xs font-bold uppercase tracking-[0.5em] mb-6 block opacity-80">Kết Quả Phân Tích</span>
                <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-2xl">{data.dish_name}</h1>
                <p className="text-lg md:text-xl font-light font-sans text-gray-400 max-w-3xl mx-auto leading-relaxed italic">"{data.description}"</p>
            </div>
        </div>

        {/* Tabs */}
        <div className="sticky top-0 bg-cine-bg/95 backdrop-blur-xl z-40 border-b border-white/10 shadow-2xl mb-12">
            <div className="flex justify-center max-w-3xl mx-auto">
                {[{ id: 'overview', label: 'Hồ Sơ' }, { id: 'recipe', label: 'Công Thức' }, { id: 'nutrition', label: 'Dinh Dưỡng' }].map((tab) => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} 
                      className={`flex-1 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-all border-b-2 ${activeTab === tab.id ? 'text-cine-gold border-cine-gold bg-white/5' : 'text-gray-500 border-transparent hover:text-gray-300'}`}
                    >
                      {tab.label}
                    </button>
                ))}
            </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto px-6 min-h-[600px]">
            {activeTab === 'overview' && <OverviewTab result={data} />}
            {activeTab === 'recipe' && <RecipeTab recipe={data.recipe} />}
            {activeTab === 'nutrition' && <NutritionTab nutrition={data.nutrition_estimate} healthTags={data.health_tags} tips={data.tips} />}
        </div>

        {/* Reset Button */}
        <div className="text-center border-t border-white/10 pt-16 mt-16">
             <button onClick={onReset} className="text-gray-500 hover:text-cine-gold transition-all text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 mx-auto group font-bold">
                 <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-700" /> 
                 PHÂN TÍCH CẢNH KHÁC
             </button>
        </div>
    </div>
  );
};

export default AnalyzeResult;