// creative/NarrativeBadge.tsx

export enum NarrativeStyle {
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
  style: NarrativeStyle;
}

export default function NarrativeBadge({ style }: Props) {
  let classes = "px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg border backdrop-blur-md flex items-center gap-2";
  let label = style.toString();
  let icon = "";

  switch (style) {
    case NarrativeStyle.COMIC_MODE:
      classes += " bg-yellow-400/90 text-black border-black -rotate-1";
      icon = "💬";
      label = "Hài Hước / Comic";
      break;
    case NarrativeStyle.MYSTIC_WHISPER:
      classes += " bg-purple-900/80 text-purple-100 border-purple-400 shadow-purple-500/30";
      icon = "🔮";
      label = "Huyền Bí / Mystic";
      break;
    case NarrativeStyle.ACTION_RUSH:
      classes += " bg-red-700/80 text-white border-red-500 italic skew-x-[-10deg]";
      icon = "🔥";
      label = "Hành Động / Action";
      break;
    case NarrativeStyle.GHIBLI_SOFT_DREAM:
      classes += " bg-green-100/90 text-green-800 border-green-300";
      icon = "🍃";
      label = "Ghibli Êm Đềm";
      break;
    case NarrativeStyle.CYBERPUNK_LOGIC:
      classes += " bg-slate-900/90 text-cyan-400 border-cyan-400 font-mono shadow-[0_0_10px_rgba(34,211,238,0.5)]";
      icon = "🧬";
      label = "Cyberpunk / Tech";
      break;
    case NarrativeStyle.ROMANCE_MOOD:
      classes += " bg-pink-100/90 text-pink-600 border-pink-300";
      icon = "🌹";
      label = "Lãng Mạn / Romance";
      break;
    case NarrativeStyle.DRAMA_DEEP:
      classes += " bg-gray-800/90 text-gray-200 border-gray-500";
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
}