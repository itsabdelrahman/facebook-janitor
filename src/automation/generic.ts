import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';

/**
 * Spawns a browser instance
 */
export const launchBrowser = async (
  options?: LaunchOptions,
): Promise<Browser> => {
  const { headless = false } = { ...options };

  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1200,
      height: 1000,
    },
    args: ['--disable-notifications'],
    headless,
    ...options,
  });

  return browser;
};

/**
 * Destroys the browser instance
 */
export const closeBrowser = async (browser: Browser): Promise<void> => {
  await browser.close();
};

/**
 * Opens a new browser tab on given URL
 */
export const openNewPage = (url: string) => async (
  browser: Browser,
): Promise<Page> => {
  const page = await browser.newPage();
  await page.goto(url);

  return page;
};

/**
 * Reloads page
 */
export const reloadPage = async (page: Page): Promise<void> => {
  await page.reload();
};
