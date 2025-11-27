export interface ChefRequest {
  inspiration: string; // Tên phim / Anime
  mood: string;
  ingredients: string;
  diet: string;
  creativity: number; // 0-100
  time: 'fast' | 'medium' | 'slow';
  difficulty: 'easy' | 'medium' | 'hard';
}

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

export interface ChefResponse {
  narrativeStyle: NarrativeStyle;
  story: string;
  recipeName: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  flavorProfile: FlavorProfile;
  platingGuide: string;
  musicRecommendation: string;
  visualColors: string[]; // Hex codes
  
  // New Fields for Enhanced UX
  connection: string; // "Director's Commentary": Why this dish fits the movie?
  pairing: string; // Drink or Side dish suggestion
  macros: Macros; // Nutritional info styled as "Critics Rating"
}

export const MOODS = [
  { id: "Adventure", label: "Phiêu Lưu", icon: "🗺️" },
  { id: "Comedy", label: "Hài Hước", icon: "😂" },
  { id: "Horror", label: "Kinh Dị", icon: "👻" },
  { id: "Romance", label: "Lãng Mạn", icon: "🌹" },
  { id: "Sci-Fi", label: "Viễn Tưởng", icon: "🤖" },
  { id: "Chill", label: "Chữa Lành", icon: "🍃" },
  { id: "Action", label: "Hành Động", icon: "🔥" },
  { id: "Noir", label: "Cổ Điển", icon: "🎞️" }
];

export const DIETS = [
  { id: "None", label: "Thoải mái" },
  { id: "Vegetarian", label: "Ăn Chay" },
  { id: "Keto", label: "Keto/LowCarb" },
  { id: "EatClean", label: "Eat Clean" },
];