// src/components/home/Hero.tsx
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
// 1. IMPORT COMPONENT BUTTON THẬT TỪ DỰ ÁN CỦA BẠN
import Button from '../Button';

// Dữ liệu cho 4 slides (Giữ nguyên)
const slideData = [
  {
    title: 'Trợ Lý AI Thông Minh',
    subtitle: 'Quét một cảnh phim bất kỳ, và để AI tìm công thức cho bạn.',
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=1920&q=80',
    link: '/scene-to-recipe',
    buttonText: 'Thử Ngay AI Scene',
  },
  {
    title: 'Nếm Vị Điện Ảnh',
    subtitle: 'Tái tạo những món ăn kinh điển từ các bộ phim yêu thích của bạn.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
    link: '/browse',
    buttonText: 'Khám Phá Công Thức',
  },
  {
    title: 'Khám Phá Phim Mới',
    subtitle: 'Duyệt qua bộ sưu tập phim và các công thức được truyền cảm hứng.',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&q=80',
    link: '/browse',
    buttonText: 'Duyệt Phim',
  },
  {
    title: 'Tham Gia Cộng Đồng',
    subtitle: 'Kết nối, chia sẻ thành quả và học hỏi từ hàng ngàn đầu bếp tại gia.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80',
    link: '/community',
    buttonText: 'Tham Gia Ngay',
  },
];

// 2. ĐÃ XÓA mock component 'Button' (vì chúng ta đã import Button thật)

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
    <>
      {/* 3. ĐÃ XÓA <style> tag. Chúng ta sẽ dùng animation từ tailwind.config.js */}

      {/* 4. SỬA MÀU NỀN: 'to-slate-950' đổi thành 'to-cinematic-darker' cho khớp theme */}
      <section className="relative w-full h-[65vh] min-h-[500px] md:h-[75vh] md:min-h-[600px] lg:h-[85vh] lg:min-h-[700px] overflow-hidden">
        {slideData.map((slide, index) => {
          // const Icon = slide.icon; // Đã xóa icon
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Ảnh nền với parallax effect */}
              <div className="absolute inset-0 scale-105">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Lớp phủ gradient (ĐÃ SỬA MÀU) */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-cinematic-darker" />
              
              {/* Vignette effect (Giữ nguyên) */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />

              {/* Nội dung text */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8">
                {/* 5. SỬA ANIMATION: Dùng animation 'animate-fade-in' và 'animate-slide-up' từ theme */}
                <div 
                  key={currentIndex} 
                  className="animate-fade-in animate-slide-up max-w-5xl mx-auto"
                >
                  {/* 6. ĐÃ BỎ: Icon badge */}

                  {/* Title (Giữ nguyên, kích thước rất tốt) */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-white leading-tight drop-shadow-2xl">
                    {slide.title}
                  </h1>

                  {/* Subtitle (Giữ nguyên, kích thước rất tốt) */}
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-4">
                    {slide.subtitle}
                  </p>

                  {/* 7. SỬA BUTTON: Dùng component Button thật của dự án */}
                  <Button 
                    as="link" // Prop `as` để biến nó thành thẻ <Link>
                    href={slide.link} 
                    size="lg" // Prop `size="lg"` để có padding và font-size lớn
                    className="gap-2 md:gap-3"
                  >
                    <span>{slide.buttonText}</span>
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                  </Button>

                  {/* 8. ĐÃ BỎ: Scroll indicator (con chuột) */}
                </div>
              </div>
            </div>
          );
        })}

        {/* Navigation dots (ĐÃ SỬA MÀU) */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-2 md:space-x-3">
          {slideData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              // 9. SỬA MÀU: 'bg-amber-500' -> 'bg-cinematic-accent'
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 md:w-10 h-3 md:h-3.5 bg-cinematic-accent'
                  : 'w-3 md:w-3.5 h-3 md:h-3.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* 10. ĐÃ BỎ: Arrow navigation (mũi tên trái/phải) */}
      </section>
    </>
  );
}