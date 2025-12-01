import React from 'react';

interface Props {
  style: string; // Nhận string từ backend
}

const NarrativeBadge: React.FC<Props> = ({ style }) => {
  let classes = "px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg border backdrop-blur-md flex items-center gap-2";
  let label = style;
  let icon = "";

  // So sánh string với 8 personas mới từ backend
  switch (style) {
    case "Comic Mode":
      classes += " bg-yellow-500/90 text-black border-yellow-300 font-comic -rotate-1 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
      icon = "💬";
      label = "Hài Hước / Comic";
      break;
    
    case "Action Rush":
      classes += " bg-red-800/90 text-white border-red-500 italic skew-x-[-10deg] shadow-[0_0_15px_rgba(239,68,68,0.4)]";
      icon = "🔥";
      label = "Hành Động / Action";
      break;
    
    case "Romance Mood":
      classes += " bg-pink-900/80 text-pink-200 border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)]";
      icon = "🌹";
      label = "Lãng Mạn / Romance";
      break;
    
    case "Drama Deep":
      classes += " bg-amber-950/80 text-amber-100 border-amber-700 font-serif shadow-[0_0_15px_rgba(180,83,9,0.3)]";
      icon = "🎭";
      label = "Tâm Lý / Drama";
      break;
    
    case "Horror Night":
      classes += " bg-red-950/90 text-red-100 border-red-600 shadow-[0_0_20px_rgba(127,29,29,0.6)] animate-pulse";
      icon = "👻";
      label = "Kinh Dị / Horror";
      break;
    
    case "Chef's Table":
      classes += " bg-stone-900/85 text-stone-100 border-stone-400 font-serif shadow-[0_0_15px_rgba(168,162,158,0.3)]";
      icon = "📺";
      label = "Tài Liệu / Documentary";
      break;
    
    case "Anime Feast":
      classes += " bg-gradient-to-r from-orange-600 to-purple-600 text-white border-yellow-400 font-bold shadow-[0_0_20px_rgba(255,107,53,0.5)] animate-shimmer";
      icon = "🍜";
      label = "Anime / Shokugeki";
      break;
    
    case "Travel Discovery":
      classes += " bg-teal-800/85 text-teal-100 border-teal-300 shadow-[0_0_15px_rgba(131,197,190,0.4)]";
      icon = "🌍";
      label = "Khám Phá / Travel";
      break;
    
    default:
      classes += " bg-gray-700 text-white border-gray-500";
      icon = "🍳";
      label = "Tiêu Chuẩn";
  }

  return (
    <div className="flex justify-start mb-6 animate-fade-in">
      <span className={classes}>
        <span className="text-base">{icon}</span>
        {label}
      </span>
    </div>
  );
};

export default NarrativeBadge;