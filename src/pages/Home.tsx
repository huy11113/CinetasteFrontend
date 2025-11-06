// src/pages/Home.tsx
import Hero from '../components/home/Hero';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import CategoryShowcase from '../components/home/CategoryShowcase'; // Component từ lần trước
import AIFeaturette from '../components/home/AIFeaturette';
import Testimonials from '../components/home/Testimonials'; 
import CommunityCTA from '../components/home/CommunityCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Phần Banner chính */}
      <Hero />
      
      {/* 2. Phần cuộn thể loại */}
      <CategoryShowcase />
      
      {/* 3. Phần Công thức Nổi bật */}
      <FeaturedRecipes />
      
      {/* 4. Mục quảng bá AI */}
      <AIFeaturette />
    

      {/* 6. THÊM MỚI: Phần Bình luận/Nhận xét */}
      <Testimonials />
      
      {/* 7. Phần Kêu gọi tham gia (Sẽ tự động ẩn nếu đã đăng nhập) */}
      <CommunityCTA />
    </div>
  );
}