import React from 'react';
import { 
  CheckCircle2, AlertCircle, TrendingUp, RefreshCw, 
  ChefHat, Eye, Wrench, Quote, MapPin, Award
} from 'lucide-react';

// Interface kết quả AI
interface CritiqueDishResponse {
  critique: string;
  score: number;
  appearance_score: number;
  technique_score: number;
  creativity_score: number;
  visual_analysis: string;
  technical_analysis: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  level_assessment: string;
  comparable_restaurant?: string;
}

interface Props {
  data: CritiqueDishResponse;
  dishImage: string;
  dishName: string;
  onReset: () => void;
}

// Chuẩn hóa điểm về thang 100
const normalizeScore = (score: number) => {
  return score <= 10 ? Math.round(score * 10) : Math.round(score);
};

// Thanh điểm dạng Sketch
const SketchScoreBar = ({ label, rawScore }: { label: string, rawScore: number }) => {
  const score100 = normalizeScore(rawScore);

  const getColor = (s: number) => {
    if (s >= 80) return 'bg-[#15803d]';
    if (s >= 65) return 'bg-[#0369a1]';
    if (s >= 50) return 'bg-[#a16207]';
    return 'bg-[#b91c1c]';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="font-serif font-bold text-[#4a4a4a] text-xs uppercase tracking-wider">{label}</span>
        <span className="font-mono font-bold text-[#2c2c2c] text-sm">{score100}/100</span>
      </div>
      <div className="w-full h-2 border border-[#2c2c2c] rounded-full p-[1px] bg-white">
        <div 
          className={`h-full rounded-full ${getColor(score100)} transition-all duration-1000 ease-out`}
          style={{ width: `${score100}%`, backgroundImage: 'url("https://www.transparenttextures.com/patterns/sketch-header.png")' }}
        ></div>
      </div>
    </div>
  );
};

const JudgeScorecard: React.FC<Props> = ({ data, dishImage, dishName, onReset }) => {
  const finalScore = normalizeScore(data.score);

  // Xếp hạng con dấu Michelin
  const getRankStamp = (score: number) => {
    if (score >= 90) return { label: "XUẤT SẮC", color: "text-[#b91c1c] border-[#b91c1c]", rotate: "-rotate-12" };
    if (score >= 80) return { label: "RẤT TỐT", color: "text-[#1d4ed8] border-[#1d4ed8]", rotate: "rotate-6" };
    if (score >= 65) return { label: "ĐẠT", color: "text-[#15803d] border-[#15803d]", rotate: "-rotate-6" };
    if (score >= 50) return { label: "TRUNG BÌNH", color: "text-[#4b5563] border-[#4b5563]", rotate: "rotate-3" };
    return { label: "KHÔNG ĐẠT", color: "text-[#991b1b] border-[#991b1b]", rotate: "-rotate-12" };
  };

  const stamp = getRankStamp(finalScore);

  return (
    <div className="w-full min-h-screen bg-[#1c1917] flex items-center justify-center p-4 md:p-8 font-serif relative overflow-hidden">

      {/* Nền gỗ */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-30 pointer-events-none"></div>

      {/* Tờ giấy chính */}
      <div className="relative w-full max-w-6xl bg-[#fdfbf7] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] p-6 md:p-10 text-[#2c2c2c] rounded-sm">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-[#2c2c2c] pb-6 mb-10 border-double">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="w-16 h-16 border-2 border-[#2c2c2c] rounded-full flex items-center justify-center">
                  <ChefHat className="w-8 h-8" />
              </div>
              <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-[#1a1a1a]">Đánh Giá Ẩm Thực Michelin</h1>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#5a5a5a]">Báo Cáo Đánh Giá Chính Thức</p>
              </div>
          </div>
          <div className="text-right">
              <div className="text-sm font-mono text-[#5a5a5a]">Mã báo cáo: #{Math.floor(Math.random() * 10000)}</div>
              <div className="text-sm font-mono text-[#5a5a5a]">Ngày: {new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* CỘT TRÁI */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* Ảnh món ăn kiểu Polaroid */}
            <div className="bg-white p-3 pb-12 shadow-lg transform -rotate-2 border border-gray-200 relative">
                <div className="aspect-square overflow-hidden bg-gray-100">
                    <img src={dishImage} alt="Dish" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-4 left-0 right-0 text-center font-handwriting text-gray-600 text-xl font-bold">
                    "{dishName}"
                </div>
            </div>

            {/* Con dấu đánh giá */}
            <div className="relative flex justify-center py-6">
                <div className={`
                    border-[6px] border-double p-6 rounded-full w-48 h-48 flex flex-col items-center justify-center text-center
                    ${stamp.rotate} ${stamp.color} bg-white/30 backdrop-blur-sm opacity-90
                `}>
                    <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Điểm Tổng</span>
                    <span className="text-6xl font-black font-mono">{finalScore}</span>
                    <span className="text-sm font-bold uppercase tracking-widest border-t-2 border-current pt-1 mt-1">
                      {stamp.label}
                    </span>
                </div>
            </div>

            {/* Trình độ */}
            <div className="bg-[#2c2c2c] text-[#f4f1ea] p-6 rounded-sm shadow-md text-center">
                <Award className="w-8 h-8 mx-auto mb-2 text-amber-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Trình độ</h3>
                <div className="text-xl font-bold font-serif text-white">{data.level_assessment}</div>

                {data.comparable_restaurant && (
                  <div className="mt-3 pt-3 border-t border-gray-600 text-xs text-gray-400 flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3" /> Tương đương tại: 
                      <span className="text-amber-400 italic">{data.comparable_restaurant}</span>
                  </div>
                )}
            </div>

          </div>

          {/* CỘT PHẢI */}
          <div className="lg:col-span-8 space-y-8">

            {/* Nhận xét Michelin */}
            <div className="relative pl-8">
                <Quote className="absolute top-0 left-0 w-6 h-6 text-[#2c2c2c] opacity-20" />
                <h3 className="font-bold uppercase text-xs tracking-[0.2em] text-[#8c8680] mb-3">
                  Nhận xét của giám khảo Michelin
                </h3>
                <p className="text-xl text-[#2c2c2c] font-serif italic leading-relaxed border-l-4 border-[#c2410c] pl-4">
                    "{data.critique}"
                </p>
            </div>

            {/* Phân tích sâu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#f0f9ff] p-5 rounded-sm border border-blue-200 shadow-sm">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-blue-900 mb-3 flex items-center gap-2">
                        <Eye className="w-4 h-4" /> Phân tích thị giác
                    </h4>
                    <p className="text-sm text-blue-900/80 text-justify">{data.visual_analysis}</p>
                </div>
                <div className="bg-[#faf5ff] p-5 rounded-sm border border-purple-200 shadow-sm">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-purple-900 mb-3 flex items-center gap-2">
                        <Wrench className="w-4 h-4" /> Phân tích kỹ thuật
                    </h4>
                    <p className="text-sm text-purple-900/80 text-justify">{data.technical_analysis}</p>
                </div>
            </div>

            {/* Điểm */}
            <div className="bg-white p-6 rounded-sm border border-[#d6d3cd] shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SketchScoreBar label="Trình bày" rawScore={data.appearance_score} />
                    <SketchScoreBar label="Kỹ thuật" rawScore={data.technique_score} />
                    <SketchScoreBar label="Sáng tạo" rawScore={data.creativity_score} />
                </div>
            </div>

            {/* Điểm mạnh – yếu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h4 className="flex items-center gap-2 text-[#15803d] font-bold uppercase text-xs tracking-wider border-b pb-2">
                       <CheckCircle2 className="w-4 h-4" /> Điểm mạnh
                    </h4>
                    <ul className="space-y-2 mt-3">
                      {data.strengths.map((s, i) => (
                        <li key={i} className="text-[#4a4a4a] text-sm flex gap-2">
                           <span className="text-[#15803d] font-bold">✓</span> {s}
                        </li>
                      ))}
                    </ul>
                </div>

                <div>
                    <h4 className="flex items-center gap-2 text-[#b91c1c] font-bold uppercase text-xs tracking-wider border-b pb-2">
                       <AlertCircle className="w-4 h-4" /> Cần cải thiện
                    </h4>
                    <ul className="space-y-2 mt-3">
                      {data.weaknesses.map((w, i) => (
                        <li key={i} className="text-[#4a4a4a] text-sm flex gap-2">
                           <span className="text-[#b91c1c] font-bold">•</span> {w}
                        </li>
                      ))}
                    </ul>
                </div>
            </div>

            {/* Bí quyết Michelin */}
            <div className="relative mt-4">
                <div className="bg-[#fef3c7] p-6 shadow-lg border border-yellow-200/50">
                    <h4 className="flex items-center gap-2 text-[#92400e] font-bold uppercase text-xs tracking-wider mb-3">
                       <TrendingUp className="w-4 h-4" /> Gợi ý tinh chỉnh từ giám khảo Michelin
                    </h4>
                    <ul className="space-y-2">
                       {data.suggestions.map((s, i) => (
                         <li key={i} className="text-[#78350f] text-sm flex gap-2">
                            <span>•</span> {s}
                         </li>
                       ))}
                    </ul>
                </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-2 border-[#2c2c2c] border-dashed flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
              <div className="font-handwriting text-4xl text-[#2c2c2c] transform -rotate-2 font-bold">
                  Giám khảo AI – Michelin
              </div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500 border-t pt-1">
                  Chữ ký chính thức
              </div>
          </div>

          <button 
            onClick={onReset}
            className="px-8 py-4 bg-[#1a1a1a] text-[#f4f1ea] font-bold text-xs uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-xl flex items-center gap-3 transform hover:-translate-y-1"
          >
            <RefreshCw className="w-4 h-4" /> Đánh giá món khác
          </button>
        </div>

      </div>
    </div>
  );
};

export default JudgeScorecard;
