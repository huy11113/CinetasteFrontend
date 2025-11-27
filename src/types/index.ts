// src/types/index.ts

// ============================================================================
// 1. USER & AUTH TYPES (Tương thích User Service - Java)
// ============================================================================

export interface UserBasicInfo {
  id: string;
  username: string;
  displayName: string;
  profileImageUrl: string | null;
}

export interface LoginResponse {
  token: string;
  username: string;
  displayName: string;
  profileImageUrl: string;
}

// ============================================================================
// 2. RECIPE TYPES (Tương thích Recipe Service - Java)
// ============================================================================

// Type tóm tắt cho danh sách (Card view)
export interface RecipeSummary {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  summary: string;
  difficulty: number; // 1-5
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  mainImageUrl: string;
  avgRating: number;
  ratingsCount: number;
  createdAt: string;
  movieTitle: string | null;
}

// Các type con cho chi tiết công thức
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

// Type chi tiết đầy đủ (Detail view)
export interface RecipeDetail extends Omit<RecipeSummary, 'authorId' | 'movieTitle'> {
  ingredients: RecipeIngredientDetail[];
  instructions: RecipeStepDetail[];
  nutrition: Record<string, string>; // Map<String, String> từ Java
  author: RecipeAuthor;
  movie: RecipeMovieInfo | null;
}

// ============================================================================
// 3. AI FEATURE TYPES (Tương thích AI Service - Python)
// LƯU Ý: Các trường này giữ nguyên snake_case từ JSON của Python trả về
// ============================================================================

export interface MovieContext {
  title: string;
  scene_description: string;
  significance: string;
  wikipedia_link: string;
}

export interface NutritionEstimate {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface RecipeInstruction {
  step: number;
  description: string;
}

export interface AIRecipeDetail {
  difficulty: number;
  // Python backend trả về snake_case cho các trường này
  prep_time_minutes: number; 
  cook_time_minutes: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
}

export interface PairingSuggestions {
  drinks: string[];
  side_dishes: string[];
}

// Type trả về từ API /api/ai/analyze-dish
export interface AnalyzeDishResponse {
  dish_name: string;
  origin: string;
  description: string;
  cultural_significance: string;
  
  // Các object con
  movie_context: MovieContext;
  nutrition_estimate: NutritionEstimate;
  recipe: AIRecipeDetail;
  pairing_suggestions: PairingSuggestions;
  
  // Các mảng string
  health_tags: string[];
  tips: string[];
}
// ============================================================================
// 3. AI CREATIVE CHEF TYPES (Sáng tạo món ăn - MỚI 100%)
// ============================================================================

// Enum cho phong cách kể chuyện
export enum NarrativeStyle {
  COMIC_MODE = "Comic Mode",
  MYSTIC_WHISPER = "Mystic Whisper",
  ACTION_RUSH = "Action Rush",
  GHIBLI_SOFT_DREAM = "Ghibli Soft Dream",
  CYBERPUNK_LOGIC = "Cyberpunk Logic",
  ROMANCE_MOOD = "Romance Mood",
  DRAMA_DEEP = "Drama Deep",
  DEFAULT = "Standard"
}

export interface FlavorProfile {
  sweet: number;
  sour: number;
  spicy: number;
  umami: number;
  richness: number;
}

export interface Macros {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}

// Input gửi lên Server
export interface CreateByThemeRequest {
  inspiration: string;
  mood: string;
  ingredients: string;
  diet: string;
  creativity: number; // 0-100
  time: string; // 'fast' | 'medium' | 'slow'
  difficulty: string; // 'easy' | 'medium' | 'hard'
}

// Output nhận về từ Server
export interface CreateByThemeResponse {
  narrativeStyle: string;
  story: string;
  recipeName: string;
  ingredients: string[]; // Mảng chuỗi (khác với AnalyzeDishResponse)
  instructions: string[]; // Mảng chuỗi
  prepTime: string;
  cookTime: string;
  
  flavorProfile: FlavorProfile;
  platingGuide: string;
  musicRecommendation: string;
  visualColors: string[]; // Mã màu Hex
  
  connection: string; // Lời bình của đạo diễn
  pairing: string;
  macros: Macros;
}