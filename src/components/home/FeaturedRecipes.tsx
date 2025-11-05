import React, { useEffect, useRef, useState } from "react";
import { Star, Clock, Users, Bookmark, Flame, ChevronRight, ChevronLeft } from "lucide-react";

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  movieTitle: string;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  servings: number;
  summary: string;
  isNew?: boolean;
  isHot?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  title,
  image,
  movieTitle,
  cookingTime,
  difficulty,
  rating,
  servings,
  summary,
  isNew,
  isHot,
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const diffColors = {
    Easy: "bg-emerald-500",
    Medium: "bg-amber-500",
    Hard: "bg-rose-500",
  };

  const diffLabels = {
    Easy: "Dễ làm",
    Medium: "Trung bình",
    Hard: "Thử thách",
  };

  return (
    <div
      className="group relative h-full w-[340px] sm:w-[360px] flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative h-full rounded-2xl overflow-hidden border border-gray-700/30 
                   bg-gray-900/50 backdrop-blur-sm shadow-2xl 
                   transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-amber-500/30"
      >
        {/* Ảnh nền */}
        <div className="relative h-[500px] w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isHovered
                ? "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                : "bg-gradient-to-t from-black/95 via-black/20 to-transparent"
            }`}
          />

          {/* Tên phim - top left */}
          <div className="absolute top-4 left-4 z-30">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-white shadow-lg">
              <span className="text-sm">🎬</span>
              <span className="truncate max-w-[160px]">{movieTitle}</span>
            </div>
          </div>

          {/* Badge HOT / NEW - top left, dưới tên phim */}
          <div className="absolute top-16 left-4 z-30 flex gap-2">
            {isHot && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 text-xs font-bold text-white shadow-lg animate-pulse">
                <Flame className="w-3.5 h-3.5" /> HOT
              </div>
            )}
            {isNew && (
              <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-xs font-bold text-white shadow-lg">
                MỚI
              </div>
            )}
          </div>

          {/* Sao - top right */}
          <div
            className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 text-white font-bold text-sm shadow-lg"
          >
            <Star className="w-4 h-4 fill-white" />
            {rating}
          </div>

          {/* Bookmark - top right, dưới rating */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className={`absolute top-16 right-4 z-30 w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md shadow-lg
              transition-all duration-300 ${
                isSaved
                  ? "bg-amber-500 border-amber-300/50 scale-110"
                  : "bg-black/50 border-white/20 hover:bg-amber-500/80 hover:scale-110"
              }`}
          >
            <Bookmark className={`w-5 h-5 transition-all ${isSaved ? "fill-white text-white" : "text-white"}`} />
          </button>

          {/* Thông tin chi tiết */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
            <h3 className="text-2xl font-extrabold text-white mb-3 leading-tight drop-shadow-2xl">
              {title}
            </h3>

            {/* Mô tả - hiện khi hover */}
            <div
              className={`transition-all duration-500 ease-out ${
                isHovered ? "opacity-100 max-h-40 mb-4" : "opacity-0 max-h-0 mb-0"
              } overflow-hidden`}
            >
              <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-4 border border-amber-500/20 shadow-2xl">
                {/* Dấu ngoặc kép trang trí */}
                <div className="absolute -top-2 -left-2 text-4xl text-amber-500/30 font-serif leading-none">"</div>
                <div className="absolute -bottom-4 -right-2 text-4xl text-amber-500/30 font-serif leading-none">"</div>
                
                <p className="text-sm text-gray-100 leading-relaxed font-light tracking-wide relative z-10">
                  {summary}
                </p>
                
                {/* Đường viền phát sáng */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 blur-sm"></div>
              </div>
            </div>

            {/* Thông tin nhanh */}
            <div
              className={`flex flex-wrap items-center gap-2 mb-4 transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-md">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                {cookingTime}p
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-md">
                <Users className="w-3.5 h-3.5 text-sky-300" />
                {servings} người
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white text-xs font-medium shadow-md">
                <span className={`w-2 h-2 rounded-full ${diffColors[difficulty]}`} />
                {diffLabels[difficulty]}
              </div>
            </div>

            {/* Nút xem chi tiết */}
            <div
              className={`transition-all duration-500 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            >
              <button
                className="group/btn relative w-full py-3.5 rounded-xl font-bold text-white text-sm
                           bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600
                           shadow-xl shadow-amber-500/40 border border-amber-400/40
                           hover:shadow-2xl hover:shadow-amber-500/60 active:scale-[0.98] 
                           transition-all duration-300 overflow-hidden"
              >
                {/* Hiệu ứng sáng chạy */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                                translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000"></div>
                
                <span className="relative inline-flex items-center justify-center gap-2">
                  Xem chi tiết
                  <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AutoCarousel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const animationRef = useRef<number>();
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  // Kiểm tra khả năng scroll
  const checkScrollability = () => {
    const el = scrollRef.current;
    if (!el) return;
    
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let scrollX = 0;
    const speed = 0.5;

    const scroll = () => {
      if (!el || isPaused || isDraggingRef.current) {
        animationRef.current = requestAnimationFrame(scroll);
        return;
      }

      scrollX += speed;
      
      if (scrollX >= el.scrollWidth / 2) {
        scrollX = 0;
      }
      
      el.scrollLeft = scrollX;
      checkScrollability();
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Xử lý kéo chuột
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
    el.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    const el = scrollRef.current;
    if (!el) return;
    
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 2;
    el.scrollLeft = scrollLeftRef.current - walk;
    checkScrollability();
  };

  const handleMouseUpOrLeave = () => {
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = 'grab';
    }
    isDraggingRef.current = false;
  };

  // Scroll bằng nút
  const scrollTo = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    
    const scrollAmount = 380;
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
  const duplicatedChildren = [...childrenArray, ...childrenArray];

  return (
    <div 
      className="relative group/carousel"
      onMouseEnter={() => {
        setIsPaused(true);
        setShowControls(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setShowControls(false);
      }}
    >
      {/* Nút scroll trái */}
      <button
        onClick={() => scrollTo('left')}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full
                   bg-black/80 backdrop-blur-md border border-white/20
                   flex items-center justify-center
                   shadow-2xl shadow-black/50
                   transition-all duration-300
                   hover:bg-amber-500 hover:border-amber-400 hover:scale-110
                   active:scale-95
                   ${showControls && canScrollLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      {/* Nút scroll phải */}
      <button
        onClick={() => scrollTo('right')}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full
                   bg-black/80 backdrop-blur-md border border-white/20
                   flex items-center justify-center
                   shadow-2xl shadow-black/50
                   transition-all duration-300
                   hover:bg-amber-500 hover:border-amber-400 hover:scale-110
                   active:scale-95
                   ${showControls && canScrollRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div 
        ref={scrollRef} 
        className="overflow-x-auto whitespace-nowrap scrollbar-hide py-4 cursor-grab select-none"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onScroll={checkScrollability}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div className="inline-flex gap-6">
          {duplicatedChildren}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const recipes: RecipeCardProps[] = [
    {
      id: "1",
      title: "Big Kahuna Burger",
      image:
        "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1400",
      movieTitle: "Pulp Fiction",
      cookingTime: 25,
      difficulty: "Easy",
      rating: 4.6,
      servings: 1,
      summary:
        "Burger biểu tượng trong phim Pulp Fiction – lớp phô mai tan chảy và vị thịt đậm đà khó quên.",
      isHot: true,
    },
    {
      id: "2",
      title: "Ratatouille",
      image:
        "https://images.pexels.com/photos/8753657/pexels-photo-8753657.jpeg?auto=compress&cs=tinysrgb&w=1400",
      movieTitle: "Ratatouille",
      cookingTime: 65,
      difficulty: "Medium",
      rating: 4.9,
      servings: 6,
      summary:
        "Món rau củ cổ điển của Pháp, đậm đà và tinh tế như trong phim hoạt hình.",
      isNew: true,
    },
    {
      id: "3",
      title: "Mỳ Ý và Thịt viên",
      image:
        "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1400",
      movieTitle: "Lady and the Tramp",
      cookingTime: 50,
      difficulty: "Easy",
      rating: 4.7,
      servings: 2,
      summary:
        "Cảnh mỳ Ý lãng mạn nhất lịch sử điện ảnh, hoàn hảo cho bữa tối đôi lứa.",
      isHot: true,
      isNew: true,
    },
    {
      id: "4",
      title: "Sushi Nhật Bản",
      image:
        "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=1400",
      movieTitle: "Jiro Dreams of Sushi",
      cookingTime: 90,
      difficulty: "Hard",
      rating: 4.8,
      servings: 2,
      summary:
        "Tinh tế và tỉ mỉ đến từng lát cá – biểu tượng của ẩm thực Nhật Bản truyền thống.",
      isNew: true,
    },
    {
      id: "5",
      title: "Bánh Táo Mỹ",
      image:
        "https://images.pexels.com/photos/4110004/pexels-photo-4110004.jpeg?auto=compress&cs=tinysrgb&w=1400",
      movieTitle: "American Pie",
      cookingTime: 70,
      difficulty: "Medium",
      rating: 4.5,
      servings: 8,
      summary:
        "Món bánh ngọt mang đậm phong vị Mỹ, giòn tan và ngọt ngào như trong ký ức tuổi trẻ.",
      isHot: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight">
            Công thức{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">
              Nổi bật
            </span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Các món ăn điện ảnh tự động trượt liên tục 🍽️✨
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Kéo chuột hoặc dùng mũi tên để điều hướng • Hover để xem chi tiết
          </p>
        </div>

        <AutoCarousel>
          {recipes.map((r) => (
            <RecipeCard key={r.id} {...r} />
          ))}
        </AutoCarousel>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}