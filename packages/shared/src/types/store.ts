export interface Store {
  id?: number;
  name: string;
  address: string;
  addressDetail?: string;
  telNumber: string;
  url: string;
  coordinate: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateStoreDto {
  name: string;
  address: string;
  addressDetail?: string;
  telNumber: string;
  url: string;
  coordinate: number;
}

export interface UpdateStoreDto {
  name?: string;
  address?: string;
  addressDetail?: string;
  telNumber?: string;
  url?: string;
  coordinate?: number;
}
