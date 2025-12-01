import React, { useState } from 'react';
import { 
  Wand2, Sliders, Loader2, ArrowRight, Sparkles, 
  Film, BrainCircuit, Smile, Clock, Flame, Leaf
} from 'lucide-react';
import { aiService } from '../../services/aiService';
import { CreateByThemeResponse, CreateByThemeRequest } from '../../types/index';
import CreativeResult from './creative/CreativeResult';
import CinematicError from './analyze/CinematicError';
import CinematicLoader from './creative/CinematicLoader';

// ============================================================================
// CONSTANTS - UPDATED WITH NEW PERSONAS MAPPING
// ============================================================================

const MOODS = [
  { id: 'Normal', label: 'Bình Thường', icon: '😐', persona: 'Chef\'s Table' },
  { id: 'Comedy', label: 'Hài Hước', icon: '😂', persona: 'Comic Mode' },
  { id: 'Action', label: 'Hành Động', icon: '💥', persona: 'Action Rush' },
  { id: 'Romance', label: 'Lãng Mạn', icon: '🌹', persona: 'Romance Mood' },
  { id: 'Drama', label: 'Kịch Tính', icon: '🎭', persona: 'Drama Deep' },
  { id: 'Horror', label: 'Kinh Dị', icon: '👻', persona: 'Horror Night' },
  { id: 'Anime', label: 'Anime', icon: '🍜', persona: 'Anime Feast' },
  { id: 'Documentary', label: 'Tài Liệu', icon: '📺', persona: 'Travel Discovery' },
];

const DIETS = [
  { id: 'None', label: 'Không kiêng' },
  { id: 'Vegetarian', label: 'Chay' },
  { id: 'Keto', label: 'Keto' },
  { id: 'EatClean', label: 'Eat Clean' },
];

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function CreativeChef() {
  // --- STATE ---
  const [formData, setFormData] = useState<CreateByThemeRequest>({
    inspiration: '',
    mood: MOODS[0].id,
    ingredients: '',
    diet: DIETS[0].id,
    creativity: 50,
    time: 'medium',
    difficulty: 'medium',
    dining_style: 'Cinematic',
    skill_level: 'Medium'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CreateByThemeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  // --- HANDLERS ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, creativity: Number(e.target.value) }));
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.inspiration.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await aiService.createByTheme(formData);
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Có lỗi xảy ra khi sáng tạo món ăn.");
    } finally {
      setLoading(false);
    }
  };

  // Get current mood's persona for display
  const currentMood = MOODS.find(m => m.id === formData.mood);

  // --- RENDER LOGIC ---
  if (loading) return <CinematicLoader />;
  if (result) return <CreativeResult data={result} onReset={() => setResult(null)} />;
  if (error) return <CinematicError title="Lỗi Sản Xuất" description={error} onReset={() => setError(null)} type="error" />;

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in pb-20">
      {/* Container: The "Script" Board */}
      <form onSubmit={handleSubmit} className="bg-[#1a1f2e] border border-gray-700 rounded-sm shadow-2xl relative overflow-hidden group">
        
        {/* Top Decorative Stripes */}
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
                        className="w-full bg-transparent border-b-2 border-gray-600 text-3xl md:text-5xl font-serif text-center text-white placeholder-gray-700 focus:border-amber-500 outline-none py-4 transition-all uppercase tracking-wide"
                        autoComplete="off"
                        required
                    />
                </div>
            </div>

            {/* 2. ATMOSPHERE (Mood Film Strip) - UPDATED 8 MOODS */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                    <label className="block text-xs font-bold uppercase tracking-[0.3em] text-gray-500 pl-2 border-l-4 border-amber-500">
                        Không Khí & Phong Cách Kể Chuyện (Mood)
                    </label>
                    {currentMood && (
                        <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span className="text-amber-500 font-bold">Persona:</span>
                            <span className="font-mono">{currentMood.persona}</span>
                        </div>
                    )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MOODS.map((m) => (
                        <button
                            key={m.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, mood: m.id }))}
                            className={`
                                relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 group/btn
                                ${formData.mood === m.id 
                                    ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                                    : 'border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-500'
                                }
                            `}
                        >
                            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-4xl group-hover/btn:scale-110 transition-transform duration-500">
                                {m.icon}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className={`absolute bottom-2 left-0 w-full text-center text-xs font-bold uppercase tracking-wider ${formData.mood === m.id ? 'text-amber-500' : 'text-gray-300'}`}>
                                {m.label}
                            </div>
                            {/* Persona hint on hover */}
                            <div className="absolute top-2 left-2 opacity-0 group-hover/btn:opacity-100 transition-opacity">
                                <span className="text-[8px] bg-black/80 px-2 py-1 rounded text-gray-400 font-mono">
                                    {m.persona}
                                </span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Persona Description */}
                {currentMood && (
                    <div className="mt-6 p-4 bg-black/20 border border-white/5 rounded-lg">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{currentMood.icon}</span>
                            <div className="flex-1">
                                <div className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                                    {currentMood.persona}
                                </div>
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    {getPersonaDescription(currentMood.persona)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
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
                        "{formData.creativity < 40 
                            ? 'Giữ nguyên bản sắc món ăn trong phim.' 
                            : formData.creativity < 70 
                                ? 'Biến tấu sáng tạo dựa trên màu sắc phim.' 
                                : 'Phá vỡ mọi quy tắc. Ẩm thực trừu tượng.'}"
                    </p>
                </div>

                {/* Right: Logistics */}
                <div className="md:col-span-7 space-y-6 pl-0 md:pl-4">
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Thời Lượng</label>
                            <div className="flex bg-gray-900 rounded-md p-1 border border-gray-700">
                                {['fast', 'medium', 'slow'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, time: t }))}
                                        className={`flex-1 py-1.5 text-[10px] uppercase font-bold rounded transition-colors ${formData.time === t ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {t === 'fast' ? '15p' : t === 'medium' ? '45p' : '2h+'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Độ Phức Tạp</label>
                            <div className="flex bg-gray-900 rounded-md p-1 border border-gray-700">
                                {['easy', 'medium', 'hard'].map((d) => (
                                    <button
                                        key={d}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, difficulty: d }))}
                                        className={`flex-1 py-1.5 text-[10px] uppercase font-bold rounded transition-colors ${formData.difficulty === d ? 'bg-gray-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                        {d === 'easy' ? 'Dễ' : d === 'medium' ? 'Vừa' : 'Khó'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

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
                    disabled={loading || !formData.inspiration}
                    className="group relative w-full h-20 bg-[#0f1115] overflow-hidden rounded-lg border-2 border-gray-700 hover:border-amber-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#1f2937_10px,#1f2937_20px)] opacity-10"></div>
                    <div className="absolute inset-0 flex items-center justify-center gap-4 group-hover:gap-6 transition-all duration-300">
                        {loading ? (
                            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
                        ) : (
                            <>
                                <span className="text-4xl">🎬</span>
                                <span className="text-2xl font-serif font-bold text-white tracking-[0.3em] group-hover:text-amber-500 transition-colors">
                                    ACTION !
                                </span>
                            </>
                        )}
                    </div>
                    {!loading && <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>}
                </button>
            </div>

        </div>
      </form>
    </div>
  );
}

// ============================================================================
// HELPER FUNCTION - PERSONA DESCRIPTIONS
// ============================================================================

function getPersonaDescription(persona: string): string {
  const descriptions: Record<string, string> = {
    'Comic Mode': 'Giọng điệu vui nhộn như Deadpool nấu ăn. Phá vỡ bức tường thứ 4, châm biếm, chơi chữ.',
    'Action Rush': 'Như Gordon Ramsay hoặc Fast & Furious. Câu ngắn, súc tích, động từ mạnh. Tạo cảm giác khẩn cấp!',
    'Romance Mood': 'Phong cách K-Drama, ngọt ngào, lãng mạn. So sánh hương vị như tình yêu - ngọt đắng cay nồng.',
    'Drama Deep': 'Như Parasite hay The Godfather. Triết lý sâu sắc, món ăn là ẩn dụ cuộc đời.',
    'Horror Night': 'Gothic, rùng rợn nhưng hấp dẫn. Ẩn dụ tối tăm, tiếng động đáng sợ, như Silence of the Lambs.',
    'Chef\'s Table': 'Phong cách tài liệu Netflix. Tôn trọng nghệ thuật, kỹ thuật, nguồn gốc nguyên liệu, tâm huyết.',
    'Anime Feast': 'Như Food Wars/Shokugeki! Phóng đại, hiệu ứng ánh sáng, "foodgasm", quần áo bay!',
    'Travel Discovery': 'Phong cách Anthony Bourdain. Kể chuyện văn hóa, lịch sử, con người đằng sau món ăn.',
  };
  return descriptions[persona] || 'Phong cách kể chuyện độc đáo.';
}