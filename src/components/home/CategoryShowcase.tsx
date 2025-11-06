import React, { useRef, useState } from 'react';
import { Utensils, Film } from 'lucide-react';

// TYPES AND DATA
interface Category {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

const FOOD_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Món Á',
    imageUrl: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=1200&q=80',
    description: 'Hương vị đậm đà, tinh tế từ khắp châu Á.',
  },
  {
    id: 2,
    name: 'Món Âu',
    imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80',
    description: 'Sang trọng và cổ điển từ nền ẩm thực châu Âu.',
  },
  {
    id: 3,
    name: 'Hải Sản',
    imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=1200&q=80',
    description: 'Sự tươi ngon của biển cả trong từng món ăn.',
  },
  {
    id: 4,
    name: 'Món Chay',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80',
    description: 'Thanh đạm, tốt cho sức khoẻ và đầy sáng tạo.',
  },
  {
    id: 5,
    name: 'Tráng Miệng',
    imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80',
    description: 'Kết thúc ngọt ngào cho bữa ăn trọn vẹn.',
  },
];

const MOVIE_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Hành Động',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&q=80',
    description: 'Những pha rượt đuổi và cháy nổ mãn nhãn.',
  },
  {
    id: 2,
    name: 'Kinh Dị',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&q=80',
    description: 'Thót tim với những câu chuyện rùng rợn.',
  },
  {
    id: 3,
    name: 'Lãng Mạn',
    imageUrl: 'https://images.unsplash.com/photo-1581905764498-f1b60bae941a?w=1200&q=80',
    description: 'Những câu chuyện tình yêu đầy cảm xúc.',
  },
  {
    id: 4,
    name: 'Hài Kịch',
    imageUrl: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=1200&q=80',
    description: 'Tiếng cười sảng khoái và những phút giây thư giãn.',
  },
  {
    id: 5,
    name: 'Viễn Tưởng',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1200&q=80',
    description: 'Khám phá những thế giới vượt ngoài trí tưởng tượng.',
  },
];

// CATEGORY CARD COMPONENT
interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const { width, height, left, top } = rect;
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const rotateY = 12 * ((mouseX - width / 2) / (width / 2));
    const rotateX = -12 * ((mouseY - height / 2) / (height / 2));
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => setRotate({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      className="group/card w-full h-80 [perspective:1000px] cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative w-full h-full rounded-xl shadow-xl transition-all duration-500 ease-out 
                   [transform-style:preserve-3d] 
                   md:group-hover/card:shadow-2xl md:group-hover/card:shadow-amber-500/20"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        {/* Image with zoom */}
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="absolute inset-0 w-full h-full object-cover rounded-xl 
                     transition-transform duration-700 ease-out 
                     md:group-hover/card:scale-110 brightness-75 md:group-hover/card:brightness-90" 
        />
        
        {/* Gradient overlay - Cinema style */}
        <div className="absolute inset-0 w-full h-full 
                        bg-gradient-to-t from-black via-black/50 to-transparent rounded-xl"></div>
        
        {/* Spotlight effect */}
        <div className="absolute inset-0 w-full h-full rounded-xl 
                        bg-gradient-to-b from-amber-500/10 via-transparent to-transparent"></div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 w-full h-full rounded-xl opacity-0 
                        md:group-hover/card:opacity-100 transition-opacity duration-500 
                        bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white 
                        [transform:translateZ(60px)]">
          <h3 className="text-3xl font-bold tracking-tight drop-shadow-2xl mb-1 
                         transform transition-transform duration-300 
                         md:group-hover/card:translate-y-[-4px]">
            {category.name}
          </h3>
          <p className="text-base text-gray-300 opacity-100 md:opacity-0 
                        md:group-hover/card:opacity-100 transition-all duration-300 ease-in-out 
                        drop-shadow-lg transform md:group-hover/card:translate-y-[-2px]">
            {category.description}
          </p>
        </div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 w-full h-full rounded-xl border border-transparent 
                        md:group-hover/card:border-amber-500/50 transition-all duration-300 ease-out 
                        [transform:translateZ(20px)]"></div>
      </div>
    </div>
  );
};

// CATEGORY SCROLLER COMPONENT
interface CategoryScrollerProps {
  categories: Category[];
  direction: 'left' | 'right';
}

const CategoryScroller: React.FC<CategoryScrollerProps> = ({ categories, direction }) => {
  const duplicatedCategories = [...categories, ...categories];
  const duration = categories.length * 8;
  const animationStyle = {
    animation: `scroll ${duration}s linear infinite`,
    animationDirection: direction === 'left' ? 'normal' : 'reverse',
  };

  return (
    <div
      className="group w-full overflow-hidden"
      style={{ 
        maskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)', 
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 8%, white 92%, transparent)' 
      }}
    >
      <div 
        className="flex gap-8 py-6 w-max group-hover:[animation-play-state:paused]"
        style={animationStyle}
      >
        {duplicatedCategories.map((category, index) => (
          <div key={`${category.id}-${index}`} className="w-[260px] shrink-0 md:w-[320px]">
            <CategoryCard category={category} />
          </div>
        ))}
      </div>
    </div>
  );
};

// MAIN COMPONENT
const CategoryShowcase: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <section className="relative py-20 sm:py-24 bg-black overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Spotlight */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
                          bg-gradient-to-b from-amber-500/5 via-transparent to-transparent"></div>
          {/* Kitchen texture */}
          <div className="absolute inset-0 opacity-[0.02]" 
               style={{
                 backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
                 backgroundSize: '100% 40px'
               }}></div>
        </div>

        {/* Film strip decorations */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-30"></div>

        <div className="relative z-10">
          {/* Header section */}
          <div className="text-center mb-16 sm:mb-20 px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 
                            bg-zinc-900/50 backdrop-blur-sm rounded-full 
                            border border-zinc-800 mb-6">
              <Utensils className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium text-gray-400 tracking-wider uppercase">
                Categories
              </span>
              <Film className="w-4 h-4 text-amber-500" />
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white">
              Khám Phá Theo <span className="text-amber-500">Chủ Đề</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Lướt qua các thể loại món ăn và phim ảnh để tìm nguồn cảm hứng tiếp theo cho bạn
            </p>
          </div>
          
          <div className="flex flex-col gap-12 sm:gap-16">
            {/* Food Categories */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 pl-4 md:pl-8">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
                                rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <Utensils className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Thể Loại Món Ăn
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Khám phá ẩm thực thế giới
                  </p>
                </div>
              </div>
              <CategoryScroller categories={FOOD_CATEGORIES} direction="left" />
            </div>
            
            {/* Movie Categories */}
            <div>
              <div className="flex items-center justify-end gap-3 sm:gap-4 mb-6 sm:mb-8 pr-4 md:pr-8">
                <div className="text-right">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Thể Loại Phim
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Trải nghiệm điện ảnh đa dạng
                  </p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 
                                rounded-lg bg-amber-500/10 border border-amber-500/30">
                  <Film className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                </div>
              </div>
              <CategoryScroller categories={MOVIE_CATEGORIES} direction="right" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryShowcase;