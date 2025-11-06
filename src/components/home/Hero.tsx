// src/components/home/Hero.tsx
import { useState, useEffect } from 'react';
import { ArrowRight, Film, ChefHat, Users, Sparkles } from 'lucide-react';
import Button from '../Button';

// Dữ liệu cho 4 slides
const slideData = [
  {
    title: 'Trợ Lý AI Thông Minh',
    subtitle: 'Quét một cảnh phim bất kỳ, và để AI tìm công thức cho bạn.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1920&q=80',
    link: '/scene-to-recipe',
    buttonText: 'Thử Ngay AI Scene',
    icon: Sparkles,
  },
  {
    title: 'Nếm Vị Điện Ảnh',
    subtitle: 'Tái tạo những món ăn kinh điển từ các bộ phim yêu thích của bạn.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
    link: '/browse',
    buttonText: 'Khám Phá Công Thức',
    icon: ChefHat,
  },
  {
    title: 'Khám Phá Phim Mới',
    subtitle: 'Duyệt qua bộ sưu tập phim và các công thức được truyền cảm hứng.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80',
    link: '/browse',
    buttonText: 'Duyệt Phim',
    icon: Film,
  },
  {
    title: 'Tham Gia Cộng Đồng',
    subtitle: 'Kết nối, chia sẻ thành quả và học hỏi từ hàng ngàn đầu bếp tại gia.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
    link: '/community',
    buttonText: 'Tham Gia Ngay',
    icon: Users,
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tự động đổi slide mỗi 6 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Chuyển slide thủ công
  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <section className="relative w-full h-[65vh] min-h-[500px] md:h-[75vh] md:min-h-[600px] lg:h-[85vh] lg:min-h-[700px] overflow-hidden bg-black">
      
      {slideData.map((slide, index) => {
        const Icon = slide.icon;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Ảnh nền */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Lớp phủ gradient đen cinema */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
            
            {/* Spotlight effect từ trên xuống */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent" />
            
            {/* Vignette effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]" />

            {/* Kitchen texture overlay */}
            <div className="absolute inset-0 opacity-[0.03]" 
                 style={{
                   backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)',
                   backgroundSize: '100% 40px'
                 }} />

            {/* Film strips decoration */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />

            {/* Nội dung text */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
              <div 
                key={`content-${currentIndex}`} 
                className="max-w-5xl mx-auto"
                style={{
                  animation: index === currentIndex ? 'fadeInUp 0.8s ease-out' : 'none'
                }}
              >
                {/* Icon badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 
                                rounded-full bg-amber-500/10 backdrop-blur-sm border-2 border-amber-500/30 
                                mb-6 md:mb-8">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
                </div>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
                               font-bold mb-4 md:mb-6 text-white leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl 
                              text-gray-300 mb-8 md:mb-10 max-w-3xl mx-auto 
                              leading-relaxed px-4">
                  {slide.subtitle}
                </p>

                {/* Button */}
                <Button 
                  as="link"
                  href={slide.link} 
                  size="lg"
                  className="inline-flex items-center gap-2 md:gap-3 
                             bg-amber-500 hover:bg-amber-600 text-black font-bold
                             shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40
                             transition-all hover:scale-105"
                >
                  <span>{slide.buttonText}</span>
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation dots */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2 md:gap-3">
        {slideData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-8 md:w-10 h-3 md:h-3.5 bg-amber-500'
                : 'w-3 md:w-3.5 h-3 md:h-3.5 bg-white/30 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Inline keyframes animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}