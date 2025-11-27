import React, { useState } from 'react';
import { 
  Feather, Scroll, Clapperboard, Utensils, 
  Flame, Clock, Users, Star, RefreshCw, 
  BookOpen, Palette, Activity, ChefHat,
  Film, Link, Music
} from 'lucide-react';
import { CreateByThemeResponse, NarrativeStyle } from '../../../types/index';
import FlavorChart from './FlavorChart';
import NarrativeBadge from './NarrativeBadge';

interface Props {
  data: CreateByThemeResponse;
  onReset: () => void;
}

const RecipeCard: React.FC<Props> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'blueprint'>('story');
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  // --- SAFETY CHECK ---
  if (!data) return null;

  const toggleIngredient = (index: number) => {
    const next = new Set(checkedIngredients);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setCheckedIngredients(next);
  };

  // --- DATA MAPPING AN TOÀN ---
  // Đảm bảo không bao giờ bị null/undefined
  const flavorProfile = data.flavor_profile || { sweet: 0, sour: 0, spicy: 0, umami: 0, richness: 0 };
  const visualGuide = data.visual_guide || { layout_description: '', color_palette: [], plating_style: '' };
  const recipe = data.recipe || { ingredients: [], instructions: [], prep_time_minutes: 0, cook_time_minutes: 0, servings: 0, difficulty: 0 };
  const nutrition = data.nutrition_estimate || { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 };
  const pairing = data.pairing_suggestions || { drinks: [], side_dishes: [] };
  const movieContext = data.movie_context || { title: '', scene_description: '', significance: '', wikipedia_link: '' };

  // --- LOGIC MÀU SẮC ĐỘNG (Dynamic Colors) ---
  const getFallbackColors = (style: string): string[] => {
    const s = String(style || '');
    if (s.includes(NarrativeStyle.ACTION_RUSH)) return ['#991b1b', '#ea580c', '#000000'];
    if (s.includes(NarrativeStyle.CYBERPUNK_LOGIC)) return ['#0f172a', '#0891b2', '#701a75'];
    if (s.includes(NarrativeStyle.GHIBLI_SOFT_DREAM)) return ['#14532d', '#65a30d', '#0ea5e9'];
    if (s.includes(NarrativeStyle.MYSTIC_WHISPER)) return ['#312e81', '#7c3aed', '#db2777'];
    if (s.includes(NarrativeStyle.COMIC_MODE)) return ['#f59e0b', '#ef4444', '#1e1b4b'];
    if (s.includes(NarrativeStyle.ROMANCE_MOOD)) return ['#881337', '#e11d48', '#fca5a5'];
    return ['#0f172a', '#334155', '#94a3b8']; // Default
  };

  const apiColors = visualGuide.color_palette;
  let colors = (apiColors && apiColors.length >= 2) 
    ? apiColors 
    : getFallbackColors(data.narrator_voice || '');
  
  if (colors.length < 3) colors.push(colors[0] || '#000');
  const [c1, c2, c3] = colors;

  // --- MESH GRADIENT STYLE ---
  const gradientStyle = {
    backgroundColor: '#050505',
    backgroundImage: `
        radial-gradient(at 0% 0%, ${c1} 0px, transparent 50%),      
        radial-gradient(at 100% 0%, ${c2} 0px, transparent 50%),    
        radial-gradient(at 100% 100%, ${c3} 0px, transparent 50%),  
        radial-gradient(at 0% 100%, ${c1} 0px, transparent 50%),    
        url('https://www.transparenttextures.com/patterns/stardust.png') 
    `,
    backgroundSize: '100% 100%, cover',
    backgroundBlendMode: 'screen, normal',
    transition: 'background 1s ease-in-out'
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in pb-20 px-4">
        
      {/* Nút Quay Lại */}
      <button 
        onClick={onReset}
        className="mb-8 flex items-center text-sm font-bold tracking-widest uppercase hover:underline px-6 py-2 rounded-full bg-white/5 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        <span className="mr-2 text-lg group-hover:-translate-x-1 transition-transform">←</span>
        Sáng Tạo Món Mới
      </button>

      {/* --- MAIN CARD CONTAINER --- */}
      <div 
        className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] border border-white/10 relative text-white min-h-[850px]"
        style={gradientStyle}
      >
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-blob animation-delay-2000"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.15] pointer-events-none mix-blend-overlay"></div>

        {/* --- HERO SECTION --- */}
        <div className="relative p-8 md:p-16 border-b border-white/10 backdrop-blur-[2px]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                
                {/* Title & Info */}
                <div className="lg:col-span-8">
                    <NarrativeBadge style={data.narrator_voice || 'Cinematic'} />
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 drop-shadow-lg mt-4">
                        {data.dish_name}
                    </h1>
                    
                    {/* Quick Stats */}
                    <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-widest opacity-90">
                         <div className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                            <span className="text-amber-400">⏱️</span> Sơ chế: {recipe.prep_time_minutes}p
                         </div>
                         <div className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                            <span className="text-red-400">🔥</span> Nấu: {recipe.cook_time_minutes}p
                         </div>
                    </div>
                </div>

                {/* Director's Note */}
                <div className="lg:col-span-4">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl relative group hover:bg-white/15 transition-colors">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-500/80 rotate-2 opacity-80 shadow-sm"></div>
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4 flex items-center gap-2">
                            <span>🎬</span> Góc Nhìn Đạo Diễn
                        </h3>
                        <p className="font-serif italic text-lg leading-relaxed text-white drop-shadow-md">
                            "{data.cinematic_summary}"
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- NAVIGATION TABS --- */}
        <div className="flex border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-20">
            <button onClick={() => setActiveTab('story')} className={`flex-1 py-6 text-xs font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'story' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               Cốt Truyện (Act I)
            </button>
            <button onClick={() => setActiveTab('blueprint')} className={`flex-1 py-6 text-xs font-bold uppercase tracking-[0.2em] transition-all ${activeTab === 'blueprint' ? 'bg-white/10 text-white border-b-2 border-white' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
               Sản Xuất (Act II)
            </button>
        </div>

        {/* --- BODY CONTENT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-black/30 backdrop-blur-xl min-h-[800px]">
            
            {/* LEFT SIDEBAR */}
            <div className="lg:col-span-4 p-8 md:p-12 border-r border-white/10 flex flex-col gap-12 bg-black/20">
                
                {/* Story Mode */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white/60 border-b border-white/10 pb-2 flex items-center gap-2">
                         <Scroll className="w-4 h-4"/> Lời Dẫn
                    </h3>
                    <p className="font-serif text-xl leading-relaxed text-gray-200 drop-shadow-sm italic">
                        "{data.story_mode}"
                    </p>
                </div>

                {/* Movie Context */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-white/60 border-b border-white/10 pb-2 flex items-center gap-2">
                        <Film className="w-4 h-4"/> Liên Kết Phim
                    </h3>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <h4 className="text-white font-bold mb-1">{movieContext.title}</h4>
                        <p className="text-sm text-gray-400">{movieContext.scene_description}</p>
                    </div>
                </div>

                {/* Pairing */}
                {pairing.drinks && pairing.drinks.length > 0 && (
                  <div className="mt-auto bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-white/60">Gợi Ý Combo</h3>
                      <div className="flex items-center gap-4">
                          <div className="p-3 bg-white/10 rounded-full text-2xl">🥂</div>
                          <div>
                              <p className="text-sm font-bold text-white leading-tight">{pairing.drinks[0]}</p>
                              <p className="text-xs text-gray-300 mt-1">{pairing.side_dishes?.[0]}</p>
                          </div>
                      </div>
                  </div>
                )}
            </div>

            {/* CENTER CONTENT */}
            <div className="lg:col-span-5 p-8 md:p-12">
                 
                 {/* TAB: STORY */}
                 {activeTab === 'story' && (
                    <div className="animate-fade-in space-y-12">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/60 border-b border-white/10 pb-2">
                                Nguồn Gốc
                            </h3>
                            <p className="text-gray-300 text-lg leading-loose text-justify">
                                {data.origin}
                            </p>
                        </div>
                        
                        {/* Visual Guide */}
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                             <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/60 flex items-center gap-2">
                                <Palette className="w-4 h-4"/> Visual Guide
                             </h3>
                             <p className="text-gray-300 text-sm leading-relaxed mb-6">{visualGuide.layout_description}</p>
                             <div className="flex gap-3">
                                {visualGuide.color_palette?.map((color, i) => (
                                   <div key={i} className="w-12 h-12 rounded-full shadow-lg border-2 border-white/20" style={{ backgroundColor: color }}></div>
                                ))}
                             </div>
                        </div>
                    </div>
                 )}

                 {/* TAB: BLUEPRINT (RECIPE) */}
                 {activeTab === 'blueprint' && (
                    <div className="animate-fade-in space-y-10">
                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/60 border-b border-white/10 pb-2 flex items-center gap-2">
                                <Utensils className="w-4 h-4"/> Nguyên Liệu
                            </h3>
                            <ul className="space-y-3">
                                {recipe.ingredients?.map((ing, i) => {
                                    const isChecked = checkedIngredients.has(i);
                                    return (
                                        <li 
                                            key={i} 
                                            onClick={() => toggleIngredient(i)}
                                            className={`flex justify-between items-center cursor-pointer p-3 rounded-xl border border-transparent ${isChecked ? 'bg-white/5 opacity-50' : 'bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isChecked ? 'bg-green-500 border-green-500 text-black' : 'border-white/40 group-hover:border-white'}`}>
                                                    {isChecked && <span className="text-[10px] font-bold">✓</span>}
                                                </div>
                                                <span className={`text-sm ${isChecked ? 'line-through text-gray-500' : 'text-gray-200'}`}>{ing.name}</span>
                                            </div>
                                            <span className="text-cine-gold font-mono text-xs">{ing.quantity} {ing.unit}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/60 border-b border-white/10 pb-2 flex items-center gap-2">
                                <ChefHat className="w-4 h-4"/> Kịch Bản
                            </h3>
                            <div className="space-y-8 relative pl-4">
                                <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/10"></div>
                                {recipe.instructions?.map((inst, i) => (
                                    <div key={i} className="flex gap-6 relative group">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl font-serif border-2 border-white/20 bg-[#1a1a1a] z-10 transition-all group-hover:border-amber-500 group-hover:text-amber-500 group-hover:scale-110 shadow-lg">
                                            {inst.step}
                                        </div>
                                        <div className="pt-1.5">
                                            <p className="text-sm leading-relaxed text-gray-300 group-hover:text-white transition-colors">
                                                {inst.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                 )}
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="lg:col-span-3 bg-black/40 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col gap-8">
                
                {/* Flavor Chart */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/20 blur-3xl pointer-events-none"></div>
                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-center text-white/60">Hồ Sơ Hương Vị</h3>
                     {/* Pass flavorProfile an toàn */}
                     <FlavorChart data={flavorProfile} color={c2} />
                </div>

                {/* Nutrition */}
                <div className="bg-[#111] rounded-2xl border border-white/20 p-2 relative shadow-xl">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">Dinh Dưỡng</div>
                    <div className="grid grid-cols-2 text-center divide-x divide-y divide-white/10 mt-3">
                        <div className="p-4"><div className="text-xl font-black font-serif text-orange-400">{nutrition.calories}</div><div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Kcal</div></div>
                        <div className="p-4"><div className="text-lg font-bold font-serif text-red-400">{nutrition.protein_g}g</div><div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Protein</div></div>
                        <div className="p-4"><div className="text-lg font-bold font-serif text-yellow-400">{nutrition.carbs_g}g</div><div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Carbs</div></div>
                        <div className="p-4"><div className="text-lg font-bold font-serif text-blue-400">{nutrition.fat_g}g</div><div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Fat</div></div>
                    </div>
                </div>

                {/* Soundtrack */}
                {data.musicRecommendation && (
                  <div className="mt-auto group cursor-pointer">
                      <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/10 relative overflow-hidden transition-all group-hover:border-white/30">
                          <div className="relative z-20 pr-10">
                              <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Nhạc Phim (OST)</div>
                              <div className="font-serif font-bold text-lg text-white leading-tight mb-3 group-hover:text-cine-gold transition-colors">"{data.musicRecommendation}"</div>
                              <div className="flex items-center gap-2 text-[9px] uppercase font-bold text-green-400">AI Suggestion</div>
                          </div>
                      </div>
                      <a 
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.musicRecommendation)} OST`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="absolute inset-0 z-30"
                      ></a>
                  </div>
                )}
            </div>

        </div>
      </div>
    </div>
  );
};

export default RecipeCard;