export interface Store {
  id?: number;
  name: string;
  district: string;
  address: string;
  addressDetail?: string;
  phone?: string;
  homepageUrl?: string;
  reservationUrl?: string;
  lat?: number;
  lng?: number;
  reservationOpenNote?: string;
  isActive?: boolean;
  sourceConfidence?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateStoreDto {
  name: string;
  district: string;
  address: string;
  addressDetail?: string;
  phone?: string;
  homepageUrl?: string;
  reservationUrl?: string;
  lat?: number;
  lng?: number;
  reservationOpenNote?: string;
}

export interface UpdateStoreDto {
  name?: string;
  district?: string;
  address?: string;
  addressDetail?: string;
  phone?: string;
  homepageUrl?: string;
  reservationUrl?: string;
  lat?: number;
  lng?: number;
  reservationOpenNote?: string;
  isActive?: boolean;
}
