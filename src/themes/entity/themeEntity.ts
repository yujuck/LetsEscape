import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StoreEntity } from 'src/stores/entity/storeEntity';

@Entity({ name: 'themes' })
export class ThemeEntity {
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

  @ManyToOne(() => StoreEntity, (store) => store.id)
  storeId: number;
}
