// src/types/index.ts
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

// (Recipe - Dạng tóm tắt cho trang Browse - giữ nguyên)
export interface Recipe {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  summary: string;
  mainImageUrl: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: number;
  servings: number;
  avgRating: number;
  createdAt: string;
  movieTitle: string;
  ratingsCount: number;
}

// --- THÊM CÁC INTERFACE MỚI CHO TRANG CHI TIẾT ---

// Khớp với RecipeStepDto.java
export interface RecipeStep {
  step: number;
  title: string;
  description: string;
  imageUrl: string | null;
}

// Khớp với RecipeIngredientDto.java
export interface RecipeIngredient {
  name: string;
  quantityUnit: string;
  isOptional: boolean;
}

// Khớp với AuthorDto
export interface RecipeAuthor {
  id: string;
  name: string;
  avatarUrl: string;
}

// Khớp với MovieDto
export interface RecipeMovie {
  title: string;
  year: number | null;
  posterUrl: string | null;
}

// Khớp với RecipeDetailResponse.java
export interface RecipeDetail {
  id: string;
  title: string;
  slug: string;
  summary: string; // Đây là 'description' trong file cũ
  difficulty: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  mainImageUrl: string;
  avgRating: number;
  ratingsCount: number;
  createdAt: string;
  
  ingredients: RecipeIngredient[];
  instructions: RecipeStep[];
  nutrition: Record<string, string>; // Dùng Record<string, string> cho Map
  author: RecipeAuthor;
  movie: RecipeMovie | null;
}