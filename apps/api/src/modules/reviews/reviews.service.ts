import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReviewDto, Review, UpdateReviewDto } from '@lets-escape/shared';
import { SupabaseService } from '../../common/supabase';

type ReviewRow = {
  id: number;
  user_id: string;
  theme_id: number;
  title: string | null;
  content: string;
  visibility: 'public' | 'private';
  rating: number;
  perceived_difficulty:
    | 'very_easy'
    | 'easy'
    | 'normal'
    | 'hard'
    | 'very_hard'
    | null;
  cleared: boolean;
  clear_time_minutes: number | null;
  used_hint_count: number;
  tags: string[] | null;
  likes_count: number;
  created_at: string;
  updated_at: string;
};

@Injectable()
export class ReviewsService {
  constructor(private readonly supabase: SupabaseService) {}

  private toReview(row: ReviewRow): Review {
    return {
      id: row.id,
      userId: row.user_id,
      themeId: row.theme_id,
      title: row.title ?? undefined,
      content: row.content,
      visibility: row.visibility,
      rating: row.rating,
      perceivedDifficulty: row.perceived_difficulty ?? undefined,
      cleared: row.cleared,
      clearTimeMinutes: row.clear_time_minutes ?? undefined,
      usedHintCount: row.used_hint_count,
      tags: row.tags ?? [],
      likesCount: row.likes_count,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  async findAll(themeId?: number): Promise<Review[]> {
    let query = this.supabase
      .from('reviews')
      .select('*')
      .eq('visibility', 'public')
      .order('created_at', { ascending: false });

    if (themeId) {
      query = query.eq('theme_id', themeId);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch reviews: ${error.message}`);
    }

    return (data as ReviewRow[]).map((row) => this.toReview(row));
  }

  async findOne(id: number, userId?: string): Promise<Review> {
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Review not found');
    }

    const review = data as ReviewRow;

    if (review.visibility === 'private' && review.user_id !== userId) {
      throw new NotFoundException('Review not found');
    }

    return this.toReview(review);
  }

  async findMy(userId: string): Promise<Review[]> {
    const { data, error } = await this.supabase
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch my reviews: ${error.message}`);
    }

    return (data as ReviewRow[]).map((row) => this.toReview(row));
  }

  async create(userId: string, payload: CreateReviewDto): Promise<Review> {
    const { data, error } = await this.supabase
      .from('reviews')
      .insert({
        user_id: userId,
        theme_id: payload.themeId,
        title: payload.title,
        content: payload.content,
        visibility: payload.visibility,
        rating: payload.rating,
        perceived_difficulty: payload.perceivedDifficulty,
        cleared: payload.cleared,
        clear_time_minutes: payload.clearTimeMinutes,
        used_hint_count: payload.usedHintCount,
        tags: payload.tags ?? [],
      })
      .select('*')
      .single();

    if (error || !data) {
      throw new Error(`Failed to create review: ${error?.message}`);
    }

    return this.toReview(data as ReviewRow);
  }

  async update(
    id: number,
    userId: string,
    payload: UpdateReviewDto,
  ): Promise<Review> {
    const { data: existing, error: selectError } = await this.supabase
      .from('reviews')
      .select('user_id')
      .eq('id', id)
      .single();

    if (selectError || !existing) {
      throw new NotFoundException('Review not found');
    }

    if ((existing as { user_id: string }).user_id !== userId) {
      throw new ForbiddenException('Cannot update another user review');
    }

    const { data, error } = await this.supabase
      .from('reviews')
      .update({
        title: payload.title,
        content: payload.content,
        visibility: payload.visibility,
        rating: payload.rating,
        perceived_difficulty: payload.perceivedDifficulty,
        cleared: payload.cleared,
        clear_time_minutes: payload.clearTimeMinutes,
        used_hint_count: payload.usedHintCount,
        tags: payload.tags,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error || !data) {
      throw new Error(`Failed to update review: ${error?.message}`);
    }

    return this.toReview(data as ReviewRow);
  }

  async remove(id: number, userId: string): Promise<{ success: boolean }> {
    const { data: existing, error: selectError } = await this.supabase
      .from('reviews')
      .select('user_id')
      .eq('id', id)
      .single();

    if (selectError || !existing) {
      throw new NotFoundException('Review not found');
    }

    if ((existing as { user_id: string }).user_id !== userId) {
      throw new ForbiddenException('Cannot delete another user review');
    }

    const { error } = await this.supabase.from('reviews').delete().eq('id', id);

    if (error) {
      throw new Error(`Failed to delete review: ${error.message}`);
    }

    return { success: true };
  }
}
