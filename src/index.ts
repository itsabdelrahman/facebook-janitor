import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';
import { loadEnvironmentVariables } from './utilities';

type ActivityLogFilter = 'POSTS';

/**
 * Spawns a browser instance
 */
const launchBrowser = async (options: LaunchOptions): Promise<Browser> => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1200,
      height: 1000,
    },
    args: ['--disable-notifications'],
    ...options,
  });

  return browser;
};

/**
 * Destroys the browser instance
 */
const closeBrowser = async (browser: Browser): Promise<void> => {
  await browser.close();
};

/**
 * Opens a new browser tab on given URL
 */
const openNewPage = (url: string) => async (
  browser: Browser,
): Promise<Page> => {
  const page = await browser.newPage();
  await page.goto(url);

  return page;
};

/**
 * Logs in the user using given credentials
 */
const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (page: Page): Promise<Page> => {
  /* Enter email */
  await page.focus('input#email');
  await page.keyboard.type(email);

  /* Enter password */
  await page.focus('input#pass');
  await page.keyboard.type(password);

  /* Submit login form */
  await page.click('label#loginbutton');
  await page.waitForNavigation();

  return page;
};

/**
 * Navigates from the Home page to the Profile page
 */
const navigateToProfile = async (page: Page): Promise<Page> => {
  /* Click on profile button */
  await page.click('#u_0_a > div:nth-child(1) > div:nth-child(1) > div > a');
  await page.waitFor(3000);

  return page;
};

/**
 * Navigates from the Profile page to the Activity Log page
 */
const navigateToActivityLog = async (page: Page): Promise<Page> => {
  /* Click on activity log button */
  await page.click('a._42ft._4jy0._4jy4._517h._51sy');
  await page.waitFor(3000);

  return page;
};

/**
 * Selects a filter on the Activity Log page
 */
const selectActivityLogFilter = (filter: ActivityLogFilter) => async (
  page: Page,
): Promise<Page> => {
  /* Select posts activity log */
  await page.click('#navItem_statuscluster > a');
  await page.waitFor(2000);

  return page;
};

/**
 * Attempts to delete the first post on the Posts Activity Log page
 */
const deleteFirstPost = async (page: Page): Promise<Page> => {
  /* Click on activity log item options */
  await page.click('a._42ft._42fu._4-s1._2agf._4o_4._p._42gx');
  await page.waitFor(2000);

  /* Click on activity log item delete option */
  const [deleteOptionAnchor] = await page.$x("//a[contains(., 'Delete')]");
  await deleteOptionAnchor.click();
  await page.waitFor(2000);

  /* Click on deletion prompt submit button */
  const [deleteSubmitButton] = await page.$x("//button[contains(., 'Delete')]");
  await deleteSubmitButton.click();
  await page.waitFor(5000);

  return page;
};

(async () => {
  loadEnvironmentVariables(['email', 'password']);
  const { email, password } = process.env;

  const browser = await launchBrowser({ headless: false });

  let page = await openNewPage('https://facebook.com')(browser);

  page = await loginUser({ email, password })(page);
  page = await navigateToProfile(page);
  page = await navigateToActivityLog(page);
  page = await selectActivityLogFilter('POSTS')(page);
  page = await deleteFirstPost(page);

  await closeBrowser(browser);
})();
