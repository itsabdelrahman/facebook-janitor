import { Page } from 'puppeteer';
import { Credentials, ActivityLogFilter } from '../types';

/**
 * Logs in the user using given credentials
 */
export const loginUser = (credentials: Credentials) => async (
  page: Page,
): Promise<void> => {
  const { email, password } = credentials;

  const selectors = {
    emailInput: 'input#email',
    passwordInput: 'input#pass',
    loginSubmitButton: 'label#loginbutton',
  };

  /* Enter email */
  await page.focus(selectors.emailInput);
  await page.keyboard.type(email);

  /* Enter password */
  await page.focus(selectors.passwordInput);
  await page.keyboard.type(password);

  /* Submit login form */
  await page.click(selectors.loginSubmitButton);
  await page.waitForNavigation();
};

/**
 * Navigates from the Home page to the Profile page
 */
export const navigateToProfile = async (page: Page): Promise<void> => {
  const selectors = {
    profileButton: '#u_0_a > div:nth-child(1) > div:nth-child(1) > div > a',
  };

  /* Click on profile button */
  await page.waitForSelector(selectors.profileButton);
  await page.click(selectors.profileButton);
  await page.waitFor(3000);
};

/**
 * Navigates from the Profile page to the Activity Log page
 */
export const navigateToActivityLog = async (page: Page): Promise<void> => {
  const selectors = {
    activityLogButton: 'a._42ft._4jy0._4jy4._517h._51sy',
  };

  /* Click on activity log button */
  await page.waitForSelector(selectors.activityLogButton);
  await page.click(selectors.activityLogButton);
  await page.waitFor(3000);
};

/**
 * Selects a filter on the Activity Log page
 */
export const selectActivityLogFilter = (filter: ActivityLogFilter) => async (
  page: Page,
): Promise<void> => {
  /* TODO: Activate filter argument */

  const selectors = {
    filterByPostsButton: '#navItem_statuscluster > a',
  };

  /* Select posts activity log */
  await page.waitForSelector(selectors.filterByPostsButton);
  await page.click(selectors.filterByPostsButton);
  await page.waitFor(2000);
};

/**
 * Deletes the latest post on the Posts Activity Log page
 */
export const deleteLatestPost = async (page: Page): Promise<void> => {
  const selectors = {
    optionsButton: 'a[aria-label="Edit"]',
    deleteOptionButton: "//a[contains(., 'Delete')]",
    deleteSubmitButton: "//button[contains(., 'Delete')]",
  };

  /* Click on activity log item options */
  await page.waitForSelector(selectors.optionsButton);
  await page.evaluate(
    selector => document.querySelector(selector).click(),
    selectors.optionsButton,
  );
  await page.waitFor(2500);

  /* Click on activity log item delete option */
  await page.waitForXPath(selectors.deleteOptionButton);
  const [deleteOptionButton] = await page.$x(selectors.deleteOptionButton);
  await deleteOptionButton.click();
  await page.waitFor(2500);

  /* Click on deletion prompt submit button */
  await page.waitForXPath(selectors.deleteSubmitButton);
  const [deleteSubmitButton] = await page.$x(selectors.deleteSubmitButton);
  await deleteSubmitButton.click();

  await page.waitFor(5000);
};
