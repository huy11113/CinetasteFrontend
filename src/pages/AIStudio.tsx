import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

// Import các component con
// Chú ý đường dẫn: ../components/...
import AITabs from '../components/ai-studio/AITabs';
import AnalyzeDish from '../components/ai-studio/analyze/AnalyzeDish';
import CreativeChef from '../components/ai-studio/CreativeChef'; // Đường dẫn đúng
import ChefChat from '../components/ai-studio/ChefChat';
import KitchenMentor from '../components/ai-studio/KitchenMentor';

export default function AIStudio() {
  // State quản lý Tab đang chọn
  const [activeTab, setActiveTab] = useState<'analyze' | 'create' | 'chat' | 'mentor'>('analyze');

  return (
    <div className="min-h-screen bg-[#050505] pb-20 relative">
      
      {/* ==============================================
          HERO SECTION (ẢNH BÌA ĐIỆN ẢNH)
      ============================================== */}
      <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden group">
        
        {/* 1. ẢNH NỀN (Background Image) */}
        <div className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop" 
             alt="Cinematic Food Background" 
             className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[20s] ease-linear"
           />
           {/* Lớp hạt nhiễu (Noise) tạo cảm giác phim nhựa */}
           <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none"></div>
        </div>

        {/* 2. LỚP PHỦ (Gradient Overlay) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#050505]"></div>

        {/* 3. NỘI DUNG TEXT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pt-10">
           
           {/* Badge trang trí */}
           <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md animate-fade-in">
              <Sparkles className="w-3 h-3 text-cine-gold animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-cine-gold uppercase font-sans">
                AI Culinary Cinema
              </span>
           </div>

           {/* Tiêu đề chính */}
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl animate-slide-up">
              CineTaste <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E5C07B] via-yellow-500 to-[#E5C07B]">AI Studio</span>
           </h1>

           {/* Mô tả */}
           <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Không gian sáng tạo ẩm thực không giới hạn. <br className="hidden md:block" />
              Từ màn ảnh đến bàn ăn, với sự hỗ trợ của <span className="text-white font-medium border-b border-cine-gold/50">Trí tuệ Nhân tạo</span>.
           </p>
        </div>
      </div>

      {/* ==============================================
          MAIN CONTENT CONTAINER
      ============================================== */}
      {/* -mt-20: Kỹ thuật Negative Margin để đẩy phần Tabs trồi lên trên ảnh Hero */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        
        {/* Navigation Tabs */}
        <div className="mb-8 shadow-2xl rounded-xl">
           <AITabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Khu vực hiển thị chức năng chính */}
        <div className="min-h-[600px] animate-fade-in">
           
           {/* Tab 1: Phân tích ảnh */}
           {activeTab === 'analyze' && <AnalyzeDish />}
           
           {/* Tab 2: Sáng tạo (Đã sửa lỗi import) */}
           {activeTab === 'create' && <CreativeChef />}
           
           {/* Tab 3: Trò chuyện (Placeholder) */}
           {activeTab === 'chat' && (
             <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-12 text-center">
                <ChefChat />
             </div>
           )}
           
           {/* Tab 4: Giám khảo (Placeholder) */}
           {activeTab === 'mentor' && (
             <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-12 text-center">
                <KitchenMentor />
             </div>
           )}
        </div>

      </div>
    </div>
  );
}