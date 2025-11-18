export interface NutritionEstimate {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface PairingSuggestionsDto {
  drinks: string[];
  sideDishes: string[];
}

export interface RecipeIngredientDto {
  name: string;
  quantity: string;
  unit: string;
}

export interface RecipeInstructionDto {
  step: number;
  description: string;
}

export interface RecipeDetail {
  difficulty: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  ingredients: RecipeIngredientDto[];
  instructions: RecipeInstructionDto[];
}

export interface AnalyzeDishResponse {
  dish_name: string;
  origin: string;
  description: string;
  nutrition_estimate: NutritionEstimate;
  health_tags: string[];
  pairing_suggestions: PairingSuggestionsDto;
  recipe: RecipeDetail;
  tips: string[];
  // Các trường bổ sung cho UI
  movie_context?: {
    title: string;
    scene_description: string;
    significance: string;
    wikipedia_link?: string;
  };
}