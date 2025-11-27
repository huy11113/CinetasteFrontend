import React from 'react';
import { ScanSearch, Wand2, MessageSquare, GraduationCap, LucideIcon } from 'lucide-react';

interface AITabsProps {
  activeTab: string;
  setActiveTab: (tab: 'analyze' | 'create' | 'chat' | 'mentor') => void;
}

// Danh sách Tab đúng theo yêu cầu của bạn
const tabs: { id: 'analyze' | 'create' | 'chat' | 'mentor'; label: string; icon: LucideIcon }[] = [
  { id: 'analyze', label: 'Phân Tích Món', icon: ScanSearch },
  { id: 'create', label: 'Sáng Tạo', icon: Wand2 },
  { id: 'chat', label: 'Trò Chuyện', icon: MessageSquare },
  { id: 'mentor', label: 'Giám Khảo', icon: GraduationCap },
];

const AITabs: React.FC<AITabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="sticky top-0 z-30 w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        {/* Container cuộn ngang (Horizontal Scroll) cho Mobile */}
        <div className="flex items-center justify-start md:justify-center overflow-x-auto no-scrollbar py-3 md:py-4 gap-3 md:gap-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 shrink-0 group
                  ${isActive 
                    ? 'bg-cine-gold/10 text-cine-gold shadow-[0_0_20px_rgba(229,192,123,0.2)] border border-cine-gold/30' 
                    : 'text-gray-500 hover:text-gray-200 hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                {/* Icon với hiệu ứng phát sáng khi active */}
                <Icon 
                  className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(229,192,123,0.5)]' : 'group-hover:scale-110'}`} 
                />
                
                {/* Label */}
                <span className={`text-sm font-bold tracking-wide uppercase whitespace-nowrap font-sans ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                  {tab.label}
                </span>

                {/* Active Indicator Dot (chỉ hiện trên Desktop) */}
                {isActive && (
                  <span className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-12 h-[2px] bg-cine-gold shadow-[0_0_10px_#E5C07B] hidden md:block rounded-t-full"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* CSS ẩn thanh cuộn */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default AITabs;