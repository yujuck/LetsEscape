export type DifficultyLevel =
  | 'very_easy'
  | 'easy'
  | 'normal'
  | 'hard'
  | 'very_hard';

export type FearLevel = 'none' | 'low' | 'medium' | 'high' | 'extreme';

export interface Theme {
  id?: number;
  storeId: number;
  name: string;
  description?: string;
  genre?: string;
  difficulty?: DifficultyLevel;
  fear?: FearLevel;
  recommendedMinPlayers?: number;
  recommendedMaxPlayers?: number;
  playTimeMinutes?: number;
  priceKrw?: number;
  isActive?: boolean;
  sourceConfidence?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateThemeDto {
  storeId: number;
  name: string;
  description?: string;
  genre?: string;
  difficulty?: DifficultyLevel;
  fear?: FearLevel;
  recommendedMinPlayers?: number;
  recommendedMaxPlayers?: number;
  playTimeMinutes?: number;
  priceKrw?: number;
}

export interface UpdateThemeDto {
  name?: string;
  description?: string;
  genre?: string;
  difficulty?: DifficultyLevel;
  fear?: FearLevel;
  recommendedMinPlayers?: number;
  recommendedMaxPlayers?: number;
  playTimeMinutes?: number;
  priceKrw?: number;
  isActive?: boolean;
}
