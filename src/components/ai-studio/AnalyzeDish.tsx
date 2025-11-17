import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Sparkles, Film, Loader2, ArrowRight, Info, Globe } from 'lucide-react';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

export default function AnalyzeDish() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const analyze = async () => {
    if (!image) return;
    setLoading(true);
    // Mock API call - Sẽ thay bằng apiClient.post('/ai/analyze-dish')
    setTimeout(() => {
      setResult({
        dishName: "Ratatouille (Rau củ hầm)",
        origin: "Provence, Pháp 🇫🇷",
        description: "Một món hầm nông dân khiêm tốn đã trở thành biểu tượng điện ảnh. Ratatouille tôn vinh hương vị tự nhiên của rau củ mùa hè, được xếp lớp tinh tế như một tác phẩm nghệ thuật.",
        confidence: 98,
        nutrition: { calories: 180, protein: "4g", carbs: "28g", fat: "7g" },
        pairing: { drinks: ["Vang đỏ nhẹ (Pinot Noir)", "Nước chanh tươi"], sides: ["Bánh mì giòn (Baguette)", "Cơm trắng"] },
        ingredients: ["Cà tím", "Bí ngòi", "Cà chua", "Húng tây"],
        tips: ["Nên nướng sơ rau củ trước khi xếp lớp", "Dùng nhiều dầu ô liu chất lượng cao"]
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      {/* INPUT AREA */}
      <div className="lg:col-span-5 space-y-6">
        <div className={`relative aspect-[4/5] rounded-2xl border-2 border-dashed transition-all overflow-hidden group ${
          image ? 'border-cinematic-accent' : 'border-gray-700 hover:border-gray-500 bg-cinematic-gray/30'
        }`}>
          {image ? (
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
                 onClick={() => inputRef.current?.click()}>
              <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-cinematic-accent" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Tải ảnh món ăn</h3>
              <p className="text-gray-400 text-sm">Kéo thả hoặc click để upload</p>
              <p className="text-xs text-gray-600 mt-4">Hỗ trợ JPG, PNG (Max 5MB)</p>
            </div>
          )}
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-700 rounded-full" />
                <div className="w-20 h-20 border-4 border-cinematic-accent border-t-transparent rounded-full animate-spin absolute top-0" />
                <Sparkles className="w-8 h-8 text-cinematic-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <p className="text-white font-medium mt-4 animate-pulse">AI Chef đang phân tích...</p>
            </div>
          )}
          
          <input ref={inputRef} type="file" hidden onChange={handleFile} accept="image/*" />
        </div>

        {image && !loading && !result && (
          <Button className="w-full py-4 text-lg shadow-glow-red" onClick={analyze}>
            <Sparkles className="w-5 h-5 mr-2" /> Phân Tích Ngay
          </Button>
        )}
        {result && (
             <Button variant="secondary" className="w-full" onClick={() => { setImage(null); setResult(null); }}>
                Thử ảnh khác
             </Button>
        )}
      </div>

      {/* OUTPUT AREA - STORY CARD */}
      <div className="lg:col-span-7">
        {!result ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-500 bg-cinematic-gray/20 rounded-3xl border border-gray-800 border-dashed p-12">
            <div className="w-24 h-24 rounded-full bg-gray-800/50 flex items-center justify-center mb-6">
              <Film className="w-10 h-10 opacity-30" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Chưa có dữ liệu</h3>
            <p className="max-w-xs text-center">Hãy tải ảnh lên để xem câu chuyện và công thức phía sau món ăn.</p>
          </div>
        ) : (
          <div className="bg-cinematic-gray rounded-3xl border border-gray-800 overflow-hidden animate-slide-up shadow-2xl">
            {/* Header */}
            <div className="relative h-32 bg-gradient-to-r from-cinematic-accent/20 to-cinematic-gold/10 p-8">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Film className="w-32 h-32 text-white" />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-2 text-cinematic-gold mb-1">
                   <Sparkles className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase tracking-wider">AI Confidence: {result.confidence}%</span>
                 </div>
                 <h2 className="text-4xl font-display font-bold text-white">{result.dishName}</h2>
               </div>
            </div>

            <div className="p-8 space-y-8">
              {/* Origin & Description */}
              <div className="flex gap-4 items-start">
                 <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
                    <Globe className="w-6 h-6" />
                 </div>
                 <div>
                    <h4 className="text-white font-bold flex items-center gap-2">{result.origin}</h4>
                    <p className="text-gray-400 mt-2 leading-relaxed">{result.description}</p>
                 </div>
              </div>

              {/* Nutrition & Stats */}
              <div className="grid grid-cols-4 gap-2 bg-black/30 p-4 rounded-xl border border-gray-800">
                 {Object.entries(result.nutrition).map(([key, val]: [string, any]) => (
                    <div key={key} className="text-center">
                       <div className="text-lg font-bold text-white">{val}</div>
                       <div className="text-[10px] uppercase text-gray-500">{key}</div>
                    </div>
                 ))}
              </div>

              {/* Suggestions */}
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wide flex items-center gap-2">
                       <Info className="w-4 h-4 text-cinematic-accent" /> Bí kíp Chef
                    </h4>
                    <ul className="space-y-2">
                       {result.tips.map((tip: string, i: number) => (
                          <li key={i} className="text-sm text-gray-400 flex gap-2">
                             <span className="text-cinematic-accent">•</span> {tip}
                          </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-3">
                    <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wide">Ăn kèm ngon nhất</h4>
                    <div className="flex flex-wrap gap-2">
                       {[...result.pairing.drinks, ...result.pairing.sides].map((item: string, i: number) => (
                          <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-xs text-white border border-gray-700">
                             {item}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>
              
              <div className="pt-6 border-t border-gray-800 flex gap-4">
                 <Button className="flex-1 shadow-glow-gold bg-gradient-to-r from-cinematic-gold to-yellow-500 text-black border-none">
                    Xem Công Thức Chi Tiết <ArrowRight className="w-4 h-4 ml-2" />
                 </Button>
                 <Button variant="outline" className="aspect-square p-0 flex items-center justify-center">
                    <Bookmark className="w-5 h-5" />
                 </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}