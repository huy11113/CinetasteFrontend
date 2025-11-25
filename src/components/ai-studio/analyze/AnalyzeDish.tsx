import React, { useState, useRef } from 'react';
import AnalyzeResult from './AnalyzeResult';
import { aiService } from '../../../services/aiService';
import { AnalyzeDishResponse } from '../../../types';
import { 
  FileText, Sparkles, Loader2, X, Upload, 
  Film, Aperture, ArrowRight, Video
} from 'lucide-react';

const QUICK_CONTEXT_TAGS = [
  { label: 'Tên phim', value: 'Tên phim: ' },
  { label: 'Món ăn', value: 'Món ăn: ' },
  { label: 'Bối cảnh', value: 'Cảnh phim: ' }
];

const AnalyzeDish = () => {
  // --- STATE QUẢN LÝ ---
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDishResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- HANDLERS ---
  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setResult(null);
    setError(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFileChange(e.target.files[0]);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFileChange(e.dataTransfer.files[0]);
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      // Gọi API thật từ Service
      const data = await aiService.analyzeDish(file, context);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Không thể phân tích ảnh. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setContext('');
    setError(null);
  };

  // --- RENDER: KẾT QUẢ (Khi đã có data từ AI) ---
  if (result) {
    return <AnalyzeResult data={result} onReset={handleReset} />;
  }

  // --- RENDER: MÀN HÌNH CHỜ (Hero Mode - Chưa có ảnh) ---
  if (!previewUrl) {
    return (
      <div className="relative w-full min-h-[600px] rounded-3xl border border-white/10 overflow-hidden shadow-cinema flex flex-col items-center justify-center p-8 md:p-16 group bg-[#080808]">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-luxury opacity-80 pointer-events-none"></div>
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-cine-gold/5 rounded-full animate-spin-slow pointer-events-none"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-cine-gold/30 backdrop-blur-md mb-6 shadow-gold-glow">
             <Sparkles className="w-4 h-4 text-cine-gold animate-pulse" />
             <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-cine-gold">AI Cinematic Lens</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white via-cine-gold-dim to-gray-800 leading-tight drop-shadow-2xl">
            Khám Phá Vị Giác<br />
            <span className="italic text-cine-gold">Điện Ảnh</span>
          </h1>

          <div 
            className={`relative mt-12 mx-auto max-w-lg aspect-video rounded-2xl transition-all duration-500 cursor-pointer group/upload overflow-hidden
              ${dragActive ? 'border-2 border-cine-gold bg-cine-gold/10 scale-105 shadow-gold-glow' : 'border border-white/10 bg-white/5 hover:border-cine-gold/50 hover:bg-white/10'}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
             <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cine-card to-black border border-white/10 flex items-center justify-center group-hover/upload:scale-110 transition-transform duration-500 shadow-2xl">
                  <Upload className={`w-6 h-6 ${dragActive ? 'text-cine-gold' : 'text-gray-400 group-hover/upload:text-cine-gold'}`} />
                </div>
                <div className="text-center">
                   <p className="text-white font-display tracking-widest text-lg mb-1">TẢI CẢNH PHIM</p>
                   <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">Kéo thả hoặc nhấp để chọn</p>
                </div>
             </div>
          </div>
        </div>
        <input ref={inputRef} type="file" hidden onChange={handleInputChange} accept="image/*" />
      </div>
    );
  }

  // --- RENDER: MÀN HÌNH NHẬP LIỆU (Director Monitor - Đã có ảnh) ---
  return (
    <div className="w-full bg-[#080808] rounded-3xl overflow-hidden shadow-cinema border border-white/10 grid grid-cols-1 lg:grid-cols-5 min-h-[650px] animate-fade-in relative group">
      
      {/* CỘT TRÁI: ẢNH REVIEW (60%) */}
      <div className="lg:col-span-3 relative bg-black flex items-center justify-center p-10 border-r border-white/10 overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none"></div>
         
         {/* HUD Elements */}
         <div className="absolute top-6 left-6 flex items-center gap-4 z-20">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-900/30 border border-red-500/30 rounded text-red-500 text-[10px] font-bold uppercase tracking-widest animate-pulse shadow-red-glow">
              <div className="w-2 h-2 rounded-full bg-red-500"></div> REC
            </div>
            <div className="text-[10px] font-mono text-gray-500">ISO 800</div>
         </div>
         
         <div className="relative w-full h-full flex flex-col items-center justify-center z-10">
            <img src={previewUrl} alt="Analysis Subject" className="max-h-[500px] w-auto object-contain rounded-sm shadow-2xl border border-white/5" />
            
            <div className="mt-8 flex items-center gap-4">
               <div className="px-4 py-2 bg-white/5 backdrop-blur-md rounded border border-white/10 flex items-center gap-3">
                  <Film className="w-3 h-3 text-cine-gold" />
                  <span className="text-xs text-gray-300 font-mono uppercase tracking-wider max-w-[200px] truncate">{file?.name}</span>
               </div>
               <button onClick={handleReset} className="p-2 hover:bg-red-900/20 rounded border border-transparent hover:border-red-500/30 transition-all text-gray-500 hover:text-red-400">
                 <X className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>

      {/* CỘT PHẢI: FORM NHẬP (40%) */}
      <div className="lg:col-span-2 bg-[#0c0c0c] flex flex-col border-l border-white/5 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-cine-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

         <div className="p-8 border-b border-white/5 relative z-10">
            <div className="flex items-center gap-2 text-cine-gold text-xs font-bold uppercase tracking-[0.2em] mb-2">
                <Video className="w-3 h-3" /> Scene Input
            </div>
            <h2 className="font-display text-3xl text-white tracking-wide">THÔNG TIN CẢNH</h2>
         </div>

         <div className="p-8 flex-1 flex flex-col space-y-8 relative z-10">
            <div className="space-y-4 group/input">
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileText className="w-3 h-3" /> Ghi Chú Đạo Diễn
               </label>
               <div className="relative">
                 <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    disabled={loading}
                    placeholder="Ví dụ: Phim Ratatouille, cảnh chuột Remy nấu súp..."
                    className="w-full h-40 bg-[#121212] border border-white/10 rounded-xl p-5 text-sm text-gray-200 placeholder-gray-700 focus:outline-none focus:border-cine-gold focus:shadow-gold-glow transition-all resize-none font-sans"
                 />
               </div>
               <div className="flex flex-wrap gap-2">
                  {QUICK_CONTEXT_TAGS.map((tag, idx) => (
                    <button key={idx} onClick={() => !context.includes(tag.value) && setContext(context ? `${context}\n${tag.value}` : tag.value)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded bg-white/5 text-gray-400 border border-white/5 hover:border-cine-gold hover:text-cine-gold hover:bg-cine-gold/10 transition-all uppercase"
                    >+ {tag.label}</button>
                  ))}
               </div>
            </div>

            <div className="flex-1"></div>

            {error && (
               <div className="text-red-400 text-xs bg-red-900/10 p-3 rounded border border-red-500/20 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block"></span> {error}
               </div>
            )}

            <button onClick={handleAnalyze} disabled={loading}
                className="w-full group relative py-5 rounded-xl bg-gradient-to-r from-cine-burgundy to-red-900 text-white overflow-hidden shadow-red-glow hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <div className="relative z-10 flex items-center justify-center gap-3">
                    {loading ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /><span className="font-display text-lg tracking-widest">ĐANG XỬ LÝ...</span></>
                    ) : (
                        <><Aperture className="w-5 h-5" /><span className="font-display text-lg tracking-widest">PHÂN TÍCH SCENE</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    )}
                </div>
            </button>
         </div>
      </div>
    </div>
  );
};

export default AnalyzeDish;