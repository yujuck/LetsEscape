import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Stores } from 'src/stores/entity/store.entity';

@Entity()
export class Themes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column()
  difficulty: number;

  @Column()
  time: string;

  @Column()
  price: number;

  @ManyToOne(() => Stores, (store) => store.id)
  storeId: number;
}
