import { useState, useRef } from 'react';
import { Upload, Camera, Award, AlertCircle, CheckCircle2 } from 'lucide-react';
import Button from '../ui/Button';

export default function KitchenMentor() {
  const [image, setImage] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const startJudge = () => {
    setAnalyzing(true);
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setScore(Math.min(current, 85)); // Giả lập điểm số 85
      if (current >= 100) {
         clearInterval(interval);
         setAnalyzing(false);
         setDone(true);
      }
    }, 30);
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 animate-fade-in items-center">
      {/* Left: Upload */}
      <div className="text-center space-y-6">
         <div 
            className={`relative aspect-square rounded-3xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-all ${
               image ? 'border-cinematic-gold shadow-glow-gold' : 'border-gray-700 hover:border-gray-500 bg-cinematic-gray/50'
            }`}
            onClick={() => !analyzing && inputRef.current?.click()}
         >
            {image ? (
               <img src={image} className="w-full h-full object-cover" />
            ) : (
               <div className="p-8">
                  <div className="w-24 h-24 rounded-full bg-gray-800 mx-auto flex items-center justify-center mb-6">
                     <Camera className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Chấm Điểm Món Ăn</h3>
                  <p className="text-gray-400">Upload thành phẩm của bạn để Giám khảo AI đánh giá.</p>
               </div>
            )}
            
            {analyzing && (
               <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
                  <div className="text-6xl font-display font-bold text-cinematic-gold mb-2">{score}</div>
                  <p className="text-white animate-pulse">Đang chấm điểm...</p>
               </div>
            )}
            <input ref={inputRef} type="file" hidden onChange={handleFile} />
         </div>

         {image && !done && !analyzing && (
            <Button onClick={startJudge} className="w-full py-4 text-lg shadow-glow-gold bg-gradient-to-r from-cinematic-gold to-amber-600 text-black border-none">
               Bắt Đầu Chấm Điểm
            </Button>
         )}
      </div>

      {/* Right: Report Card */}
      <div className="relative">
         {!done ? (
            <div className="p-8 border border-gray-800 rounded-3xl bg-cinematic-gray/50 text-center text-gray-500">
               <Award className="w-16 h-16 mx-auto mb-4 opacity-20" />
               <p>Kết quả đánh giá chi tiết sẽ hiện ở đây.</p>
            </div>
         ) : (
            <div className="bg-cinematic-gray rounded-3xl border border-gray-800 p-8 animate-slide-up shadow-2xl">
               <div className="flex justify-between items-start mb-8">
                  <div>
                     <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Tổng Điểm</p>
                     <h2 className="text-5xl font-display font-bold text-white">8.5<span className="text-2xl text-gray-500">/10</span></h2>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-green-500/10 text-green-400 border border-green-500/20 font-bold text-sm">
                     Tuyệt vời!
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                     <h4 className="text-green-400 font-bold flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-5 h-5" /> Điểm Ấn Tượng
                     </h4>
                     <p className="text-gray-300 text-sm">Màu sắc rất bắt mắt, lớp vỏ có vẻ giòn hoàn hảo. Trình bày gọn gàng.</p>
                  </div>

                  <div className="bg-blue-500/5 p-4 rounded-xl border border-blue-500/10">
                     <h4 className="text-blue-400 font-bold flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5" /> Gợi Ý Cải Thiện
                     </h4>
                     <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex gap-2"><span className="text-blue-500">•</span> Thêm một chút rau thơm trang trí để tăng độ tương phản màu.</li>
                        <li className="flex gap-2"><span className="text-blue-500">•</span> Ánh sáng chụp ảnh hơi tối, lần sau thử chụp gần cửa sổ nhé.</li>
                     </ul>
                  </div>

                  <Button variant="outline" className="w-full">Chia sẻ Kết quả</Button>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}