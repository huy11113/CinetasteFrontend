// src/types/index.ts
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

// Kiểu dữ liệu này khớp với RecipeResponse.java từ backend của bạn
export interface Recipe {
  id: string;
  title: string;
  mainImageUrl: string;
  movieTitle: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: number; // Backend gửi 1 (Easy), 2 (Medium), 3 (Hard)
  avgRating: number;
  ratingsCount: number;
}