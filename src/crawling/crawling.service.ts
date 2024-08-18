import { Injectable } from '@nestjs/common';
import { BeatPhobiaCrawler } from './beatPhobiaCrawler';
import puppeteer from 'puppeteer';

@Injectable()
export class CrawlingService {
  async runAllCrawlers() {
    const browser = await puppeteer.launch();
    const beatPhobiaCrawler = new BeatPhobiaCrawler(browser);

    try {
      const [beatPhobiaData] = await Promise.all([beatPhobiaCrawler.crawl()]);

      return { beatPhobiaData };
    } catch (error) {
      throw error;
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
