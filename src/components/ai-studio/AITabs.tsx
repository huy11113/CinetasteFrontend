import { ScanSearch, Wand2, MessageSquare, GraduationCap, CalendarDays, Microscope } from 'lucide-react';

interface AITabsProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export default function AITabs({ activeTab, onChange }: AITabsProps) {
  const tabs = [
    { id: 'analyze', label: 'Phân Tích Món', icon: ScanSearch, desc: 'Từ ảnh ra công thức' },
    { id: 'create', label: 'Sáng Tạo', icon: Wand2, desc: 'Theo chủ đề & cảm xúc' },
    { id: 'chat', label: 'Trò Chuyện', icon: MessageSquare, desc: 'Hỏi đáp tự do' },
    { id: 'mentor', label: 'Giám Khảo', icon: GraduationCap, desc: 'Chấm điểm món nấu' },
  ];

  const futureTabs = [
    { id: 'planner', label: 'Meal Plan', icon: CalendarDays },
    { id: 'ingredients', label: 'Soi Nguyên Liệu', icon: Microscope },
  ];

  return (
    <div className="flex flex-col items-center mb-10">
      {/* Main Tabs */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`relative group flex flex-col items-center justify-center p-4 w-32 sm:w-40 h-28 rounded-2xl border transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-cinematic-accent/10 border-cinematic-accent text-white shadow-glow-red transform scale-105'
                : 'bg-cinematic-gray/50 border-gray-800 text-gray-400 hover:bg-cinematic-gray hover:border-gray-600 hover:text-white'
            }`}
          >
            <div className={`p-2 rounded-full mb-2 transition-colors ${
              activeTab === tab.id ? 'bg-cinematic-accent text-white' : 'bg-gray-800 group-hover:bg-gray-700'
            }`}>
              <tab.icon className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm">{tab.label}</span>
            <span className="text-[10px] opacity-60 mt-1">{tab.desc}</span>
            
            {activeTab === tab.id && (
              <div className="absolute inset-0 rounded-2xl bg-cinematic-accent/5 animate-pulse pointer-events-none" />
            )}
          </button>
        ))}
      </div>

   
     
    </div>
  );
}