// creative/CinematicLoader.tsx
import { useEffect, useState } from 'react';

const LOADING_PHRASES = [
  "Đang đọc kịch bản gốc...",
  "Casting nguyên liệu...",
  "Thiết kế ánh sáng (Lighting)...",
  "Xào nấu Plot Twist...",
  "Thêm hiệu ứng Drama...",
  "Chỉnh màu (Color Grading)...",
  "Dựng hậu kỳ (Editing)...",
  "Kết xuất bản cuối (Rendering)..."
];

export default function CinematicLoader() {
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState<'countdown' | 'action'>('countdown');
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Countdown Logic: 5 -> 1 -> ACTION
  useEffect(() => {
    if (phase === 'countdown') {
      if (count > 1) {
        const timer = setTimeout(() => setCount(count - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => setPhase('action'), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [count, phase]);

  // Rotate phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden text-[#e5e5e5] font-sans select-none">
      
      {/* Grain & Scratches */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15] z-0 mix-blend-overlay">
         <div className="absolute inset-0 animate-pulse bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,#000000_90%)] z-10 pointer-events-none"></div>

      {/* Center Content */}
      <div className="relative z-20 flex flex-col items-center justify-center scale-110 md:scale-125">
        
        {/* Film Leader Circle */}
        <div className="relative w-64 h-64 border-[3px] border-white/20 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] bg-black/40 backdrop-blur-sm">
            
            {/* Crosshairs */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/30"></div>
                <div className="absolute left-1/2 top-0 h-full w-[1px] bg-white/30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full"></div>
            </div>

            {/* Radar Sweep (Only countdown) */}
            {phase === 'countdown' && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="w-full h-1/2 bg-white/10 origin-bottom animate-spin blur-sm"></div>
                </div>
            )}

            {/* Number or ACTION */}
            <div className="relative z-30 font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
                {phase === 'countdown' ? (
                    <span className="text-9xl block animate-pulse">{count}</span>
                ) : (
                    <div className="text-center animate-pulse">
                        <div className="text-6xl text-amber-500 tracking-tighter font-black">ACTION</div>
                        <div className="text-xs uppercase tracking-[0.5em] mt-2 text-white">Đang ghi hình...</div>
                    </div>
                )}
            </div>
        </div>

        {/* Loading Phrases */}
        <div className="mt-16 h-8 text-center px-4">
             <p className="text-lg font-mono uppercase tracking-widest text-white/70 border-t border-b border-white/10 py-1">
                {phase === 'countdown' 
                  ? "Chuẩn bị trường quay..." 
                  : LOADING_PHRASES[phraseIndex]
                }
             </p>
        </div>

      </div>
    </div>
  );
}