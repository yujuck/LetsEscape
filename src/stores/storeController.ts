import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './storeService';
import { CreateStoreDto } from './dto';

@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async createStore(@Body() storeInfo: CreateStoreDto) {
    return await this.storeService.createStore(storeInfo);
  }
}
