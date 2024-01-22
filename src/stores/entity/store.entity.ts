import { Entity } from 'typeorm';

@Entity()
class Store {
  name: string;
  location: string;
  telNumber: string;
}
