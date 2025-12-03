import React, { useRef } from 'react';
import { Upload, Camera, Utensils, ChefHat, Paperclip, PenTool, Image as ImageIcon, Stamp } from 'lucide-react';

interface Props {
  file: File | null;
  preview: string | null;
  dishName: string;
  setFile: (f: File) => void;
  setPreview: (s: string) => void;
  setDishName: (s: string) => void;
  onSubmit: () => void;
}

const MentorInput: React.FC<Props> = ({ 
  file, preview, dishName, setFile, setPreview, setDishName, onSubmit 
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    // CARD TỔNG: Phong cách hồ sơ giấy cũ trên bàn gỗ
    <div className="w-full max-w-5xl mx-auto bg-[#f4f1ea] rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden relative font-serif animate-fade-in text-[#1a1a1a] border border-[#e5e5e5]">
      
      {/* Texture Giấy (Noise nhẹ) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-80 pointer-events-none"></div>
      
      {/* Viền trên trang trí */}
      <div className="h-1.5 w-full bg-[#2c2c2c]"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[600px] relative z-10">
        
        {/* --- CỘT TRÁI: KHUNG ẢNH (POLAROID STYLE) --- */}
        <div className="p-10 border-b md:border-b-0 md:border-r border-[#d6d3cd] border-dashed flex flex-col justify-center items-center bg-[#f0ede6]/50 relative">
           
           {/* Kẹp giấy trang trí */}
           <div className="absolute top-0 left-8 -mt-4 text-[#888] transform -rotate-6 z-20 drop-shadow-md">
              <Paperclip className="w-16 h-16" />
           </div>

           <div className="text-center mb-8">
             <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-[#1a1a1a] rounded-full mb-3 shadow-sm bg-white">
                <ChefHat className="w-7 h-7" />
             </div>
             <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#5a5a5a] mb-1">Hồ Sơ Dự Thi</h2>
             <h1 className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">Bằng Chứng<br/>Hình Ảnh</h1>
           </div>

           {/* --- SMART PHOTO FRAME --- */}
           {/* Khung ảnh Polaroid: Cố định tỷ lệ, tự động xử lý ảnh bên trong */}
           <div 
             onClick={() => inputRef.current?.click()}
             className={`
               w-full max-w-[320px] aspect-[3/4] bg-white p-3 pb-14 shadow-xl transition-all duration-500 transform group border border-gray-300 relative cursor-pointer
               ${preview ? 'rotate-1 hover:rotate-0 hover:scale-[1.01]' : '-rotate-1 hover:rotate-0 hover:shadow-2xl'}
             `}
           >
              {/* Vùng chứa ảnh: Tự động lấp đầy khoảng trống */}
              <div className="w-full h-full border border-gray-100 bg-[#f8f8f8] relative overflow-hidden">
                  
                  {preview ? (
                    <>
                        {/* 1. LỚP NỀN: Ảnh gốc phóng to + làm mờ (Lấp đầy khung) */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center blur-xl opacity-50 scale-125 transition-transform duration-700"
                            style={{ backgroundImage: `url(${preview})` }}
                        ></div>
                        
                        {/* 2. LỚP CHÍNH: Ảnh gốc hiển thị trọn vẹn (Không bị cắt) */}
                        <div className="relative z-10 w-full h-full p-2 flex items-center justify-center">
                            <img 
                                src={preview} 
                                alt="Dish Preview" 
                                className="max-w-full max-h-full object-contain shadow-lg rounded-[2px] border border-white/20" 
                            />
                        </div>

                        {/* Overlay: Nút đổi ảnh (Hiện khi hover) */}
                        <div className="absolute inset-0 z-20 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                            <span className="px-5 py-2.5 bg-white text-black font-bold uppercase text-xs tracking-wider rounded-full shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <ImageIcon className="w-4 h-4"/> Đổi Ảnh
                            </span>
                        </div>
                    </>
                  ) : (
                    // Trạng thái chưa có ảnh
                    <div className="w-full h-full flex flex-col items-center justify-center opacity-40 group-hover:opacity-70 transition-opacity border-2 border-dashed border-[#1a1a1a]/30 m-[-1px]">
                      <div className="w-16 h-16 border-2 border-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                         <Camera className="w-8 h-8 text-[#1a1a1a]" />
                      </div>
                      <p className="font-sans text-xs font-bold uppercase tracking-wider text-[#1a1a1a]">Dán Ảnh Vào Đây</p>
                      <p className="text-[9px] mt-1 font-sans text-[#666]">JPG, PNG (Max 10MB)</p>
                    </div>
                  )}
              </div>
              
              {/* Chữ viết tay mô phỏng */}
              <div className="absolute bottom-3 left-0 right-0 text-center font-handwriting text-[#4a4a4a] text-lg opacity-80 rotate-[-1deg]">
                 {preview ? "Vật Chứng A" : "Nơi dán ảnh"}
              </div>
              
              {/* Băng dính (Tape Effect) */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-yellow-200/40 backdrop-blur-[1px] shadow-sm transform rotate-2 border-l border-r border-white/30"></div>
           </div>
           
           <input ref={inputRef} type="file" hidden accept="image/*" onChange={handleFileChange} />
        </div>

        {/* --- CỘT PHẢI: FORM NHẬP LIỆU --- */}
        <div className="p-10 flex flex-col justify-center relative">
           
           {/* Con dấu: OFFICIAL ENTRY */}
           <div className="absolute top-8 right-8 pointer-events-none opacity-60 transform rotate-12 mix-blend-multiply">
              <div className="w-28 h-28 border-4 border-double border-[#991b1b] rounded-full flex flex-col items-center justify-center text-[#991b1b] animate-stamp-in">
                 <Stamp className="w-6 h-6 mb-1" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Hồ Sơ</span>
                 <span className="text-xl font-black uppercase tracking-tighter leading-none">Dự Thi</span>
              </div>
           </div>

           <div className="space-y-10 max-w-md mx-auto w-full relative z-10">
              
              <div className="border-b-2 border-[#1a1a1a] pb-4">
                <h3 className="text-2xl font-bold uppercase tracking-tight flex items-center gap-3 text-[#1a1a1a]">
                  <PenTool className="w-5 h-5" /> Thông Tin Ứng Viên
                </h3>
              </div>

              {/* Input Field */}
              <div className="space-y-8">
                <div className="group relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5a5a5a] block mb-2 group-focus-within:text-amber-600 transition-colors">
                    Tên Món Ăn (The Dish)
                  </label>
                  <div className="relative">
                    <Utensils className="absolute left-0 bottom-4 w-5 h-5 text-[#1a1a1a] transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-amber-600" />
                    <input 
                      type="text" 
                      value={dishName}
                      onChange={(e) => setDishName(e.target.value)}
                      placeholder="VD: Bò Wellington..."
                      className="w-full bg-transparent border-b-2 border-[#d6d3cd] py-3 pl-8 pr-4 text-2xl font-serif text-[#1a1a1a] placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Cam kết */}
                <div className="bg-white/60 p-5 border-l-4 border-[#1a1a1a] italic text-sm text-[#4a4a4a] leading-relaxed shadow-sm relative">
                  <span className="absolute -top-3 -left-2 text-4xl text-[#1a1a1a] opacity-10 font-serif">"</span>
                  Tôi xin nộp món ăn này để Hội Đồng Giám Khảo đánh giá. Tôi hiểu rằng mọi lời nhận xét sẽ rất thẳng thắn, mang tính xây dựng và là phán quyết cuối cùng.
                </div>
              </div>
              
              {/* Submit Button */}
              <button 
                onClick={onSubmit}
                disabled={!file || !dishName.trim()}
                className="w-full py-4 bg-[#1a1a1a] text-[#f4f1ea] font-bold text-xs uppercase tracking-[0.25em] hover:bg-[#000] transition-all shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 active:scale-[0.98] group rounded-sm"
              >
                <Upload className="w-4 h-4 group-hover:scale-110 transition-transform" /> 
                Gửi Đi Chấm Điểm
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default MentorInput;