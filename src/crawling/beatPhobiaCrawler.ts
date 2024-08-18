import { Browser } from 'puppeteer';

export class BeatPhobiaCrawler {
  constructor(private readonly browser: Browser) {}

  async getThemes() {
    const page = await this.browser.newPage();
    await page.goto('https://xdungeon.net/layout/res/home.php?go=theme.list');

    const themes = await page.$$eval('.thm_list > ul > li', (items) =>
      items.map((el) => {
        const title = el.querySelector('.thm')?.innerHTML;
        const store = el.querySelector('.str')?.innerHTML;
        const genre = el.querySelector('.gr')?.innerHTML;

        return { store, title, genre };
      }),
    );

    await page.close();
    return themes;
  }

  async getStores() {
    const page = await this.browser.newPage();
    await page.goto('https://xdungeon.net/layout/res/home.php?go=location');

    const locationData = [];

    await page.waitForSelector('.loca_list ul li');

    const liElements = await page.$$('.loca_list ul li');

    for (const li of liElements) {
      await li.$eval('a', (a: HTMLAnchorElement) => a.click());
      await page.waitForSelector('.loca_popup', { visible: true });

      const modalData = await page.evaluate(() => {
        const getDdContent = (index: number): string | undefined =>
          document.querySelectorAll('.txt_box dd')[index]?.textContent?.trim();

        return {
          name: getDdContent(0),
          phone: getDdContent(2),
          address: getDdContent(3),
          reservationOpenTime: getDdContent(4),
        };
      });

      locationData.push(modalData);
      await page.click('.clse_btn > button');
      await page.waitForSelector('.loca_popup', { hidden: true });
    }

    await page.close();
    return locationData;
  }

  async crawl() {
    const [themes, location] = await Promise.all([
      this.getThemes(),
      this.getStores(),
    ]);
    return { themes, location };
  }
}
