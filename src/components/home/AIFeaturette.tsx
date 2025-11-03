// src/components/home/AIFeaturette.tsx
import { Sparkles, ArrowRight } from 'lucide-react';
import Button from '../Button';
import { Link } from 'react-router-dom';

export default function AIFeaturette() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative rounded-2xl overflow-hidden border border-gray-800">
        {/* Lớp nền mờ */}
        <div className="absolute inset-0 bg-cinematic-gray opacity-50"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Phần hình ảnh */}
          <div className="relative h-64 md:h-full min-h-[300px]">
            <img 
              src="https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="AI Feature" 
              className="w-full h-full object-cover" 
            />
            {/* Lớp mờ gradient che ảnh */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-cinematic-gray via-cinematic-gray/70 to-transparent"></div>
          </div>
          
          {/* Phần nội dung */}
          <div className="relative p-8 md:p-12">
            <Sparkles className="w-12 h-12 text-cinematic-gold mb-4" />
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Không biết tên món ăn?
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Sử dụng tính năng "Trợ lý AI" của chúng tôi. Chỉ cần tải lên một cảnh phim, và để AI tìm công thức cho bạn.
            </p>
            <Button as="link" href="/scene-to-recipe" size="lg" className="gap-2 flex items-center">
              <span>Thử ngay bây giờ</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}