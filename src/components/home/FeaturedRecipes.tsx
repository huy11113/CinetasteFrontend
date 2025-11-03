// src/components/home/FeaturedRecipes.tsx
import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import RecipeCard from '../RecipeCard';
import Button from '../Button';
import apiClient from '../../services/apiClient';
import { type Recipe } from '../../types'; // Import kiểu Recipe


// Hàm chuyển đổi độ khó từ số (backend 1,2,3) sang chữ (frontend)
const mapDifficulty = (diff: number): 'Easy' | 'Medium' | 'Hard' => {
  if (diff <= 1) return 'Easy'; // Giả sử 1 là dễ
  if (diff >= 3) return 'Hard'; // Giả sử 3 là khó
  return 'Medium'; // 2 là trung bình
};

// Component "Khung xương" (skeleton) để hiển thị khi đang tải
const RecipeCardSkeleton = () => (
  <div className="card animate-pulse">
    <div className="relative overflow-hidden aspect-[4/3] bg-cinematic-gray-light"></div>
    <div className="p-4">
      <div className="h-6 bg-cinematic-gray-light rounded w-3/4 mb-3"></div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-cinematic-gray-light rounded w-1/4"></div>
        <div className="h-4 bg-cinematic-gray-light rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      try {
        // Gọi API backend: Lấy 6 công thức, sắp xếp theo avgRating giảm dần
        const response = await apiClient.get('/recipes', {
          params: { page: 0, size: 6, sort: 'avgRating,desc' }
        });
        setRecipes(response.data.content || []);
      } catch (error) {
        console.error("Lỗi khi tải công thức nổi bật:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="section-title">Công thức Nổi bật</h2>
          <p className="text-gray-400">Những món ăn thịnh hành từ các bộ phim kinh điển</p>
        </div>
        <Button as="link" href="/browse" variant="outline" className="hidden md:flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span>Xem tất cả</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading 
          ? (
            // Hiển thị 6 khung xương khi đang tải
            [...Array(6)].map((_, i) => <RecipeCardSkeleton key={i} />)
          ) 
          : (
            // Hiển thị dữ liệu thật sau khi tải xong
            recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.mainImageUrl || 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=800'} // Ảnh dự phòng
                movieTitle={recipe.movieTitle || 'Phim'}
                cookingTime={(recipe.prepTimeMinutes || 0) + (recipe.cookTimeMinutes || 0)}
                difficulty={mapDifficulty(recipe.difficulty)}
                rating={recipe.avgRating}
                reviewCount={recipe.ratingsCount}
              />
            ))
          )}
      </div>
    </section>
  );
}