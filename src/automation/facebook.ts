import { Page } from 'puppeteer';

type ActivityLogFilter = 'POSTS';

/**
 * Logs in the user using given credentials
 */
export const loginUser = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => async (page: Page): Promise<void> => {
  /* Enter email */
  await page.focus('input#email');
  await page.keyboard.type(email);

  /* Enter password */
  await page.focus('input#pass');
  await page.keyboard.type(password);

  /* Submit login form */
  await page.click('label#loginbutton');
  await page.waitForNavigation();
};

/**
 * Navigates from the Home page to the Profile page
 */
export const navigateToProfile = async (page: Page): Promise<void> => {
  /* Click on profile button */
  await page.click('#u_0_a > div:nth-child(1) > div:nth-child(1) > div > a');
  await page.waitFor(3000);
};

/**
 * Navigates from the Profile page to the Activity Log page
 */
export const navigateToActivityLog = async (page: Page): Promise<void> => {
  /* Click on activity log button */
  await page.click('a._42ft._4jy0._4jy4._517h._51sy');
  await page.waitFor(3000);
};

/**
 * Selects a filter on the Activity Log page
 */
export const selectActivityLogFilter = (filter: ActivityLogFilter) => async (
  page: Page,
): Promise<void> => {
  /* Select posts activity log */
  await page.click('#navItem_statuscluster > a');
  await page.waitFor(2000);
};

/**
 * Attempts to delete the first post on the Posts Activity Log page
 */
export const deleteFirstPost = async (page: Page): Promise<void> => {
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
};
