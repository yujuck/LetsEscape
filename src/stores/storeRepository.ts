import { Injectable } from '@nestjs/common';
import { StoreEntity } from './entity/storeEntity';
import { DataSource, Repository } from 'typeorm';
import { Store } from './store';

@Injectable()
export class StoreRepository {
  private storeRepository: Repository<StoreEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.storeRepository = this.dataSource.getRepository(StoreEntity);
  }

  async createStore(storeInfo: Store) {
    const { name, location, telNumber, url } = storeInfo;
    await this.storeRepository.save({ name, location, telNumber, url });
  }
}
