import { useState } from 'react';
import AIHero from '../components/ai-studio/AIHero'; // Bạn có thể tách Header ra nếu muốn, hoặc để inline
import AITabs from '../components/ai-studio/AITabs';
import AnalyzeDish from '../components/ai-studio/AnalyzeDish';
import CreativeChef from '../components/ai-studio/CreativeChef';
import ChefChat from '../components/ai-studio/ChefChat';
import KitchenMentor from '../components/ai-studio/KitchenMentor';

export default function AIStudio() {
  const [activeTab, setActiveTab] = useState('analyze');

  return (
    <div className="min-h-screen pt-24 pb-20 bg-cinematic-darker relative overflow-hidden">
      {/* Background Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cinematic-accent/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in">
           <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              CineTaste <span className="text-transparent bg-clip-text bg-gradient-to-r from-cinematic-accent to-cinematic-gold">AI Studio</span>
           </h1>
           <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Không gian sáng tạo ẩm thực không giới hạn. Từ màn ảnh đến bàn ăn, với sự hỗ trợ của Trí tuệ Nhân tạo.
           </p>
        </div>

        {/* Navigation */}
        <AITabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Main Content Container */}
        <div className="mt-12 min-h-[600px]">
           {activeTab === 'analyze' && <AnalyzeDish />}
           {activeTab === 'create' && <CreativeChef />}
           {activeTab === 'chat' && <ChefChat />}
           {activeTab === 'mentor' && <KitchenMentor />}
        </div>

      </div>
    </div>
  );
}