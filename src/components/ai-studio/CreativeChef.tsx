// creative/CreativeChef.tsx
import { useState } from 'react';

// Types & Constants
export interface ChefRequest {
  inspiration: string;
  mood: string;
  ingredients: string;
  diet: string;
  creativity: number;
  time: 'fast' | 'medium' | 'slow';
  difficulty: 'easy' | 'medium' | 'hard';
}

const MOODS = [
  { id: "Adventure", label: "Phiêu Lưu", icon: "🗺️" },
  { id: "Comedy", label: "Hài Hước", icon: "😂" },
  { id: "Horror", label: "Kinh Dị", icon: "👻" },
  { id: "Romance", label: "Lãng Mạn", icon: "🌹" },
  { id: "Sci-Fi", label: "Viễn Tưởng", icon: "🤖" },
  { id: "Chill", label: "Chữa Lành", icon: "🍃" },
  { id: "Action", label: "Hành Động", icon: "🔥" },
  { id: "Noir", label: "Cổ Điển", icon: "🎞️" }
];

const DIETS = [
  { id: "None", label: "Thoải mái" },
  { id: "Vegetarian", label: "Ăn Chay" },
  { id: "Keto", label: "Keto/LowCarb" },
  { id: "EatClean", label: "Eat Clean" },
];

interface Props {
  onSubmit: (data: ChefRequest) => void;
  isLoading: boolean;
}

export default function CreativeChef({ onSubmit, isLoading }: Props) {
  const [formData, setFormData] = useState<ChefRequest>({
    inspiration: '',
    mood: MOODS[0].id,
    ingredients: '',
    diet: DIETS[0].id,
    creativity: 50,
    time: 'medium',
    difficulty: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, creativity: Number(e.target.value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.inspiration.trim()) return;
    onSubmit(formData);
  };

  if (isLoading) return null;

  return (
    <div className="w-full max-w-5xl mx-auto animate-slide-up pb-20">
      
      {/* Container: The "Script" Board */}
      <form onSubmit={handleSubmit} className="bg-[#1a1f2e] border border-gray-700 rounded-sm shadow-2xl relative overflow-hidden group">
        
        {/* Top Decorative "Clapperboard" Stripes */}
        <div className="h-4 w-full flex">
             {Array.from({ length: 20 }).map((_, i) => (
                 <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-white' : 'bg-black'}`}></div>
             ))}
        </div>

        <div className="p-8 md:p-12">
            
            {/* 1. SCENE HEADING (Inspiration) */}
            <div className="mb-12 text-center relative">
                <label className="block text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-4">
                    Cảnh 1: Nguồn Cảm Hứng
                </label>
                <div className="relative inline-block w-full max-w-2xl">
                    <input
                        type="text"
                        name="inspiration"
                        value={formData.inspiration}
                        onChange={handleChange}
                        placeholder="NHẬP TÊN PHIM / ANIME..."
                        className="w-full bg-transparent border-b-2 border-gray-600 text-3xl md:text-6xl font-black text-center text-white placeholder-gray-700 focus:border-amber-500 focus:placeholder-gray-800 outline-none py-4 transition-all uppercase tracking-wide"
                        autoComplete="off"
                        required
                    />
                    <div className="absolute -bottom-6 left-0 w-full text-center text-amber-500/50 text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        Nhập tên bộ phim, nhân vật hoặc ý tưởng
                    </div>
                </div>
            </div>

            {/* 2. ATMOSPHERE (Mood Film Strip) */}
            <div className="mb-12">
                <label className="block text-xs font-bold uppercase tracking-[0.3em] text-gray-500 mb-6 pl-2 border-l-4 border-amber-500">
                    Không Khí & Tông Màu (Mood)
                </label>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MOODS.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, mood: m.id }))}
                            className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 group/btn ${formData.mood === m.id ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-500'}`}
                        >
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-4xl group-hover/btn:scale-110 transition-transform duration-500">
                                {m.icon}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className={`absolute bottom-2 left-2 right-2 text-center text-xs font-bold uppercase tracking-wider ${formData.mood === m.id ? 'text-amber-500' : 'text-gray-300'}`}>
                                {m.label}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. TECHNICAL SPECS (Dashboard) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 bg-black/20 rounded-xl border border-white/5">
                
                {/* Left: Creativity Dial */}
                <div className="md:col-span-5 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pr-0 md:pr-8 pb-8 md:pb-0">
                    <div className="flex justify-between items-center mb-4">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Tầm Nhìn Đạo Diễn</label>
                        <span className="text-amber-500 font-mono text-xl">{formData.creativity}%</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="10"
                        value={formData.creativity}
                        onChange={handleSliderChange}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500 mb-4"
                    />
                    <div className="flex justify-between text-[10px] text-gray-500 uppercase font-bold">
                        <span>Nguyên Bản</span>
                        <span>Biến Tấu</span>
                        <span>Viễn Tưởng</span>
                    </div>
                    <p className="mt-4 text-xs text-gray-400 italic leading-relaxed">
                        "{formData.creativity < 40 ? 'Giữ nguyên bản sắc món ăn trong phim.' : formData.creativity < 70 ? 'Biến tấu sáng tạo dựa trên màu sắc phim.' : 'Phá vỡ mọi quy tắc. Ẩm thực trừu tượng.'}"
                    </p>
                </div>

                {/* Right: Logistics */}
                <div className="md:col-span-7 space-y-6 pl-0 md:pl-4">
                    
                    {/* Switches Row */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Time */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Thời Lượng</label>
                            <div className="flex bg-gray-900 rounded-md p-1 border border-gray-700">
                                {['fast', 'medium', 'slow'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, time: t as any }))}
                                        className={`flex-1 py-1.5 text-[10px] uppercase font-bold rounded transition-colors ${formData.time === t ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {t === 'fast' ? '15p' : t === 'medium' ? '45p' : '2h+'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {/* Difficulty */}
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Độ Phức Tạp</label>
                            <div className="flex bg-gray-900 rounded-md p-1 border border-gray-700">
                                {['easy', 'medium', 'hard'].map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, difficulty: d as any }))}
                                        className={`flex-1 py-1.5 text-[10px] uppercase font-bold rounded transition-colors ${formData.difficulty === d ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {d === 'easy' ? 'Dễ' : d === 'medium' ? 'Vừa' : 'Khó'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Inputs Row */}
                    <div className="grid grid-cols-2 gap-6">
                         <div className="col-span-1">
                             <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Chế Độ Ăn</label>
                             <select 
                                name="diet" 
                                value={formData.diet}
                                onChange={handleChange}
                                className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-xs py-2 px-3 rounded focus:border-amber-500 outline-none"
                             >
                                {DIETS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                             </select>
                         </div>
                         <div className="col-span-1">
                             <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Đạo Cụ (Nguyên Liệu)</label>
                             <input 
                                type="text"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                placeholder="Có gì dùng nấy..."
                                className="w-full bg-gray-900 border border-gray-700 text-gray-300 text-xs py-2 px-3 rounded focus:border-amber-500 outline-none placeholder-gray-600"
                             />
                         </div>
                    </div>

                </div>
            </div>

            {/* 4. ACTION BUTTON */}
            <div className="mt-12">
                <button
                    type="submit"
                    className="group relative w-full h-20 bg-[#0f1115] overflow-hidden rounded-lg border-2 border-gray-700 hover:border-amber-500 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#1f2937_10px,#1f2937_20px)] opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center gap-4 group-hover:gap-6 transition-all duration-300">
                        <span className="text-4xl">🎬</span>
                        <span className="text-2xl font-black text-white tracking-[0.3em] group-hover:text-amber-500 transition-colors">
                            ACTION !
                        </span>
                    </div>
                    {/* Hover Glow */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </button>
                <p className="text-center text-gray-600 text-[10px] uppercase tracking-widest mt-4">
                    Bấm Action để tạo Kịch Bản & Công Thức
                </p>
            </div>

        </div>
      </form>
    </div>
  );
}