import { useState } from 'react';
import { Wand2, ChefHat, Flame, Clock, Leaf } from 'lucide-react';
import Button from '../ui/Button';

export default function CreativeChef() {
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCreate = () => {
    if (!theme) return;
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setResult({
        name: "Cyberpunk Neon Ramen",
        desc: "Một bát mì Ramen từ tương lai với nước dùng phát sáng (tự nhiên) và hương vị cay nồng.",
        difficulty: 4,
        time: 45
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Input Section */}
      <div className="bg-cinematic-gray rounded-2xl p-8 border border-gray-800 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-32 bg-cinematic-accent/5 blur-[80px] rounded-full pointer-events-none" />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-white mb-3">Phòng Thí Nghiệm Vị Giác</h2>
          <p className="text-gray-400">Nhập một chủ đề, bộ phim, hay cảm xúc. AI sẽ thiết kế công thức độc bản cho bạn.</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="text-sm font-bold text-gray-300 uppercase mb-2 block">Chủ đề chính</label>
            <input 
              type="text" 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="input-field text-lg py-4 bg-black/20 border-gray-700 focus:border-cinematic-gold"
              placeholder="VD: Tiệc trà Alice in Wonderland, Bữa sáng kiểu Ghibli..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             <div className="p-4 rounded-xl bg-cinematic-gray-light border border-gray-700 cursor-pointer hover:border-cinematic-accent transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                   <ChefHat className="w-4 h-4" /> <span>Độ khó</span>
                </div>
                <select className="w-full bg-transparent text-white font-bold outline-none cursor-pointer">
                   <option>Dễ</option>
                   <option>Trung bình</option>
                   <option>Thử thách</option>
                </select>
             </div>
             <div className="p-4 rounded-xl bg-cinematic-gray-light border border-gray-700 cursor-pointer hover:border-cinematic-accent transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                   <Leaf className="w-4 h-4" /> <span>Chế độ</span>
                </div>
                <select className="w-full bg-transparent text-white font-bold outline-none cursor-pointer">
                   <option>Bình thường</option>
                   <option>Ăn chay (Vegan)</option>
                   <option>Keto / Low-carb</option>
                </select>
             </div>
             <div className="p-4 rounded-xl bg-cinematic-gray-light border border-gray-700 cursor-pointer hover:border-cinematic-accent transition-colors">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                   <Flame className="w-4 h-4" /> <span>Vị chủ đạo</span>
                </div>
                <select className="w-full bg-transparent text-white font-bold outline-none cursor-pointer">
                   <option>Cân bằng</option>
                   <option>Cay nồng</option>
                   <option>Ngọt ngào</option>
                </select>
             </div>
          </div>

          <Button 
            className="w-full py-4 text-lg shadow-glow-gold bg-gradient-to-r from-cinematic-gold to-amber-600 text-black border-none mt-4"
            disabled={loading || !theme}
            onClick={handleCreate}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Wand2 className="w-6 h-6 mr-2" /> Sáng Tạo Ngay</>}
          </Button>
        </div>
      </div>

      {/* Result Card - Tarot Style Reveal */}
      {result && (
        <div className="animate-slide-up perspective-1000">
           <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-cinematic-gold p-1 shadow-2xl transform rotate-x-12 hover:rotate-x-0 transition-transform duration-500">
              <div className="bg-cinematic-gray rounded-xl p-8 border border-gray-800 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-cinematic-gold to-transparent" />
                 
                 <div className="w-20 h-20 bg-cinematic-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 text-cinematic-gold">
                    <ChefHat className="w-10 h-10" />
                 </div>

                 <h3 className="text-3xl font-display font-bold text-white mb-4">{result.name}</h3>
                 <p className="text-gray-300 leading-relaxed mb-8">{result.desc}</p>

                 <div className="flex justify-center gap-8 text-sm text-gray-400 mb-8">
                    <div className="flex items-center gap-2">
                       <Flame className="w-4 h-4 text-cinematic-accent" /> {result.difficulty}/5 Độ khó
                    </div>
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-cinematic-gold" /> {result.time} phút
                    </div>
                 </div>

                 <Button variant="outline" className="w-full">Xem Chi Tiết & Lưu</Button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}