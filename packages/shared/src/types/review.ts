export interface Review {
  id?: number;
  content: string;
  isPrivate: boolean;
  clear: boolean;
  rating: number;
  difficulty: number;
  clearTime: string;
  usedHint: number;
  title?: string;
  tags?: string[];
  likes?: number;
  userId?: number;
  themeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateReviewDto {
  content: string;
  isPrivate: boolean;
  clear: boolean;
  rating: number;
  difficulty: number;
  clearTime: string;
  usedHint: number;
  title?: string;
  tags?: string[];
  themeId: number;
}

export interface UpdateReviewDto {
  content?: string;
  isPrivate?: boolean;
  rating?: number;
  difficulty?: number;
  title?: string;
  tags?: string[];
}
