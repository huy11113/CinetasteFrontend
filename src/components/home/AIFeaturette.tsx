// src/components/home/AIFeaturette.tsx
import { Sparkles, ArrowRight, Camera } from 'lucide-react';
import Button from '../ui/Button';

export default function AIFeaturette() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="relative rounded-2xl overflow-hidden">
        
        {/* Background với overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1600&q=80" 
            alt="Movie scene with food" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 py-16 sm:py-20 lg:py-24 px-8 sm:px-12 lg:px-16 max-w-3xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                        bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-cinematic-gold" />
            <span className="text-sm font-medium text-white">Tính năng mới</span>
          </div>
          
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Bạn có bao giờ thấy món ăn trong phim
            <br />
            và muốn <span className="text-cinematic-gold">nấu thử?</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
            Giờ đây, chỉ cần một bức ảnh từ cảnh phim yêu thích, công nghệ AI của chúng tôi 
            sẽ giúp bạn tìm ra công thức món ăn đó ngay lập tức.
          </p>
          
          {/* Features list */}
          <div className="space-y-3 mb-10">
            <div className="flex items-center gap-3 text-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-cinematic-gold" />
              <span>Nhận diện món ăn tự động từ hình ảnh</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-cinematic-gold" />
              <span>Gợi ý công thức phù hợp nhất</span>
            </div>
            <div className="flex items-center gap-3 text-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-cinematic-gold" />
              <span>Hoàn toàn miễn phí và dễ sử dụng</span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              as="link" 
              href="/scene-to-recipe" 
              size="lg" 
              className="inline-flex items-center justify-center gap-2" 
              variant="primary"
            >
              <Camera className="w-5 h-5" />
              <span>Khám phá ngay</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              as="link" 
              href="/browse" 
              size="lg" 
              variant="outline"
              className="inline-flex items-center justify-center gap-2
                       bg-white/5 backdrop-blur-sm border-white/20 hover:bg-white/10"
            >
              <span>Xem công thức mẫu</span>
            </Button>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}