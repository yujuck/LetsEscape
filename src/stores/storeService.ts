import { Injectable } from '@nestjs/common';
import { StoreRepository } from './storeRepository';
import { CreateStoreDto } from './dto';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async createStore(storeInfo: CreateStoreDto) {
    const store = storeInfo.toEntity();
    return await this.storeRepository.createStore(store);
  }
}
