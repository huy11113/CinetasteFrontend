import React, { useState, useRef, useEffect } from 'react';
import AnalyzeResult from './AnalyzeResult';
import CinematicError from './CinematicError';
import { aiService } from '../../../services/aiService';
import { AnalyzeDishResponse } from '../../../types/index';
import { 
  FileText, Sparkles, Loader2, X, Upload, 
  Film, Aperture, ArrowRight, Video, ScanLine, 
  ChefHat, Camera, Activity, // <--- ĐÃ THÊM IMPORT "Activity" Ở ĐÂY
  Maximize2, Focus
} from 'lucide-react';

const QUICK_CONTEXT_TAGS = [
  { label: 'Tên phim', value: 'Phim: ' },
  { label: 'Nhân vật', value: 'Nhân vật: ' },
  { label: 'Cảm xúc', value: 'Cảm xúc cảnh: ' }
];

// Thông báo trạng thái "lai" giữa Bếp và Phim trường (Tiếng Việt)
const LOADING_STEPS = [
  "🎬 Scene 1: Khởi tạo phim trường ảo...",
  "🔍 Scanning: Đang quét cấu trúc món ăn...",
  "🍳 Cooking: Đang giải mã nguyên liệu bí mật...",
  "🎞️ Editing: Truy xuất kho dữ liệu điện ảnh...",
  "✨ Grading: Tinh chỉnh hồ sơ hương vị...",
  "🍽️ Plating: Hoàn tất hồ sơ món ăn..."
];

const AnalyzeDish = () => {
  // --- STATE ---
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeDishResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<'safety' | 'error'>('error');
  const [dragActive, setDragActive] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // --- EFFECT: LOADING TEXT ---
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [loading]);

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
      const data = await aiService.analyzeDish(file, context);
      setResult(data);
    } catch (err: any) {
      console.error("Analyze Error:", err);
      const errorMessage = err.message || "Không thể phân tích ảnh.";
      if (errorMessage.toLowerCase().includes("safety") || errorMessage.toLowerCase().includes("vi phạm")) {
        setErrorType('safety');
        setError("Hình ảnh này có vẻ vi phạm tiêu chuẩn an toàn cộng đồng.");
      } else {
        setErrorType('error');
        setError(errorMessage);
      }
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
    if (inputRef.current) inputRef.current.value = '';
  };

  // --- RENDER ---

  // 1. Màn hình Lỗi
  if (error) return <CinematicError type={errorType} title="CẮT! CẢNH QUAY LỖI" description={error} onReset={() => setError(null)} />;
  
  // 2. Màn hình Kết quả
  if (result) {
    return (
      <AnalyzeResult 
        data={result} 
        imageUrl={previewUrl} // <--- TRUYỀN ẢNH VÀO ĐÂY
        onReset={handleReset} 
      />
    );
  }

  // 3. Màn hình Upload (HERO MODE - CAMERA LENS)
  if (!previewUrl) {
    return (
      <div className="relative w-full min-h-[650px] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 md:p-16 group bg-[#050505]">
        {/* Background: Film Grain + Gradient */}
        <div className="absolute inset-0 bg-film-grain opacity-30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-[#050505] to-blue-900/10 pointer-events-none"></div>
        
        {/* Rotating Lens Ring (Hiệu ứng ống kính máy quay) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-spin-slow pointer-events-none border-dashed"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-cine-gold/10 rounded-full animate-spin-reverse-slow pointer-events-none"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-10 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/60 border border-cine-gold/30 backdrop-blur-xl shadow-gold-glow">
             <Camera className="w-4 h-4 text-cine-gold" />
             <span className="w-px h-4 bg-white/20"></span>
             <span className="text-xs uppercase tracking-[0.3em] font-bold text-cine-gold">Chế độ Đạo diễn</span>
          </div>

          {/* Typography Title */}
          <div className="space-y-2">
            <h2 className="font-sans text-cine-gold text-sm font-bold tracking-[0.5em] uppercase opacity-80">Ống kính Điện ảnh</h2>
            <h1 className="font-serif text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-500 leading-none drop-shadow-xl">
              Food Lens
            </h1>
          </div>

          {/* UPLOAD ZONE - Viewfinder Style */}
          <div 
            className={`
              relative mt-8 mx-auto w-full max-w-xl aspect-video rounded-xl transition-all duration-500 cursor-pointer group/upload overflow-hidden bg-black
              ${dragActive 
                ? 'border-2 border-cine-gold bg-cine-gold/5 scale-105 shadow-gold-glow' 
                : 'border border-white/10 bg-white/5 hover:border-cine-gold/40 hover:bg-white/10 hover:shadow-2xl'}
            `}
            onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
             {/* Camera HUD Overlay */}
             <div className="absolute inset-4 border border-white/10 pointer-events-none opacity-50"></div>
             <div className="absolute top-4 left-4 w-3 h-3 border-t-2 border-l-2 border-cine-gold"></div>
             <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-cine-gold"></div>
             <div className="absolute bottom-4 left-4 w-3 h-3 border-b-2 border-l-2 border-cine-gold"></div>
             <div className="absolute bottom-4 right-4 w-3 h-3 border-b-2 border-r-2 border-cine-gold"></div>
             
             {/* Center Crosshair */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-50">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-px bg-cine-gold"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-cine-gold"></div>
             </div>

             <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
                <div className="w-20 h-20 rounded-full bg-[#111] border border-white/10 flex items-center justify-center group-hover/upload:scale-110 transition-transform duration-500 shadow-xl group-hover/upload:border-cine-gold/50">
                  <Upload className={`w-8 h-8 ${dragActive ? 'text-cine-gold' : 'text-gray-400 group-hover/upload:text-cine-gold transition-colors'}`} />
                </div>
                <div className="text-center space-y-1">
                   <p className="text-white font-display tracking-widest text-xl">TẢI CẢNH PHIM</p>
                   <p className="text-gray-500 text-[10px] font-mono uppercase tracking-wider">JPG, PNG, WEBP • TỐI ĐA 10MB</p>
                </div>
             </div>
          </div>
        </div>
        <input ref={inputRef} type="file" hidden onChange={handleInputChange} accept="image/*" />
      </div>
    );
  }

  // --- 4. MÀN HÌNH XỬ LÝ (DIRECTOR MONITOR) ---
  return (
    <div className="w-full bg-[#080808] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 lg:grid-cols-5 min-h-[700px] animate-fade-in relative">
      
      {/* CỘT TRÁI: MONITOR (60%) */}
      <div className="lg:col-span-3 relative bg-black flex items-center justify-center p-0 border-r border-white/10 overflow-hidden">
         
         {/* Layer 1: Film Grain */}
         <div className="absolute inset-0 bg-film-grain opacity-40 pointer-events-none z-20"></div>
         
         {/* Layer 2: Scanning Effects (Loading) */}
         {loading && (
           <div className="absolute inset-0 z-30 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cine-gold/10 to-transparent animate-scan-slow"></div>
              <div className="absolute top-1/2 left-0 w-full h-px bg-cine-gold/50 shadow-[0_0_20px_#E5C07B] animate-[scan_3s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-10 left-10 font-mono text-[10px] text-cine-gold space-y-1 opacity-80">
                 <div>TARGET: LOCK</div>
                 <div>CONFIDENCE: {(Math.random() * 100).toFixed(2)}%</div>
              </div>
           </div>
         )}

         {/* Layer 3: Image Container */}
         <div className="relative w-full h-full bg-[#050505] flex items-center justify-center">
            {/* Cinematic Bars (Letterbox) */}
            <div className="absolute top-0 left-0 w-full h-16 bg-black z-20 border-b border-white/5"></div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-black z-20 border-t border-white/5 flex items-center justify-between px-8">
               <div className="flex gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <span className={loading ? "text-cine-gold animate-pulse" : ""}>SHUTTER: 1/50</span>
                  <span className={loading ? "text-cine-gold animate-pulse" : ""}>ISO: 800</span>
                  <span className={loading ? "text-cine-gold animate-pulse" : ""}>FPS: 24</span>
               </div>
               <div className="flex items-center gap-2 text-cine-gold text-xs font-bold">
                  <Camera className="w-3 h-3" /> 
                  {loading ? 'TRỰC TIẾP' : 'CHỜ LỆNH'}
               </div>
            </div>

            <img 
              src={previewUrl} 
              alt="Subject" 
              className={`max-w-full max-h-[600px] object-contain transition-all duration-1000 ${loading ? 'scale-105 blur-[1px] opacity-80' : 'scale-100 opacity-100'}`} 
            />
            
            {/* Top HUD (Rec indicator) */}
            <div className="absolute top-6 left-6 flex items-center gap-4 z-30">
               <div className={`flex items-center gap-2 px-3 py-1 bg-red-900/20 border border-red-500/30 rounded text-red-500 text-[10px] font-bold uppercase tracking-widest ${loading ? 'animate-pulse shadow-red-glow' : ''}`}>
                 <div className={`w-2 h-2 rounded-full bg-red-500 ${loading ? 'animate-ping' : ''}`}></div> 
                 {loading ? 'REC • ĐANG XỬ LÝ' : 'PREVIEW'}
               </div>
            </div>

            {/* File Name & Close */}
            {!loading && (
              <div className="absolute top-6 right-6 z-30 flex gap-3">
                  <div className="px-3 py-1 bg-black/50 backdrop-blur border border-white/10 rounded text-[10px] text-gray-400 font-mono uppercase">
                    {file?.name.substring(0, 20)}...
                  </div>
                  <button onClick={handleReset} className="p-1 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/30 transition-colors group">
                    <X className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
                  </button>
              </div>
            )}
         </div>
      </div>

      {/* CỘT PHẢI: CONTROL PANEL (40%) */}
      <div className="lg:col-span-2 bg-[#0c0c0c] flex flex-col border-l border-white/5 relative overflow-hidden">
         {/* Background Glow */}
         <div className="absolute top-0 right-0 w-64 h-64 bg-cine-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

         {/* Header */}
         <div className="p-8 border-b border-white/5 relative z-10 bg-[#0c0c0c]/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-cine-gold text-[10px] font-bold uppercase tracking-[0.2em] mb-2">
                {/* Sử dụng icon Activity ở đây đã được import */}
                {loading ? <Activity className="w-3 h-3 animate-pulse" /> : <Film className="w-3 h-3" />}
                {loading ? 'TRẠNG THÁI HỆ THỐNG' : 'DỮ LIỆU CẢNH QUAY'}
            </div>
            <h2 className="font-display text-2xl text-white tracking-wide">
              {loading ? 'ĐANG GIẢI MÃ...' : 'THIẾT LẬP THÔNG SỐ'}
            </h2>
         </div>

         <div className="p-8 flex-1 flex flex-col space-y-6 relative z-10">
            {loading ? (
              // --- LOADING STATE ---
              <div className="flex flex-col items-center justify-center h-full space-y-10 animate-fade-in">
                 <div className="relative">
                    {/* Dual Spinners */}
                    <div className="w-24 h-24 rounded-full border-2 border-white/5 border-t-cine-gold animate-spin"></div>
                    <div className="w-16 h-16 rounded-full border-2 border-white/5 border-b-cine-burgundy animate-spin-reverse-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
                    <ChefHat className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                 </div>
                 
                 <div className="text-center space-y-3 max-w-xs">
                    <p className="text-cine-gold font-mono text-[10px] uppercase tracking-widest animate-pulse">
                      AI PROCESSOR ACTIVE
                    </p>
                    <p className="text-white font-serif text-xl leading-relaxed h-14 flex items-center justify-center transition-all duration-300">
                      {LOADING_STEPS[loadingStep]}
                    </p>
                 </div>

                 <div className="w-full bg-white/5 h-px relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-cine-gold to-transparent animate-shimmer"></div>
                 </div>
              </div>
            ) : (
              // --- INPUT STATE (Script Writing Style) ---
              <>
                <div className="space-y-4 group/input animate-fade-in">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-3 h-3" /> Ghi Chú (Kịch Bản)
                   </label>
                   
                   <div className="relative">
                     {/* Textarea kiểu Script */}
                     <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="// Nhập bối cảnh phim, nhân vật hoặc cảm xúc món ăn tại đây..."
                        className="w-full h-48 bg-[#050505] border border-white/10 rounded-sm p-5 text-sm text-gray-300 font-mono placeholder-gray-700 focus:outline-none focus:border-cine-gold focus:shadow-[0_0_20px_rgba(229,192,123,0.1)] transition-all resize-none leading-relaxed"
                     />
                     {/* Script Page Number Decoration */}
                     <div className="absolute top-2 right-3 text-[10px] text-gray-700 font-mono">P.01</div>
                     {/* Decorative corner */}
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 m-1"></div>
                   </div>
                   
                   {/* Quick Tags */}
                   <div className="flex flex-wrap gap-2">
                      {QUICK_CONTEXT_TAGS.map((tag, idx) => (
                        <button 
                          key={idx} 
                          onClick={() => !context.includes(tag.value) && setContext(context ? `${context}\n${tag.value}` : tag.value)}
                          className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 text-gray-400 border border-white/5 hover:border-cine-gold hover:text-cine-gold hover:bg-cine-gold/10 transition-all uppercase tracking-wider font-sans"
                        >
                          + {tag.label}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex-1"></div>

                <button 
                    onClick={handleAnalyze} 
                    className="w-full group relative py-5 rounded-xl bg-white text-black overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-gold-glow hover:bg-cine-gold transition-all duration-500"
                >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                        <ScanLine className="w-5 h-5" />
                        <span className="font-display text-lg tracking-widest font-bold">ACTION! (BẮT ĐẦU)</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
              </>
            )}
         </div>
      </div>
    </div>
  );
};

export default AnalyzeDish;