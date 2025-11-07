// src/components/browse/RecipeGrid.tsx
import RecipeCard from '../ui/RecipeCard';

// Kiểu dữ liệu mà RecipeCard của bạn đang mong đợi
type BrowseRecipeCard = {
  id: string;
  title: string;
  image: string;
  movieTitle: string;
  cookingTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  rating: number;
  reviewCount: number;
}

// Component "Khung xương" (skeleton)
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

// Props cho RecipeGrid
interface RecipeGridProps {
  isLoading: boolean;
  recipes: BrowseRecipeCard[];
}

export default function RecipeGrid({ isLoading, recipes }: RecipeGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => <RecipeCardSkeleton key={i} />)}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        <p>Không tìm thấy công thức nào phù hợp.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}