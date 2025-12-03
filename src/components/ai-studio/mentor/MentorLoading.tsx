import React, { useEffect, useState } from 'react';
import { ChefHat, Feather } from 'lucide-react';

const STEPS = [
  "Đang quan sát cách trình bày...",
  "Đang phân tích kết cấu món ăn...",
  "Đang đánh giá kỹ thuật nấu...",
  "Đang viết nhận xét cuối cùng..."
];

const MentorLoading = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[600px] flex flex-col items-center justify-center bg-[#f4f1ea] rounded-sm shadow-2xl relative overflow-hidden animate-fade-in border border-[#d6d3cd]">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60 pointer-events-none"></div>
      
      {/* Vết cà phê (Trang trí) */}
      <div className="absolute top-10 right-20 w-32 h-32 border-4 border-[#8b5a2b]/10 rounded-full blur-[1px] transform scale-110 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-[#1a1a1a]">
        
        {/* Animated Icon */}
        <div className="mb-8 relative">
           <div className="w-24 h-24 border-2 border-[#1a1a1a] rounded-full flex items-center justify-center animate-pulse bg-white">
              <ChefHat className="w-10 h-10" />
           </div>
           {/* Bút lông vũ đang viết */}
           <div className="absolute -right-6 -bottom-2 animate-bounce">
              <Feather className="w-12 h-12 text-[#5a5a5a] transform -rotate-12" />
           </div>
        </div>

        {/* Status Text */}
        <h3 className="text-3xl font-serif font-bold mb-3 tracking-tight">Hội Đồng Đang Thảo Luận</h3>
        
        <div className="h-8 flex items-center justify-center overflow-hidden">
           <p className="font-handwriting text-xl text-[#5a5a5a] italic animate-slide-up key-{currentStep}">
             {STEPS[currentStep]}
           </p>
        </div>

        {/* Progress Bar cổ điển */}
        <div className="w-64 h-1 bg-[#d6d3cd] mt-8 relative rounded-full overflow-hidden">
           <div 
             className="absolute top-0 left-0 h-full bg-[#1a1a1a] transition-all duration-1000 ease-out"
             style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
           ></div>
        </div>

      </div>
    </div>
  );
};

export default MentorLoading;5