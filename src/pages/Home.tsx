// src/pages/Home.tsx
import Hero from '../components/home/Hero';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import AIFeaturette from '../components/home/AIFeaturette';
import CookingChallenges from '../components/home/CookingChallenges';
import CommunityCTA from '../components/home/CommunityCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. Phần Banner chính */}
      <Hero />
      
      {/* 2. Phần Công thức Nổi bật (Đã kết nối Backend) */}
      <FeaturedRecipes />
      
      {/* 3. Mục mới: Quảng bá AI */}
      <AIFeaturette />
      
      {/* 4. Phần Thử thách Nấu ăn */}
      <CookingChallenges />
      
      {/* 5. Phần Kêu gọi tham gia (Sẽ tự động ẩn nếu đã đăng nhập) */}
      <CommunityCTA />
    </div>
  );
}