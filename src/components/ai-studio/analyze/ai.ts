    // src/types/ai.ts

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

export interface RecipeDetail {
  difficulty: number;
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

export interface AnalyzeDishResponse {
  dish_name: string;
  origin: string;
  description: string;
  cultural_significance: string;
  movie_context: MovieContext;
  nutrition_estimate: NutritionEstimate;
  health_tags: string[];
  pairing_suggestions: PairingSuggestions;
  recipe: RecipeDetail;
  tips: string[];
}