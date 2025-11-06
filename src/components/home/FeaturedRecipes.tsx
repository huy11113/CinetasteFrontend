// src/components/home/FeaturedRecipes.tsx
import React, { useEffect, useRef, useState } from "react";
import { Star, Clock, Users, Bookmark, Flame, ChevronRight, ChevronLeft, Film, TrendingUp, ChefHat } from "lucide-react";
import { type Recipe } from '../../types';
import Button from '../Button';
import apiClient from '../../services/apiClient';

// --- HÀM HELPER ---
const mapDifficulty = (diff: number): 'Easy' | 'Medium' | 'Hard' => {
  if (diff <= 1) return 'Easy';
  if (diff >= 3) return 'Hard';
  return 'Medium';
};

// --- TYPES ---
interface FeaturedRecipeCardProps {
  id: string;
  title: string;
  mainImageUrl: string;
  movieTitle: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: number;
  avgRating: number;
  servings: number;
  summary: string;
  isNew?: boolean;
  isHot?: boolean;
}

const RecipeCard: React.FC<FeaturedRecipeCardProps> = ({
  id,
  title,
  mainImageUrl,
  movieTitle,
  prepTimeMinutes,
  cookTimeMinutes,
  difficulty,
  avgRating,
  servings,
  summary,
  isNew,
  isHot,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const totalCookingTime = (prepTimeMinutes || 0) + (cookTimeMinutes || 0);
  const difficultyLabel = mapDifficulty(difficulty);

  const diffColors = {
    Easy: "bg-green-500",
    Medium: "bg-amber-500",
    Hard: "bg-red-500",
  };

  const diffLabels = {
    Easy: "Dễ làm",
    Medium: "Trung bình",
    Hard: "Thử thách",
  };

  return (
    <a
      href={`/recipe/${id}`}
      className="group relative h-full w-[300px] sm:w-[340px] lg:w-[360px] flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full rounded-xl overflow-hidden border border-zinc-800 
                      bg-zinc-900/50 backdrop-blur-sm shadow-2xl 
                      transition-all duration-300 ease-out hover:-translate-y-2 
                      hover:shadow-2xl hover:shadow-amber-500/10 will-change-transform">
        
        {/* Ảnh nền */}
        <div className="relative h-[450px] sm:h-[500px] w-full overflow-hidden">
          <img
            src={mainImageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 
                       ease-out group-hover:scale-105 will-change-transform"
          />
          
          {/* Gradient overlay - Cinema style */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            isHovered
              ? "bg-gradient-to-t from-black/90 via-black/50 to-transparent"
              : "bg-gradient-to-t from-black via-black/30 to-transparent"
          }`} />
          
          {/* Spotlight effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />

          {/* Tên phim - top left */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 
                            rounded-lg bg-zinc-900/80 backdrop-blur-md border border-amber-500/30 
                            text-xs font-semibold text-white shadow-lg">
              <Film className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 flex-shrink-0" />
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{movieTitle}</span>
            </div>
          </div>

          {/* Badge HOT / NEW */}
          <div className="absolute top-12 sm:top-16 left-3 sm:left-4 z-30 flex gap-1.5 sm:gap-2">
            {isHot && (
              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 
                              rounded-lg bg-gradient-to-r from-orange-500 to-red-500 
                              text-xs font-bold text-white shadow-lg">
                <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" /> 
                <span className="hidden sm:inline">HOT</span>
              </div>
            )}
            {isNew && (
              <div className="inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 
                              rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 
                              text-xs font-bold text-white shadow-lg">
                <span className="hidden sm:inline">MỚI</span>
                <span className="sm:hidden">NEW</span>
              </div>
            )}
          </div>

          {/* Rating - top right */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 
                          flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 
                          rounded-lg bg-amber-500 text-black font-bold text-xs sm:text-sm shadow-lg">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black" />
            {avgRating.toFixed(1)}
          </div>

          {/* Bookmark */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            aria-label={isSaved ? "Bỏ lưu" : "Lưu công thức"}
            className={`absolute top-12 sm:top-16 right-3 sm:right-4 z-30 
                       w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center 
                       border backdrop-blur-md shadow-lg transition-all duration-200 ${
              isSaved
                ? "bg-red-500 border-red-400/50 scale-110"
                : "bg-black/60 border-zinc-700 hover:bg-amber-500/80 hover:border-amber-500 hover:scale-110"
            }`}
          >
            <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
              isSaved ? "fill-white text-white" : "text-white"
            }`} />
          </button>

          {/* Thông tin chi tiết */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 
                           leading-tight drop-shadow-2xl line-clamp-2">
              {title}
            </h3>

            {/* Mô tả - Hide on mobile, show on hover desktop */}
            <div className={`hidden sm:block transition-all duration-300 ease-out ${
              isHovered ? "opacity-100 max-h-40 mb-4" : "opacity-0 max-h-0 mb-0"
            } overflow-hidden will-change-auto`}>
              <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-xl p-4 
                              border border-amber-500/20 shadow-xl">
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                  {summary}
                </p>
              </div>
            </div>

            {/* Thông tin nhanh */}
            <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4 
                           sm:transition-all sm:duration-300 
                           ${isHovered ? "sm:opacity-100 sm:translate-y-0" : "sm:opacity-0 sm:translate-y-2"}
                           opacity-100 translate-y-0`}>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 
                              rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 
                              text-white text-xs font-medium shadow-md">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                {totalCookingTime}p
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 
                              rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 
                              text-white text-xs font-medium shadow-md">
                <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400" />
                <span className="hidden sm:inline">{servings} người</span>
                <span className="sm:hidden">{servings}</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 
                              rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 
                              text-white text-xs font-medium shadow-md">
                <span className={`w-2 h-2 rounded-full ${diffColors[difficultyLabel]}`} />
                <span className="hidden sm:inline">{diffLabels[difficultyLabel]}</span>
                <span className="sm:hidden">{difficultyLabel}</span>
              </div>
            </div>

            {/* Nút xem chi tiết */}
            <div className={`sm:transition-all sm:duration-300 
                           ${isHovered ? "sm:opacity-100 sm:translate-y-0" : "sm:opacity-0 sm:translate-y-2"}
                           opacity-100 translate-y-0`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = `/recipe/${id}`;
                }}
                className="group/btn relative w-full py-3 sm:py-3.5 rounded-lg 
                           font-bold text-black text-sm bg-amber-500 hover:bg-amber-600
                           shadow-lg shadow-amber-500/30 
                           hover:shadow-xl hover:shadow-amber-500/50 
                           active:scale-[0.98] transition-all duration-200 overflow-hidden">
                
                {/* Hiệu ứng sáng chạy */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"></div>
                
                <span className="relative inline-flex items-center justify-center gap-2">
                  <span className="hidden sm:inline">Xem chi tiết</span>
                  <span className="sm:hidden">Xem công thức</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

// --- MANUAL CAROUSEL ---
const ManualCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollability();
    window.addEventListener('resize', checkScrollability);

    return () => {
      window.removeEventListener('resize', checkScrollability);
    };
  }, []);

  const scrollTo = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    
    const scrollAmount = window.innerWidth < 640 ? 360 : 380;
    const targetScroll = direction === 'left' 
      ? el.scrollLeft - scrollAmount 
      : el.scrollLeft + scrollAmount;
    
    el.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    setTimeout(checkScrollability, 300);
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div 
      className="relative group/carousel"
      onMouseEnter={() => {
        setShowControls(true);
        checkScrollability();
      }}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Nút scroll trái */}
      <button
        onClick={() => scrollTo('left')}
        aria-label="Cuộn trái"
        className={`absolute left-2 sm:left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-40 
                    w-10 h-10 sm:w-12 sm:h-12 rounded-full
                    bg-zinc-900/90 backdrop-blur-md border border-zinc-800
                    flex items-center justify-center shadow-2xl shadow-black/50
                    transition-all duration-200
                    hover:bg-amber-500 hover:border-amber-500/40 hover:scale-110
                    active:scale-95
                    ${showControls && canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}
                    sm:opacity-0 sm:group-hover/carousel:opacity-100`}>
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Nút scroll phải */}
      <button
        onClick={() => scrollTo('right')}
        aria-label="Cuộn phải"
        className={`absolute right-2 sm:right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-40 
                    w-10 h-10 sm:w-12 sm:h-12 rounded-full
                    bg-zinc-900/90 backdrop-blur-md border border-zinc-800
                    flex items-center justify-center shadow-2xl shadow-black/50
                    transition-all duration-200
                    hover:bg-amber-500 hover:border-amber-500/40 hover:scale-110
                    active:scale-95
                    ${showControls && canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}
                    sm:opacity-0 sm:group-hover/carousel:opacity-100`}>
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      <div 
        ref={scrollRef} 
        className="overflow-x-auto whitespace-nowrap py-4 scroll-smooth
                   [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
                   -mx-2 px-2 sm:-mx-4 sm:px-4 lg:-mx-6 lg:px-6"
        onScroll={checkScrollability}
      >
        <div className="inline-flex gap-4 sm:gap-6">
          {childrenArray.map((child, index) => (
            <React.Fragment key={index}>{child}</React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- STATIC DATA ---
const STATIC_RECIPES: FeaturedRecipeCardProps[] = [
  {
    id: "static-1",
    title: "Big Kahuna Burger",
    mainImageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1400",
    movieTitle: "Pulp Fiction",
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    difficulty: 1,
    avgRating: 4.6,
    servings: 1,
    summary: "Burger biểu tượng trong phim Pulp Fiction – lớp phô mai tan chảy và vị thịt đậm đà khó quên.",
    isHot: true,
  },
  {
    id: "static-2",
    title: "Ratatouille",
    mainImageUrl: "https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=1400",
    movieTitle: "Ratatouille",
    prepTimeMinutes: 20,
    cookTimeMinutes: 45,
    difficulty: 2,
    avgRating: 4.9,
    servings: 6,
    summary: "Món rau củ cổ điển của Pháp, đậm đà và tinh tế như trong phim hoạt hình.",
    isNew: true,
  },
  {
    id: "static-3",
    title: "Mỳ Ý và Thịt viên",
    mainImageUrl: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1400",
    movieTitle: "Lady and the Tramp",
    prepTimeMinutes: 15,
    cookTimeMinutes: 35,
    difficulty: 1,
    avgRating: 4.7,
    servings: 2,
    summary: "Cảnh mỳ Ý lãng mạn nhất lịch sử điện ảnh, hoàn hảo cho bữa tối đôi lứa.",
    isHot: true,
    isNew: true,
  },
  {
    id: "static-4",
    title: "Sushi Nhật Bản",
    mainImageUrl: "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1400",
    movieTitle: "Jiro Dreams of Sushi",
    prepTimeMinutes: 90,
    cookTimeMinutes: 0,
    difficulty: 3,
    avgRating: 4.8,
    servings: 2,
    summary: "Tinh tế và tỉ mỉ đến từng lát cá – biểu tượng của ẩm thực Nhật Bản truyền thống.",
    isNew: true,
  },
  {
    id: "static-5",
    title: "Bánh Táo Mỹ",
    mainImageUrl: "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=1400",
    movieTitle: "American Pie",
    prepTimeMinutes: 25,
    cookTimeMinutes: 45,
    difficulty: 2,
    avgRating: 4.5,
    servings: 8,
    summary: "Món bánh ngọt mang đậm phong vị Mỹ, giòn tan và ngọt ngào như trong ký ức tuổi trẻ.",
    isHot: true,
  },
];

// --- MAIN COMPONENT ---
export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<FeaturedRecipeCardProps[]>(STATIC_RECIPES);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="relative py-16 sm:py-20 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
                        bg-gradient-to-b from-amber-500/5 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
               backgroundSize: '100% 40px'
             }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ChefHat className="w-5 h-5 text-amber-500" />
              <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                Featured
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Công thức Nổi bật
            </h2>
            <p className="text-sm sm:text-base text-gray-500">
              Những món ăn thịnh hành từ các bộ phim kinh điển
            </p>
          </div>
          
          <Button 
            as="link" 
            href="/browse" 
            className="hidden md:flex items-center gap-2 bg-transparent border-2 border-zinc-700 
                       hover:border-amber-500/50 text-white hover:bg-zinc-800/50">
            <TrendingUp className="w-4 h-4" />
            <span>Xem tất cả</span>
          </Button>
        </div>

        {/* Recipes Carousel */}
        {isLoading ? (
          <div className="flex gap-4 sm:gap-6 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-[300px] sm:w-[340px] lg:w-[360px] h-[450px] sm:h-[500px] 
                                      flex-shrink-0 bg-zinc-900 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <ManualCarousel>
            {recipes.map((r) => (
              <RecipeCard key={r.id} {...r} />
            ))}
          </ManualCarousel>
        )}

        {/* View All Button Mobile */}
        <div className="mt-8 flex justify-center md:hidden">
          <Button 
            as="link" 
            href="/browse" 
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 
                       text-black font-bold px-6 py-3">
            <TrendingUp className="w-4 h-4" />
            <span>Xem tất cả công thức</span>
          </Button>
        </div>
      </div>
    </section>
  );
}