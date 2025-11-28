import React from 'react';

// Định nghĩa enum tại đây
enum NarrativeStyle {
  COMIC_MODE = "Comic Mode",
  MYSTIC_WHISPER = "Mystic Whisper",
  ACTION_RUSH = "Action Rush",
  GHIBLI_SOFT_DREAM = "Ghibli Soft Dream",
  CYBERPUNK_LOGIC = "Cyberpunk Logic",
  ROMANCE_MOOD = "Romance Mood",
  DRAMA_DEEP = "Drama Deep",
  DEFAULT = "Standard"
}

interface Props {
  style: string; // Nhận string từ backend
}

const NarrativeBadge: React.FC<Props> = ({ style }) => {
  let classes = "px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg border backdrop-blur-md flex items-center gap-2";
  let label = style;
  let icon = "";

  // So sánh string thay vì enum
  switch (style) {
    case "Comic Mode":
      classes += " bg-yellow-500/90 text-black border-yellow-300 font-comic -rotate-1 shadow-[0_0_15px_rgba(234,179,8,0.5)]";
      icon = "💬";
      label = "Hài Hước / Comic";
      break;
    case "Mystic Whisper":
      classes += " bg-indigo-900/80 text-indigo-100 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]";
      icon = "🔮";
      label = "Huyền Bí / Mystic";
      break;
    case "Action Rush":
      classes += " bg-red-800/90 text-white border-red-500 italic skew-x-[-10deg] shadow-[0_0_15px_rgba(239,68,68,0.4)]";
      icon = "🔥";
      label = "Hành Động / Action";
      break;
    case "Ghibli Soft Dream":
      classes += " bg-teal-900/80 text-teal-100 border-teal-300 font-serif shadow-[0_0_15px_rgba(20,184,166,0.3)]";
      icon = "🍃";
      label = "Ghibli Êm Đềm";
      break;
    case "Cyberpunk Logic":
      classes += " bg-slate-900/90 text-cyan-400 border-cyan-400 font-mono shadow-[0_0_15px_rgba(6,182,212,0.5)]";
      icon = "🧬";
      label = "Cyberpunk / Tech";
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