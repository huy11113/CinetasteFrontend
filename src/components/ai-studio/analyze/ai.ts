// src/components/ai-studio/analyze/types.ts

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
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: RecipeInstruction[];
}

export interface MovieContext {
  title: string;
  scene_description: string;
  significance: string;
  wikipedia_link?: string;
}

export interface AnalyzeDishResponse {
  dish_name: string;
  origin: string;
  description: string;
  nutrition_estimate: NutritionEstimate;
  health_tags: string[];
  pairing_suggestions: PairingSuggestions;
  recipe: RecipeDetail;
  tips: string[];
  movie_context?: MovieContext;
  cultural_significance?: string;
}