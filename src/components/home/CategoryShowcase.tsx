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
        className="relative w-full h-full rounded-2xl shadow-xl transition-all duration-500 ease-out [transform-style:preserve-3d] 
                   md:group-hover/card:shadow-2xl md:group-hover/card:shadow-amber-500/20"
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        {/* Image with enhanced zoom */}
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 ease-out md:group-hover/card:scale-115 brightness-90 md:group-hover/card:brightness-100" 
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-2xl"></div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 w-full h-full rounded-2xl opacity-0 md:group-hover/card:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white [transform:translateZ(60px)]">
          <h3 className="text-3xl font-bold tracking-tight drop-shadow-2xl mb-1 transform transition-transform duration-300 md:group-hover/card:translate-y-[-4px]">
            {category.name}
          </h3>
          <p className="text-base text-gray-200 opacity-100 md:opacity-0 md:group-hover/card:opacity-100 transition-all duration-300 ease-in-out drop-shadow-lg transform md:group-hover/card:translate-y-[-2px]">
            {category.description}
          </p>
        </div>
        
        {/* Border glow effect */}
        <div className="absolute inset-0 w-full h-full rounded-2xl border-2 border-transparent 
                      md:group-hover/card:border-amber-500/50 transition-all duration-300 ease-out [transform:translateZ(20px)]"></div>
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

      <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          {/* Header section */}
          <div className="text-center mb-20 px-4">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 bg-clip-text text-transparent">
              Khám Phá Theo Chủ Đề
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Lướt qua các thể loại món ăn và phim ảnh để tìm nguồn cảm hứng tiếp theo cho bạn.
            </p>
          </div>
          
          <div className="flex flex-col gap-16">
            {/* Food Categories */}
            <div>
              <div className="flex items-center gap-4 mb-8 pl-4 md:pl-8">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <Utensils className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">Thể Loại Món Ăn</h3>
                  <p className="text-sm text-gray-500 mt-1">Khám phá ẩm thực thế giới</p>
                </div>
              </div>
              <CategoryScroller categories={FOOD_CATEGORIES} direction="left" />
            </div>
            
            {/* Movie Categories */}
            <div>
              <div className="flex items-center justify-end gap-4 mb-8 pr-4 md:pr-8">
                <div>
                  <h3 className="text-3xl font-bold text-white text-right">Thể Loại Phim</h3>
                  <p className="text-sm text-gray-500 mt-1 text-right">Trải nghiệm điện ảnh đa dạng</p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20">
                  <Film className="w-6 h-6 text-red-400" />
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