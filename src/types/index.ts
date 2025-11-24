// src/types/index.ts

// 1. Type cho User (khớp với UserBasicInfo.java)
export interface UserBasicInfo {
  id: string;
  username: string;
  displayName: string;
  profileImageUrl: string | null;
}

// 2. Type cho Recipe tóm tắt (khớp với RecipeResponse.java dùng trong danh sách)
export interface RecipeSummary {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  summary: string;
  difficulty: number; // Backend trả về 1-5
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  mainImageUrl: string;
  avgRating: number;
  ratingsCount: number;
  createdAt: string;
  movieTitle: string | null;
}

// 3. Type cho chi tiết Recipe (khớp với RecipeDetailResponse.java)
export interface RecipeIngredientDetail {
  name: string;
  quantityUnit: string; // Ví dụ: "200g"
  isOptional: boolean;
}

export interface RecipeStepDetail {
  step: number;
  title: string;
  description: string;
  imageUrl: string | null;
}

export interface RecipeAuthor {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface RecipeMovieInfo {
  title: string;
  year: number | null;
  posterUrl: string | null;
}

export interface RecipeDetail extends Omit<RecipeSummary, 'authorId' | 'movieTitle'> {
  ingredients: RecipeIngredientDetail[];
  instructions: RecipeStepDetail[];
  nutrition: Record<string, string>; // Map<String, String> từ Java
  author: RecipeAuthor;
  movie: RecipeMovieInfo | null;
}

// 4. Type cho phản hồi từ AI (khớp với AnalyzeDishResponse.java và các DTO con)
// LƯU Ý: Backend dùng @JsonProperty để trả về snake_case cho một số trường
export interface NutritionEstimate {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface PairingSuggestions {
  drinks: string[];
  sideDishes: string[];
}

export interface AIRecipeDetail {
  difficulty: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  ingredients: { name: string; quantity: string; unit: string }[];
  instructions: { step: number; description: string }[];
}

export interface AnalyzeDishResponse {
  dish_name: string; // @JsonProperty("dish_name")
  origin: string;
  description: string;
  nutrition_estimate: NutritionEstimate; // @JsonProperty("nutrition_estimate")
  health_tags: string[]; // @JsonProperty("health_tags")
  pairing_suggestions: PairingSuggestions; // @JsonProperty("pairing_suggestions")
  recipe: AIRecipeDetail;
  tips: string[];
  // Các trường bổ sung nếu AI service trả về (tùy chọn)
  movie_context?: {
    title: string;
    scene_description: string;
    significance: string;
    wikipedia_link?: string;
  };
}