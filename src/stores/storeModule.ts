import { Module } from '@nestjs/common';
import { StoreController } from './storeController';
import { StoreService } from './storeService';
import { StoreRepository } from './storeRepository';

@Module({
  imports: [],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository],
  exports: [],
})
export class StoreModule {}
