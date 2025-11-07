import { Clock, ChefHat, Star, Film } from 'lucide-react';

interface RecipeCardProps {
  id: string;
  title: string;
  image: string;
  movieTitle: string;
  cookingTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  reviewCount: number;
}

export default function RecipeCard({
  id,
  title,
  image,
  movieTitle,
  cookingTime,
  difficulty,
  rating,
  reviewCount,
}: RecipeCardProps) {
  const difficultyColors = {
    Easy: 'text-green-400 bg-green-400/10',
    Medium: 'text-yellow-400 bg-yellow-400/10',
    Hard: 'text-red-400 bg-red-400/10',
  };

  return (
    <a href={`/recipe/${id}`} className="card group">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-cinematic-dark/80 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Film className="w-3 h-3 text-cinematic-gold" />
          <span className="text-xs text-gray-300">{movieTitle}</span>
        </div>

        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-cinematic-dark/80 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 text-cinematic-gold fill-cinematic-gold" />
          <span className="text-xs text-gray-300">{rating}</span>
          <span className="text-xs text-gray-500">({reviewCount})</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-cinematic-accent transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{cookingTime} min</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-400">
              <ChefHat className="w-4 h-4" />
              <span className={`px-2 py-0.5 rounded ${difficultyColors[difficulty]}`}>
                {difficulty}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
