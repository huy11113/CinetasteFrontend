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
//
export interface RecipeIngredientDetail {
  name: string;
  quantityUnit: string; // Backend trả về chuỗi gộp, VD: "200g"
  isOptional: boolean;
}

//
export interface RecipeStepDetail {
  step: number;        // Backend: step
  title: string;       // Backend: title (VD: "Bước 1")
  description: string; // Backend: description (Nội dung hướng dẫn)
  imageUrl: string | null;
}

export interface RecipeAuthor {
  username: string;
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface RecipeMovieInfo {
  title: string;
  year: number | null;
  posterUrl: string | null;
}

// [SỬA LẠI]: Đổi tên từ RecipeDetail -> Recipe để khớp với import trong component
//
export interface Recipe extends Omit<RecipeSummary, 'authorId' | 'movieTitle'> {
  ingredients: RecipeIngredientDetail[];
  instructions: RecipeStepDetail[]; // Backend trả về list 'instructions'
  nutrition: Record<string, string>; // Backend trả về Map<String, String>
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
// 3. AI CREATIVE CHEF TYPES (Cập nhật cho khớp Backend mới)
// ============================================================================

export interface FlavorProfile {
  sweet: number;
  sour: number;
  spicy: number;
  umami: number;
  richness: number;
}

export interface VisualGuide {
  layout_description: string;
  color_palette: string[]; // Mảng mã màu Hex
  plating_style: string;
}

// Input gửi lên Server (Khớp với Pydantic Request)
export interface CreateByThemeRequest {
  inspiration: string;
  mood: string;
  ingredients?: string;
  diet: string;
  creativity: number; 
  time: string; 
  difficulty: string;
  dining_style?: string;
  skill_level?: string;
}

// Output nhận về từ Server (Khớp với Pydantic Response)
export interface CreateByThemeResponse {
  recipeName: string;      // Backend: recipeName
  narrativeStyle: string;  // Backend: narrativeStyle
  story: string;
  connection: string;
  
  // ⚠️ QUAN TRỌNG: Backend trả về mảng chuỗi, không phải object
  ingredients: string[];   
  instructions: string[]; 
  
  prepTime: string;
  cookTime: string;
  
  flavorProfile: {
    sweet: number;
    sour: number;
    spicy: number;
    umami: number;
    richness: number;
  };
  
  visualColors: string[]; // Mảng mã màu Hex (VD: ["#FF0000", ...])
  platingGuide: string;
  pairing: string;
  musicRecommendation: string;
  
  macros: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  
  origin: string;
}

// ============================================================================
// 4. AI JUDGE / CRITIQUE TYPES (Giám khảo chấm điểm)
// ============================================================================

export interface CritiqueDishResponse {
  critique: string;       // Lời nhận xét chi tiết
  score: number;          // Điểm tổng (0-100)
  
  // Điểm thành phần
  appearance_score: number;
  technique_score: number;
  creativity_score: number;
  
  // Danh sách ý chính
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}