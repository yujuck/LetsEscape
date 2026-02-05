export interface Theme {
  id?: number;
  name: string;
  description: string;
  difficulty: number;
  time: string;
  price: string;
  storeId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateThemeDto {
  name: string;
  description: string;
  difficulty: number;
  time: string;
  price: string;
  storeId?: number;
}

export interface UpdateThemeDto {
  name?: string;
  description?: string;
  difficulty?: number;
  time?: string;
  price?: string;
}
