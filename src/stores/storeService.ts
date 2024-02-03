import { Injectable } from '@nestjs/common';
import { StoreRepository } from './entity/storeRepository';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}

  async createStore(storeInfo) {
    return await this.storeRepository.createStore(
      storeInfo.name,
      storeInfo.location,
      storeInfo.telNumber,
      storeInfo.url,
    );
  }
}
