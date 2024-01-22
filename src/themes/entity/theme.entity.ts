import { Entity } from 'typeorm';

@Entity()
class Theme {
  name: string;
  description: string;
  difficulty: number;
  time: string;
  price: string;
}
