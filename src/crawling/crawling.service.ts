import puppeteer from 'puppeteer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CrawlingService {
  async getThemes() {
    const browser = await puppeteer.launch();

    try {
      const page = await browser.newPage();
      await page.goto('https://xdungeon.net/layout/res/home.php?go=theme.list');

      return await page.$$eval('.thm_list > ul > li', (item) => {
        return item.map((el) => {
          const title = el.querySelector('.thm').innerHTML;
          const store = el.querySelector('.str').innerHTML;
          const genre = el.querySelector('.gr').innerHTML;

          return { store, title, genre };
        });
      });
    } finally {
      await browser.close();
    }
  }
}
