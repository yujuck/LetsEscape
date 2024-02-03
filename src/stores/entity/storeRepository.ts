import { Injectable } from '@nestjs/common';
import { StoreEntity } from './storeEntity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StoreRepository {
  private storeRepository: Repository<StoreEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.storeRepository = this.dataSource.getRepository(StoreEntity);
  }

  async createStore(
    name: string,
    location: string,
    telNumber: string,
    url: string,
  ) {
    await this.storeRepository.save({ name, location, telNumber, url });
  }
}
