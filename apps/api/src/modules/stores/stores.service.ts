import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStoreDto, Store, UpdateStoreDto } from '@lets-escape/shared';
import { SupabaseService } from '../../common/supabase';

type StoreRow = {
  id: number;
  name: string;
  district: string;
  address: string;
  address_detail: string | null;
  phone: string | null;
  homepage_url: string | null;
  reservation_url: string | null;
  lat: number | null;
  lng: number | null;
  reservation_open_note: string | null;
  is_active: boolean;
  source_confidence: number;
  created_at: string;
  updated_at: string;
};

@Injectable()
export class StoresService {
  constructor(private readonly supabase: SupabaseService) {}

  private toStore(row: StoreRow): Store {
    return {
      id: row.id,
      name: row.name,
      district: row.district,
      address: row.address,
      addressDetail: row.address_detail ?? undefined,
      phone: row.phone ?? undefined,
      homepageUrl: row.homepage_url ?? undefined,
      reservationUrl: row.reservation_url ?? undefined,
      lat: row.lat ?? undefined,
      lng: row.lng ?? undefined,
      reservationOpenNote: row.reservation_open_note ?? undefined,
      isActive: row.is_active,
      sourceConfidence: row.source_confidence,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    };
  }

  async findAll(district?: string): Promise<Store[]> {
    let query = this.supabase
      .from('stores')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (district) {
      query = query.eq('district', district);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch stores: ${error.message}`);
    }

    return (data as StoreRow[]).map((row) => this.toStore(row));
  }

  async findOne(id: number): Promise<Store> {
    const { data, error } = await this.supabase
      .from('stores')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Store not found');
    }

    return this.toStore(data as StoreRow);
  }

  async create(payload: CreateStoreDto): Promise<Store> {
    const { data, error } = await this.supabase
      .from('stores')
      .insert({
        name: payload.name,
        district: payload.district,
        address: payload.address,
        address_detail: payload.addressDetail,
        phone: payload.phone,
        homepage_url: payload.homepageUrl,
        reservation_url: payload.reservationUrl,
        lat: payload.lat,
        lng: payload.lng,
        reservation_open_note: payload.reservationOpenNote,
      })
      .select('*')
      .single();

    if (error || !data) {
      throw new Error(`Failed to create store: ${error?.message}`);
    }

    return this.toStore(data as StoreRow);
  }

  async update(id: number, payload: UpdateStoreDto): Promise<Store> {
    const { data, error } = await this.supabase
      .from('stores')
      .update({
        name: payload.name,
        district: payload.district,
        address: payload.address,
        address_detail: payload.addressDetail,
        phone: payload.phone,
        homepage_url: payload.homepageUrl,
        reservation_url: payload.reservationUrl,
        lat: payload.lat,
        lng: payload.lng,
        reservation_open_note: payload.reservationOpenNote,
        is_active: payload.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*')
      .single();

    if (error || !data) {
      throw new NotFoundException('Store not found or update failed');
    }

    return this.toStore(data as StoreRow);
  }

  async remove(id: number): Promise<{ success: boolean }> {
    const { error } = await this.supabase
      .from('stores')
      .update({ is_active: false, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete store: ${error.message}`);
    }

    return { success: true };
  }
}
