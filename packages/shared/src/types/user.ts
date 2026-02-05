export interface User {
  id?: number;
  nickname: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserDto {
  nickname: string;
  email: string;
  name: string;
  password: string;
  phone: string;
}

export interface UpdateUserDto {
  nickname?: string;
  name?: string;
  phone?: string;
}
