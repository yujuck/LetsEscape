import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stores {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  telNumber: string;

  @Column()
  url: string;
}
