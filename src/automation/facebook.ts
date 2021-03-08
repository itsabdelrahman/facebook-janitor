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
    loginSubmitButton: 'button[data-testid="royal_login_button"]',
    cookiesAcceptButton:
      'button[data-testid="cookie-policy-dialog-accept-button"]',
  };

  /* Accept cookies */
  await page.waitForSelector(selectors.cookiesAcceptButton);
  await page.click(selectors.cookiesAcceptButton);

  /* Enter email */
  await page.focus(selectors.emailInput);
  await page.keyboard.type(email);

  /* Enter password */
  await page.focus(selectors.passwordInput);
  await page.keyboard.type(password);

  /* Submit login form */
  await Promise.all([
    page.waitForNavigation(),
    page.click(selectors.loginSubmitButton),
  ]);
};

/**
 * Navigates from the Home page to the Activity Log page
 */
export const navigateToActivityLog = async (page: Page): Promise<void> => {
  await page.goto(
    'https://www.facebook.com/me/allactivity/?entry_point=profile_shortcut',
  );
};

/**
 * Selects a filter on the Activity Log page
 */
export const selectActivityLogFilter = (filter: ActivityLogFilter) => async (
  page: Page,
): Promise<void> => {
  /* TODO: Activate filter argument */

  await page.goto(
    'https://www.facebook.com/me/allactivity?category_key=STATUSCLUSTER&filter_hidden=ALL&filter_privacy=NONE',
  );
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
    (selector) => document.querySelector(selector).click(),
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
  await page.waitFor(2500);
};
