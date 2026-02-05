import { Controller, Get } from '@nestjs/common';
import { CrawlingService } from './crawling.service';

@Controller('crawl')
export class CrawlingController {
  constructor(private readonly crawlingService: CrawlingService) {}

  @Get()
  async getThemes() {
    return await this.crawlingService.runAllCrawlers();
  }
}
