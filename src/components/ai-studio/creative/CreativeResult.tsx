// creative/CreativeResult.tsx
import { useState } from 'react';
import FlavorChart from './FlavorChart';
import NarrativeBadge, { NarrativeStyle } from './NarrativeBadge';

// Types
interface FlavorProfile {
  sweet: number;
  sour: number;
  spicy: number;
  umami: number;
  richness: number;
}

interface Macros {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

export interface ChefResponse {
  narrativeStyle: NarrativeStyle;
  story: string;
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  flavorProfile: FlavorProfile;
  platingGuide: string;
  musicRecommendation: string;
  visualColors: string[];
  connection: string;
  pairing: string;
  macros: Macros;
}

interface Props {
  data: ChefResponse;
  onReset: () => void;
}

export default function CreativeResult({ data, onReset }: Props) {
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  const toggleIngredient = (index: number) => {
    const next = new Set(checkedIngredients);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCheckedIngredients(next);
  };

  // --- Dynamic Color Logic ---
  const getFallbackColors = (style: NarrativeStyle): string[] => {
    switch (style) {
      case NarrativeStyle.ACTION_RUSH: return ['#991b1b', '#ea580c', '#000000'];
      case NarrativeStyle.CYBERPUNK_LOGIC: return ['#0f172a', '#0891b2', '#701a75'];
      case NarrativeStyle.GHIBLI_SOFT_DREAM: return ['#14532d', '#65a30d', '#0ea5e9'];
      case NarrativeStyle.MYSTIC_WHISPER: return ['#312e81', '#7c3aed', '#db2777'];
      case NarrativeStyle.COMIC_MODE: return ['#f59e0b', '#ef4444', '#1e1b4b'];
      case NarrativeStyle.ROMANCE_MOOD: return ['#881337', '#e11d48', '#fca5a5'];
      default: return ['#0f172a', '#334155', '#94a3b8'];
    }
  };

  let colors = (data.visualColors && data.visualColors.length >= 2) 
    ? data.visualColors 
    : getFallbackColors(data.narrativeStyle);
  
  if (colors.length < 3) colors.push(colors[0]);

  const c1 = colors[0];
  const c2 = colors[1];
  const c3 = colors[2];

  // Mesh Gradient Background
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
    backgroundBlendMode: 'screen, normal'
  };

  return (
    <div className="w-full max-w-7xl mx-auto animate-fade-in pb-20 px-4">
        
      {/* Navigation */}
      <button 
        onClick={onReset}
        className="mb-8 flex items-center text-sm font-bold tracking-widest uppercase hover:underline px-6 py-2 rounded-full bg-white/5 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all group shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      >
        <span className="mr-2 text-lg group-hover:-translate-x-1 transition-transform">←</span>
        Quay Lại Studio
      </button>

      {/* --- MAIN CARD CONTAINER --- */}
      <div 
        className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] border border-white/10 relative text-white"
        style={gradientStyle}
      >
        {/* Animated Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-blob" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.15] pointer-events-none mix-blend-overlay"></div>

        {/* --- HERO SECTION --- */}
        <div className="relative p-8 md:p-16 border-b border-white/10 backdrop-blur-[2px]">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8">
                    <NarrativeBadge style={data.narrativeStyle} />
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                        {data.recipeName}
                    </h1>
                    
                    <div className="flex flex-wrap gap-4 text-sm font-bold uppercase tracking-widest opacity-90">
                         <div className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                            <span className="text-amber-400">⏱️</span> Sơ chế: {data.prepTime}
                         </div>
                         <div className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                            <span className="text-red-400">🔥</span> Nấu: {data.cookTime}
                         </div>
                    </div>
                </div>

                {/* Director's Note */}
                <div className="lg:col-span-4">
                    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative group hover:bg-white/15 transition-colors">
                        {/* Tape effect */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-500/80 rotate-2 opacity-80 shadow-sm"></div>
                        
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4 flex items-center gap-2">
                            <span>🎬</span> Góc Nhìn Đạo Diễn
                        </h3>
                        <p className="font-serif italic text-lg leading-relaxed text-white drop-shadow-md">
                            "{data.connection}"
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- CONTENT BODY --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-black/30 backdrop-blur-xl min-h-[800px]">
            
            {/* LEFT COLUMN: Narrative & Ingredients */}
            <div className="lg:col-span-4 p-8 md:p-12 border-r border-white/10 flex flex-col gap-12 bg-black/20">
                
                {/* Story Intro */}
                <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-amber-500/80 border-b border-white/10 pb-2">
                         Cốt Truyện (Intro)
                    </h3>
                    <p className="font-serif text-xl leading-relaxed text-gray-200 drop-shadow-sm">
                        {data.story}
                    </p>
                </div>

                {/* Ingredients */}
                <div className="flex-grow">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-amber-500/80 border-b border-white/10 pb-2 flex justify-between items-center">
                         <span>Diễn Viên & Đạo Cụ</span>
                    </h3>
                    <ul className="space-y-3">
                        {data.ingredients.map((ing, i) => {
                            const isChecked = checkedIngredients.has(i);
                            return (
                                <li 
                                    key={i} 
                                    onClick={() => toggleIngredient(i)}
                                    className={`flex items-start cursor-pointer group select-none transition-all p-3 rounded-xl border border-transparent ${isChecked ? 'bg-white/5 opacity-50' : 'bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                                >
                                    <div className={`mt-1 mr-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-green-500 border-green-500 text-black' : 'border-white/40 group-hover:border-white'}`}>
                                        {isChecked && <span className="text-[10px] font-bold">✓</span>}
                                    </div>
                                    <span className={`text-base font-medium ${isChecked ? 'line-through decoration-white/50' : 'text-gray-100'}`}>
                                        {ing}
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Pairing Box */}
                <div className="mt-auto bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-white/60">Gợi Ý "Combo" (Pairing)</h3>
                    <div className="flex items-center gap-5">
                        <div className="p-3 bg-white/10 rounded-full text-2xl">🥂</div>
                        <div>
                            <p className="text-base font-bold text-white leading-tight">{data.pairing}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CENTER COLUMN: Instructions */}
            <div className="lg:col-span-5 p-8 md:p-12">
                 <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-amber-500/80 border-b border-white/10 pb-2">
                    Kịch Bản Hành Động (Action Script)
                </h3>
                
                <div className="space-y-12 relative pl-4">
                    {/* Timeline Line */}
                    <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/10"></div>

                    {data.instructions.map((step, i) => (
                        <div key={i} className="flex gap-8 relative group">
                            {/* Step Number */}
                            <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white/20 bg-[#1a1a1a] z-10 transition-all group-hover:border-amber-500 group-hover:text-amber-500 group-hover:scale-110 shadow-lg">
                                {i + 1}
                            </div>
                            <div className="pt-1.5">
                                <p className="text-lg leading-relaxed text-gray-200 group-hover:text-white transition-colors">
                                    {step}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Plating Guide */}
                <div className="mt-20 p-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden shadow-inner">
                     <div className="absolute -right-10 -top-10 text-9xl opacity-5 rotate-12">🎨</div>
                     <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-amber-500">Chỉ Đạo Nghệ Thuật (Plating Guide)</h4>
                     <p className="text-lg italic text-white/90 font-serif leading-relaxed">{data.platingGuide}</p>
                </div>
            </div>

            {/* RIGHT COLUMN: Analysis & Stats */}
            <div className="lg:col-span-3 bg-black/40 backdrop-blur-2xl border-l border-white/10 p-8 flex flex-col gap-8">
                
                {/* Flavor Profile Chart */}
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
                     {/* Glow behind chart */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/20 blur-3xl pointer-events-none"></div>
                     
                     <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-center text-white/60">Hồ Sơ Hương Vị</h3>
                     <FlavorChart data={data.flavorProfile} color={c2} />
                </div>

                {/* Macros - Critics Rating */}
                <div className="bg-[#111] rounded-2xl border border-white/20 p-2 relative shadow-xl">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                        Đánh Giá (Dinh Dưỡng)
                    </div>
                    
                    <div className="grid grid-cols-2 text-center divide-x divide-y divide-white/10 mt-3">
                        <div className="p-4 group">
                             <div className="text-2xl font-black text-orange-400 drop-shadow-[0_0_10px_rgba(251,146,60,0.5)] group-hover:scale-105 transition-transform">{data.macros.calories}</div>
                             <div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Calories (Kcal)</div>
                        </div>
                        <div className="p-4 group">
                             <div className="text-xl font-bold text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] group-hover:scale-105 transition-transform">{data.macros.protein}</div>
                             <div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Protein (Đạm)</div>
                        </div>
                        <div className="p-4 group">
                             <div className="text-xl font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)] group-hover:scale-105 transition-transform">{data.macros.carbs}</div>
                             <div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Carbs (Tinh Bột)</div>
                        </div>
                        <div className="p-4 group">
                             <div className="text-xl font-bold text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)] group-hover:scale-105 transition-transform">{data.macros.fat}</div>
                             <div className="text-[9px] uppercase tracking-wider text-gray-500 mt-1">Fat (Chất Béo)</div>
                        </div>
                    </div>
                </div>

                {/* Soundtrack Vinyl */}
                <div className="mt-auto group cursor-pointer relative">
                     <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/10 relative overflow-hidden transition-all group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                        {/* Vinyl Graphic */}
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border-[10px] border-[#0a0a0a] bg-[#1a1a1a] animate-spin-slow opacity-60 group-hover:opacity-100 transition-opacity">
                             <div className="absolute inset-0 border-[1px] border-white/10 rounded-full m-3"></div>
                             <div className="absolute inset-0 border-[1px] border-white/10 rounded-full m-6"></div>
                             <div className="absolute inset-0 w-8 h-8 bg-amber-600 rounded-full m-auto"></div>
                        </div>
                        
                        <div className="relative z-20 pr-10">
                            <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Nhạc Phim (OST)</div>
                            <div className="font-serif font-bold text-xl text-white leading-tight mb-3 group-hover:text-amber-500 transition-colors">
                                {data.musicRecommendation}
                            </div>
                            <div className="flex items-center gap-2 text-[9px] uppercase font-bold text-green-400">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                Đang Phát
                            </div>
                        </div>
                     </div>
                     <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.musicRecommendation)} OST`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="absolute inset-0 z-30"
                    ></a>
                </div>

            </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 10s infinite;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}