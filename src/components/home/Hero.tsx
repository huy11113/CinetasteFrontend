// src/components/home/Hero.tsx
import { ArrowRight, Sparkles } from 'lucide-react';
import SearchBar from '../SearchBar';
import Button from '../Button';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ảnh nền */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3184192/pexels-photo-3184192.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Nền điện ảnh"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-cinematic-darker" />
      </div>

      {/* Nội dung */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-cinematic-gold via-cinematic-accent to-cinematic-gold bg-clip-text text-transparent">
              Thưởng Thức Phim
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Khám phá câu chuyện ẩm thực từ màn ảnh. Tái tạo các món ăn kinh điển và chia sẻ sáng tạo của bạn với cộng đồng.
          </p>

          <SearchBar
            placeholder="Tìm theo phim, món ăn, hoặc nguyên liệu..."
            className="max-w-3xl mx-auto mb-8"
          />

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button as="link" href="/browse" size="lg" className="gap-2 flex items-center">
              <span>Khám phá Công thức</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button as="link" href="/scene-to-recipe" variant="outline" size="lg" className="gap-2 flex items-center">
              <Sparkles className="w-5 h-5" />
              <span>Quét Cảnh Phim (AI)</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Hiệu ứng cuộn chuột */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-gray-400 rounded-full" />
        </div>
      </div>
    </section>
  );
}