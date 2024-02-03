import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'stores' })
export class StoreEntity {
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
