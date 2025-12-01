import React, { useState } from 'react';

// ============================================================================
// FLAVOR CHART COMPONENT
// ============================================================================

const FlavorChart = ({ data, color }) => {
  if (!data) return null;
  
  if (typeof data === 'string') {
    return (
      <div className="text-center text-white/60 text-sm italic py-8">
        {data}
      </div>
    );
  }
  
  // Vietnamese flavor labels (backend returns Vietnamese keys)
  const flavors = Object.entries(data);
  
  if (flavors.length === 0) return null;
  
  const centerX = 120;
  const centerY = 120;
  const maxRadius = 90;
  const levels = 5;
  
  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / flavors.length - Math.PI / 2;
    const radius = (value / 10) * maxRadius;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  };
  
  const dataPoints = flavors.map(([_, value], i) => {
    const numValue = typeof value === 'number' ? value : parseInt(value) || 0;
    return getPoint(i, numValue);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';
  
  return (
    <div className="relative">
      <svg viewBox="0 0 240 240" className="w-full">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        <circle cx={centerX} cy={centerY} r={maxRadius} fill="url(#radarGlow)" />
        
        {[...Array(levels)].map((_, i) => {
          const r = (maxRadius / levels) * (i + 1);
          return (
            <circle
              key={i}
              cx={centerX}
              cy={centerY}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}
        
        {flavors.map((_, i) => {
          const point = getPoint(i, 10);
          return (
            <line
              key={i}
              x1={centerX}
              y1={centerY}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
          );
        })}
        
        <path
          d={dataPath}
          fill={color}
          fillOpacity="0.3"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        
        {dataPoints.map((point, i) => (
          <g key={i}>
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
            />
          </g>
        ))}
        
        {flavors.map(([flavor], i) => {
          const angle = (Math.PI * 2 * i) / flavors.length - Math.PI / 2;
          const labelRadius = maxRadius + 20;
          const x = centerX + labelRadius * Math.cos(angle);
          const y = centerY + labelRadius * Math.sin(angle);
          
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white/90 font-semibold"
              style={{ fontSize: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}
            >
              {flavor}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// ============================================================================
// NARRATIVE BADGE COMPONENT - UPDATED 8 PERSONAS
// ============================================================================

const NarrativeBadge = ({ style }) => {
  const styleConfig = {
    'Comic Mode': { 
      icon: '💬', 
      vi: 'Hài Hước', 
      en: 'Comic',
      gradient: 'from-yellow-500 via-orange-500 to-red-600',
      glow: 'from-yellow-400 to-red-500',
      shadow: 'shadow-yellow-500/50'
    },
    'Action Rush': { 
      icon: '🔥', 
      vi: 'Hành Động', 
      en: 'Action',
      gradient: 'from-red-600 via-orange-600 to-red-700',
      glow: 'from-red-500 to-orange-500',
      shadow: 'shadow-red-500/50'
    },
    'Romance Mood': { 
      icon: '🌹', 
      vi: 'Lãng Mạn', 
      en: 'Romance',
      gradient: 'from-pink-600 via-rose-600 to-red-700',
      glow: 'from-pink-500 to-rose-500',
      shadow: 'shadow-pink-500/50'
    },
    'Drama Deep': { 
      icon: '🎭', 
      vi: 'Kịch Tính', 
      en: 'Drama',
      gradient: 'from-amber-700 via-orange-800 to-stone-900',
      glow: 'from-amber-600 to-orange-700',
      shadow: 'shadow-amber-500/50'
    },
    'Horror Night': { 
      icon: '👻', 
      vi: 'Kinh Dị', 
      en: 'Horror',
      gradient: 'from-red-950 via-black to-red-950',
      glow: 'from-red-900 to-black',
      shadow: 'shadow-red-900/60'
    },
    "Chef's Table": { 
      icon: '📺', 
      vi: 'Tài Liệu', 
      en: 'Documentary',
      gradient: 'from-stone-800 via-stone-900 to-stone-950',
      glow: 'from-stone-700 to-stone-800',
      shadow: 'shadow-stone-600/40'
    },
    'Anime Feast': { 
      icon: '🍜', 
      vi: 'Anime', 
      en: 'Shokugeki',
      gradient: 'from-orange-500 via-yellow-500 to-purple-600',
      glow: 'from-orange-400 to-purple-500',
      shadow: 'shadow-orange-500/60'
    },
    'Travel Discovery': { 
      icon: '🌍', 
      vi: 'Khám Phá', 
      en: 'Travel',
      gradient: 'from-teal-700 via-cyan-800 to-blue-900',
      glow: 'from-teal-600 to-blue-700',
      shadow: 'shadow-teal-500/40'
    }
  };
  
  const config = styleConfig[style] || { 
    icon: '🍳', 
    vi: 'Tiêu Chuẩn', 
    en: 'Standard',
    gradient: 'from-gray-600 via-gray-700 to-gray-800',
    glow: 'from-gray-500 to-gray-600',
    shadow: 'shadow-gray-500/50'
  };
  
  return (
    <div className="inline-block mb-6">
      <div className={`relative bg-gradient-to-r ${config.gradient} px-5 py-3 rounded-full shadow-xl border-2 border-white/20 hover:${config.shadow} hover:scale-105 transition-all duration-300 group`}>
        <div className={`absolute inset-0 bg-gradient-to-r ${config.glow} rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity -z-10`}></div>
        
        <div className="relative flex items-center gap-3">
          <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform drop-shadow-lg">{config.icon}</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-white text-sm sm:text-base font-black uppercase tracking-wider drop-shadow-md">{config.vi}</span>
            <span className="text-white/70 text-[10px] sm:text-xs font-bold uppercase tracking-wide">/ {config.en}</span>
          </div>
        </div>
        
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// HELPER FUNCTIONS - UPDATED COLOR FALLBACKS
// ============================================================================

const getFallbackColors = (styleString) => {
  const style = styleString.toLowerCase().replace(/\s+/g, '').replace("'", '');
  
  switch (style) {
    case 'comicmode': return ['#facc15', '#ef4444', '#2563eb'];
    case 'actionrush': return ['#7f1d1d', '#f97316', '#000000'];
    case 'romancemood': return ['#881337', '#ec4899', '#fb7185'];
    case 'dramadeep': return ['#451a03', '#78350f', '#171717'];
    case 'horrornight': return ['#1a0000', '#4a0000', '#0a0a0a'];
    case 'chefstable': return ['#1c1917', '#a8a29e', '#f5f5f4'];
    case 'animefeast': return ['#ff6b35', '#f7b731', '#5f27cd'];
    case 'traveldiscovery': return ['#006d77', '#83c5be', '#ffddd2'];
    default: return ['#0f172a', '#334155', '#94a3b8'];
  }
};

const getEffectiveColors = (data) => {
  if (data.visualColors && Array.isArray(data.visualColors) && data.visualColors.length >= 2) {
    const validColors = data.visualColors.filter(c => /^#[0-9A-Fa-f]{6}$/.test(c));
    if (validColors.length >= 2) return validColors;
  }
  return getFallbackColors(data.narrativeStyle);
};

// ============================================================================
// MOCK DATA - UPDATED
// ============================================================================

const mockData = {
  narrativeStyle: 'Anime Feast',
  recipeName: 'Ramen Bão Lửa Shokugeki',
  prepTime: '30 phút',
  cookTime: '2 giờ',
  connection: 'Một tô ramen không chỉ là món ăn - đó là chiến trường, là nghệ thuật, là linh hồn của đầu bếp!',
  story: 'Trong căn bếp nóng bỏng của học viện Totsuki, tiếng nước sôi vang lên như lời tuyên chiến. Đây không phải ramen thường - đây là vũ khí tối thượng! Mỗi sợi mì được kéo với độ chính xác nano-mét, nước dùng sôi ở 98.5°C - nhiệt độ hoàn hảo để giải phóng umami. Khi bạn nâng đũa lên, ánh sáng vàng óng bao trùm, mùi thơm bùng nổ khiến quần áo bay! TASTE THE POWER!',
  ingredients: [
    '400g mì ramen tươi cao cấp',
    '1.5L nước dùng heo + gà (ninh 12 giờ)',
    '200g thịt xá xíu đặc biệt',
    '2 quả trứng lòng đào hảo hạng',
    '100g măng tươi',
    '50g mộc nhĩ đen',
    '30g hành lá thái mỏng',
    'Tương miso đỏ 2 muống',
    'Dầu ớt cay nồng (tự chế)',
    'Nori, mè rang'
  ],
  instructions: [
    'CHUẨN BỊ! Ninh xương heo + gà với gừng, hành trong 12 giờ. Nước dùng phải TRONG VEO như pha lê!',
    'KÍCH HOẠT! Đun sôi nước dùng ở 98.5°C - nhiệt độ vàng để umami BÙNG NỔ!',
    'PHÁ! Luộc mì đúng 2 phút 30 giây. MỘT GIÂY SAI = THẤT BẠI!',
    'CHIẾN ĐẤU! Xếp mì vào tô, rưới nước dùng theo góc 45 độ tạo xoáy!',
    'TUYỆT CHIÊU! Đặt xá xíu hình quạt, trứng lòng đào giữa, măng + mộc nhĩ hai bên!',
    'HẬU KỲ! Rắc hành lá, nori, mè - TẠO HIỆU ỨNG ÁNH SÁNG!',
    'FOODGASM READY! Phục vụ ngay khi còn 85°C - NHIỆT ĐỘ HOÀN HẢO!'
  ],
  platingGuide: 'Tô ramen như sân khấu! Trứng lòng đào - ngôi sao chính giữa, xá xíu xếp hình cánh quạt tạo động thái, măng + mộc nhĩ hai bên cân bằng âm dương. Ánh nước dùng trong veo phản chiếu ánh đèn - khoảnh khắc này phải EPIC như anime opening!',
  pairing: 'Trà lạnh Nhật Bản hoặc Ramune soda',
  flavorProfile: {
    'Ngọt': 6,
    'Chua': 3,
    'Cay': 8,
    'Umami': 10,
    'Béo': 9
  },
  macros: {
    calories: '680',
    protein: '35g',
    carbs: '72g',
    fat: '28g'
  },
  musicRecommendation: 'Shokugeki no Soma - Spice',
  visualColors: ['#ff6b35', '#f7b731', '#5f27cd']
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const CreativeResult = ({ data = mockData, onReset = () => alert('Reset clicked') }) => {
  const [checkedIngredients, setCheckedIngredients] = useState(new Set());

  const toggleIngredient = (index) => {
    const next = new Set(checkedIngredients);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    setCheckedIngredients(next);
  };

  let colors = getEffectiveColors(data);
  if (colors.length < 3) colors.push(colors[0]);

  const [c1, c2, c3] = colors;

  const gradientStyle = {
    backgroundColor: '#050505',
    backgroundImage: `
        radial-gradient(at 0% 0%, ${c1} 0px, transparent 55%),
        radial-gradient(at 100% 0%, ${c2} 0px, transparent 50%),
        radial-gradient(at 100% 100%, ${c3} 0px, transparent 55%),
        radial-gradient(at 0% 100%, ${c1} 0px, transparent 50%)
    `,
    backgroundSize: '100% 100%',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="w-full max-w-[1600px] mx-auto px-4 py-8 md:py-12">
        
        {/* Navigation */}
        <button 
          onClick={onReset}
          className="mb-10 group flex items-center gap-3 text-sm font-semibold tracking-wide px-6 py-3 rounded-full bg-white/5 text-white backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-white/5"
        >
          <span className="text-lg group-hover:-translate-x-1 transition-transform duration-300">←</span>
          <span>Quay Lại Studio</span>
        </button>

        {/* Main Card */}
        <div 
          className="rounded-[2.5rem] overflow-hidden shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)] border border-white/10 relative text-white"
          style={gradientStyle}
        >
          {/* Animated Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-overlay opacity-40">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-[100px] animate-blob" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Grain Overlay */}
          <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-overlay"
               style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/noise.png')" }}>
          </div>

          {/* Hero Section */}
          <div className="relative p-8 md:p-12 lg:p-16 border-b border-white/10 backdrop-blur-[2px]">
            <div className="relative z-10 max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
                {/* Left: Title */}
                <div className="lg:col-span-8">
                  <NarrativeBadge style={data.narrativeStyle} />
                  
                  <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/60 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] break-words">
                    {data.recipeName}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 text-xs md:text-sm font-bold uppercase tracking-widest opacity-90">
                    <div className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                      <span className="text-amber-400">⏱️</span> Sơ chế: {data.prepTime}
                    </div>
                    <div className="flex items-center gap-2 bg-black/40 px-5 py-2.5 rounded-lg backdrop-blur-md border border-white/10 shadow-lg">
                      <span className="text-red-400">🔥</span> Nấu: {data.cookTime}
                    </div>
                  </div>
                </div>

                {/* Right: Director's Note */}
                <div className="lg:col-span-4">
                  <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative group hover:bg-white/15 transition-colors">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-500/80 rotate-2 opacity-80 shadow-sm"></div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70 mb-4 flex items-center gap-2">
                      <span>🎬</span> Góc Nhìn Đạo Diễn
                    </h3>
                    <p className="font-serif italic text-base md:text-lg leading-relaxed text-white drop-shadow-md">
                      "{data.connection}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="bg-black/30 backdrop-blur-xl">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Column: Story & Ingredients */}
                <div className="lg:col-span-4 p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col gap-10 bg-black/20">
                  
                  {/* Story Intro */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-amber-500/80 border-b border-white/10 pb-2">
                      Cốt Truyện (Intro)
                    </h3>
                    <p className="font-serif text-lg md:text-xl leading-relaxed text-gray-200 drop-shadow-sm">
                      {data.story}
                    </p>
                  </div>

                  {/* Ingredients */}
                  <div className="flex-grow">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-amber-500/80 border-b border-white/10 pb-2 flex justify-between items-center">
                      <span>Diễn Viên & Đạo Cụ</span>
                    </h3>
                    <ul className="space-y-3">
                      {data.ingredients.map((ing, i) => {
                        const isChecked = checkedIngredients.has(i);
                        return (
                          <li 
                            key={i} 
                            onClick={() => toggleIngredient(i)}
                            className={`flex items-start cursor-pointer group select-none transition-all p-3 rounded-xl border border-transparent ${isChecked ? 'bg-white/5 opacity-50' : 'bg-white/5 hover:bg-white/10 hover:border-white/20'}`}
                          >
                            <div className={`mt-1 mr-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${isChecked ? 'bg-green-500 border-green-500 text-black' : 'border-white/40 group-hover:border-white'}`}>
                              {isChecked && <span className="text-[10px] font-bold">✓</span>}
                            </div>
                            <span className={`text-sm md:text-base font-medium ${isChecked ? 'line-through decoration-white/50' : 'text-gray-100'}`}>
                              {ing}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Pairing Box */}
                  <div className="mt-auto bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-3 text-white/60">Gợi Ý "Combo"</h3>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-full text-2xl">🥂</div>
                      <div>
                        <p className="text-sm md:text-base font-bold text-white leading-tight">{data.pairing}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center Column: Instructions */}
                <div className="lg:col-span-5 p-8 md:p-10">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-10 text-amber-500/80 border-b border-white/10 pb-2">
                    Kịch Bản Hành Động
                  </h3>
                  
                  <div className="space-y-12 relative pl-4">
                    {/* Timeline Line */}
                    <div className="absolute left-[23px] top-6 bottom-6 w-[2px] bg-white/10"></div>

                    {data.instructions.map((step, i) => (
                      <div key={i} className="flex gap-6 md:gap-8 relative group">
                        {/* Step Number */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl border-2 border-white/20 bg-[#1a1a1a] z-10 transition-all group-hover:border-amber-500 group-hover:text-amber-500 group-hover:scale-110 shadow-lg">
                          {i + 1}
                        </div>
                        <div className="pt-1.5">
                          <p className="text-base md:text-lg leading-relaxed text-gray-200 group-hover:text-white transition-colors">
                            {step}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Plating Guide */}
                  <div className="mt-20 p-8 rounded-2xl border border-white/20 bg-gradient-to-br from-white/5 to-transparent relative overflow-hidden shadow-inner">
                    <div className="absolute -right-10 -top-10 text-9xl opacity-5 rotate-12">🎨</div>
                    <h4 className="font-bold uppercase text-xs tracking-widest mb-4 text-amber-500">Chỉ Đạo Nghệ Thuật (Plating Guide)</h4>
                    <p className="text-base md:text-lg italic text-white/90 font-serif leading-relaxed">{data.platingGuide}</p>
                  </div>
                </div>

                {/* Right Column: Stats */}
                <div className="lg:col-span-3 bg-black/40 backdrop-blur-2xl border-t lg:border-t-0 lg:border-l border-white/10 p-8 flex flex-col gap-8">
                  
                  {/* Flavor Profile Chart */}
                  <div className="bg-white/5 rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-3xl pointer-events-none opacity-20"
                         style={{ backgroundColor: c2 }}>
                    </div>
                    
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-center text-white/60">Hồ Sơ Hương Vị</h3>
                    <FlavorChart data={data.flavorProfile} color={c2} />
                  </div>

                  {/* Macros */}
                  <div className="bg-[#111] rounded-2xl border border-white/20 p-2 relative shadow-xl">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg whitespace-nowrap">
                      Dinh Dưỡng
                    </div>
                    
                    {typeof data.macros === 'string' ? (
                      <div className="text-center py-8 px-4 mt-3">
                        <p className="text-sm text-white/70 leading-relaxed">{data.macros}</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 text-center divide-x divide-y divide-white/10 mt-3">
                        {[
                          { val: data.macros.calories, label: 'Kcal', color: 'text-orange-400', glow: 'rgba(251,146,60,0.5)' },
                          { val: data.macros.protein, label: 'Protein', color: 'text-red-500', glow: 'rgba(239,68,68,0.5)' },
                          { val: data.macros.carbs, label: 'Carbs', color: 'text-yellow-400', glow: 'rgba(250,204,21,0.5)' },
                          { val: data.macros.fat, label: 'Fat', color: 'text-blue-400', glow: 'rgba(96,165,250,0.5)' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 group">
                            <div className={`text-lg md:text-xl font-black ${item.color} group-hover:scale-105 transition-transform`}
                                 style={{ filter: `drop-shadow(0 0 10px ${item.glow})` }}>
                              {item.val}
                            </div>
                            <div className="text-[8px] uppercase tracking-wider text-gray-500 mt-1">{item.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Soundtrack Vinyl */}
                  <div className="mt-auto group cursor-pointer relative">
                    <div className="bg-[#1a1a1a] rounded-xl p-5 border border-white/10 relative overflow-hidden transition-all group-hover:border-amber-500/50 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                      {/* Vinyl Graphic */}
                      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full border-[10px] border-[#0a0a0a] bg-[#1a1a1a] group-hover:animate-spin opacity-60 group-hover:opacity-100 transition-opacity"
                           style={{ animationDuration: '3s' }}>
                        <div className="absolute inset-0 border-[1px] border-white/10 rounded-full m-3"></div>
                        <div className="absolute inset-0 border-[1px] border-white/10 rounded-full m-6"></div>
                        <div className="absolute inset-0 w-8 h-8 bg-amber-600 rounded-full m-auto"></div>
                      </div>
                      
                      <div className="relative z-20 pr-10">
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-2">Nhạc Phim (OST)</div>
                        <div className="font-serif font-bold text-lg md:text-xl text-white leading-tight mb-3 group-hover:text-amber-500 transition-colors">
                          {data.musicRecommendation}
                        </div>
                        <div className="flex items-center gap-2 text-[9px] uppercase font-bold text-green-400">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                          </span>
                          Đang Phát
                        </div>
                      </div>
                    </div>
                    <a 
                      href={`https://www.youtube.com/results?search_query=${encodeURIComponent(data.musicRecommendation)} OST`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute inset-0 z-30"
                      aria-label={`Tìm nhạc ${data.musicRecommendation} trên YouTube`}
                    ></a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeResult;