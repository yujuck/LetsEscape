export interface User {
  id?: string;
  nickname: string;
  email: string;
  phone?: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDto {
  nickname: string;
  phone?: string;
}

export interface UpdateUserDto {
  nickname?: string;
  phone?: string;
}
