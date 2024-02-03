import { Body, Controller, Post } from '@nestjs/common';
import { StoreService } from './storeService';

@Controller('/store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  async createStore(@Body() storeInfo) {
    return await this.storeService.createStore(storeInfo);
  }
}
