import type { DifficultyLevel } from './theme';

export type ReviewVisibility = 'public' | 'private';

export interface Review {
  id?: number;
  userId?: string;
  themeId: number;
  title?: string;
  content: string;
  visibility: ReviewVisibility;
  rating: number;
  perceivedDifficulty?: DifficultyLevel;
  cleared: boolean;
  clearTimeMinutes?: number;
  usedHintCount: number;
  tags?: string[];
  likesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateReviewDto {
  themeId: number;
  title?: string;
  content: string;
  visibility: ReviewVisibility;
  rating: number;
  perceivedDifficulty?: DifficultyLevel;
  cleared: boolean;
  clearTimeMinutes?: number;
  usedHintCount: number;
  tags?: string[];
}

export interface UpdateReviewDto {
  title?: string;
  content?: string;
  visibility?: ReviewVisibility;
  rating?: number;
  perceivedDifficulty?: DifficultyLevel;
  cleared?: boolean;
  clearTimeMinutes?: number;
  usedHintCount?: number;
  tags?: string[];
}
