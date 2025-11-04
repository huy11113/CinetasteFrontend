// src/pages/Home.tsx
import Hero from '../components/home/Hero';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import AIFeaturette from '../components/home/AIFeaturette';
import CookingChallenges from '../components/home/CookingChallenges';
import CommunityCTA from '../components/home/CommunityCTA';
import CategoryShowcase from '../components/home/CategoryShowcase'; // <-- 1. THÊM IMPORT

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Phần Banner chính (Đã sửa) */}
      <Hero />
      
      {/* 2. THÊM MỚI: Phần cuộn thể loại */}
      <CategoryShowcase />
      
      {/* 3. Phần Công thức Nổi bật */}
      <FeaturedRecipes />
      
      {/* 4. Mục mới: Quảng bá AI */}
      <AIFeaturette />
      
      {/* 5. Phần Thử thách Nấu ăn */}
      <CookingChallenges />
      
      {/* 6. Phần Kêu gọi tham gia (Sẽ tự động ẩn nếu đã đăng nhập) */}
      <CommunityCTA />
    </div>
  );
}