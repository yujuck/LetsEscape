import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateThemeDto,
  FearLevel,
  Theme,
  UpdateThemeDto,
} from '@lets-escape/shared';
import { SupabaseService } from '../../common/supabase';

type ThemeRow = {
  id: number;
  store_id: number;
  name: string;
  description: string | null;
  genre: string | null;
  difficulty:
    | 'very_easy'
    | 'easy'
    | 'normal'
    | 'hard'
    | 'very_hard'
    | null;
  fear: FearLevel | null;
  recommended_min_players: number | null;
  recommended_max_players: number | null;
  play_time_minutes: number | null;
  price_krw: number | null;
  is_active: boolean;
  source_confidence: number;
  created_at: string;
  updated_at: string;
};

@Injectable()
export class ThemesService {
  constructor(private readonly supabase: SupabaseService) {}

  private toTheme(row: ThemeRow): Theme {
    return {
      id: row.id,
      storeId: row.store_id,
      name: row.name,
      description: row.description ?? undefined,
      genre: row.genre ?? undefined,
      difficulty: row.difficulty ?? undefined,
      fear: row.fear ?? undefined,
      recommendedMinPlayers: row.recommended_min_players ?? undefined,
      recommendedMaxPlayers: row.recommended_max_players ?? undefined,
      playTimeMinutes: row.play_time_minutes ?? undefined,
      priceKrw: row.price_krw ?? undefined,
      isActive: row.is_active,
      sourceConfidence: row.source_confidence,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  async findAll(filters: {
    district?: string;
    minPlayers?: number;
    maxPlayers?: number;
    fear?: FearLevel;
    playTimeMin?: number;
    playTimeMax?: number;
    q?: string;
  }): Promise<Theme[]> {
    let query = this.supabase
      .from('themes')
      .select('*, stores!inner(district)')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (filters.district) {
      query = query.eq('stores.district', filters.district);
    }
    if (filters.minPlayers !== undefined) {
      query = query.gte('recommended_max_players', filters.minPlayers);
    }
    if (filters.maxPlayers !== undefined) {
      query = query.lte('recommended_min_players', filters.maxPlayers);
    }
    if (filters.fear) {
      query = query.eq('fear', filters.fear);
    }
    if (filters.playTimeMin !== undefined) {
      query = query.gte('play_time_minutes', filters.playTimeMin);
    }
    if (filters.playTimeMax !== undefined) {
      query = query.lte('play_time_minutes', filters.playTimeMax);
    }
    if (filters.q) {
      query = query.or(`name.ilike.%${filters.q}%,description.ilike.%${filters.q}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch themes: ${error.message}`);
    }

    return (data as unknown as ThemeRow[]).map((row) => this.toTheme(row));
  }

  async findOne(id: number): Promise<Theme> {
    const { data, error } = await this.supabase
      .from('themes')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Theme not found');
    }

    return this.toTheme(data as ThemeRow);
  }

  async create(payload: CreateThemeDto): Promise<Theme> {
    const { data, error } = await this.supabase
      .from('themes')
      .insert({
        store_id: payload.storeId,
        name: payload.name,
        description: payload.description,
        genre: payload.genre,
        difficulty: payload.difficulty,
        fear: payload.fear,
        recommended_min_players: payload.recommendedMinPlayers,
        recommended_max_players: payload.recommendedMaxPlayers,
        play_time_minutes: payload.playTimeMinutes,
        price_krw: payload.priceKrw,
      })
      .select('*')
      .single();

    if (error || !data) {
      throw new Error(`Failed to create theme: ${error?.message}`);
    }

    return this.toTheme(data as ThemeRow);
  }

  async update(id: number, payload: UpdateThemeDto): Promise<Theme> {
    const { data, error } = await this.supabase
      .from('themes')
      .update({
        name: payload.name,
        description: payload.description,
        genre: payload.genre,
        difficulty: payload.difficulty,
        fear: payload.fear,
        recommended_min_players: payload.recommendedMinPlayers,
        recommended_max_players: payload.recommendedMaxPlayers,
        play_time_minutes: payload.playTimeMinutes,
        price_krw: payload.priceKrw,
        is_active: payload.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error || !data) {
      throw new NotFoundException('Theme not found or update failed');
    }

    return this.toTheme(data as ThemeRow);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const { error } = await this.supabase
      .from('themes')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete theme: ${error.message}`);
    }

    return { success: true };
  }
}
