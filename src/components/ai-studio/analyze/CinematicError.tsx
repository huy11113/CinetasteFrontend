// src/components/ai-studio/analyze/CinematicError.tsx
import React from 'react';
import { ShieldAlert, ImageOff, AlertTriangle, RefreshCw } from 'lucide-react';

interface CinematicErrorProps {
  type?: 'safety' | 'not_food' | 'error';
  title: string;
  description: string;
  onReset: () => void;
}

const CinematicError: React.FC<CinematicErrorProps> = ({ 
  type = 'error', 
  title, 
  description, 
  onReset 
}) => {
  
  // Cấu hình icon và màu sắc dựa trên loại lỗi
  const config = {
    safety: {
      icon: ShieldAlert,
      color: 'text-red-500',
      bg: 'bg-red-900/20',
      borderColor: 'border-red-500/30'
    },
    not_food: {
      icon: ImageOff,
      color: 'text-amber-500',
      bg: 'bg-amber-900/20',
      borderColor: 'border-amber-500/30'
    },
    error: {
      icon: AlertTriangle,
      color: 'text-rose-500',
      bg: 'bg-rose-900/20',
      borderColor: 'border-rose-500/30'
    }
  }[type];

  const Icon = config.icon;

  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center text-center bg-[#080808] p-12 rounded-3xl border border-white/10 shadow-cinema animate-fade-in relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${config.bg} rounded-full blur-[120px] pointer-events-none opacity-50`}></div>

        <div className={`w-24 h-24 rounded-full ${config.bg} border ${config.borderColor} flex items-center justify-center mb-8 animate-pulse-slow relative z-10`}>
           <Icon className={`w-12 h-12 ${config.color}`} />
        </div>
        
        <h3 className="text-4xl md:text-5xl font-serif text-white mb-6 relative z-10">{title}</h3>
        
        <p className="text-gray-400 font-sans font-light mb-12 max-w-lg leading-relaxed text-lg relative z-10">
          {description}
        </p>
        
        <button 
          onClick={onReset} 
          className="relative z-10 px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-cine-gold hover:text-black transition-all rounded-full shadow-lg hover:shadow-gold-glow flex items-center gap-3 group"
        >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Thử Ảnh Khác
        </button>
    </div>
  );
};

export default CinematicError;