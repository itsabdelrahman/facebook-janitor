import { Page } from 'puppeteer';
import { Credentials } from '../types';

/**
 * Logs user in
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
 * Navigates to profile page
 */
export const navigateToProfilePage = async (page: Page): Promise<void> => {
  await page.goto('https://www.facebook.com/me');
};

/**
 * Deletes latest post on profile page
 */
export const deleteLatestPost = async (page: Page): Promise<void> => {
  const selectors = {
    optionsButton: 'div[aria-label="Actions for this post"]',
    deleteOptionButton: "//span[contains(., 'Move to trash')]",
    deleteSubmitButton: 'div[aria-label="Move"]',
    responseToast: "//span[contains(., 'Moving post to your trash')]",
  };

  /* Open post options */
  await page.waitForSelector(selectors.optionsButton);
  await page.evaluate(
    (selector) => document.querySelector(selector).click(),
    selectors.optionsButton,
  );
  await page.waitForTimeout(2500);

  /* Select "Move to trash" option */
  await page.waitForXPath(selectors.deleteOptionButton);
  const [deleteOptionButton] = await page.$x(selectors.deleteOptionButton);
  await deleteOptionButton.click();
  await page.waitForTimeout(2500);

  /* Submit confirmation dialog */
  await page.waitForSelector(selectors.deleteSubmitButton);
  await page.evaluate(
    (selector) => document.querySelector(selector).click(),
    selectors.deleteSubmitButton,
  );

  /* Wait for "Moving post to your trash" toast */
  await page.waitForXPath(selectors.responseToast);
};
