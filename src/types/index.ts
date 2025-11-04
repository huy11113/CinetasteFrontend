// src/types/index.ts
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

// Kiểu dữ liệu này khớp với RecipeResponse.java từ backend của bạn
export interface Recipe {
  id: string;
  authorId: string; // Thêm
  title: string;
  slug: string; // Thêm
  summary: string; // Thêm
  mainImageUrl: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: number; // Backend gửi 1 (Easy), 2 (Medium), 3 (Hard)
  servings: number; // Thêm
  avgRating: number;
  createdAt: string; // Thêm (Instant được gửi dưới dạng string)

  // === CÁC TRƯỜNG ĐÃ SỬA ===
  movieTitle: string; // (Giờ đã có từ backend)
  ratingsCount: number; // (Giờ đã có từ backend)
}