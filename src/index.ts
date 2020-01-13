import puppeteer from 'puppeteer';

(async () => {
  /* Spawn browser */
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 1000 },
    args: ['--disable-notifications'],
  });

  /* Open a new page */
  const page = await browser.newPage();

  /* Go to facebook.com */
  await page.goto('https://facebook.com');

  /* Enter email */
  await page.focus('input#email');
  await page.keyboard.type('', keyboardTypingOptions);

  /* Enter password */
  await page.focus('input#pass');
  await page.keyboard.type('', keyboardTypingOptions);

  /* Submit login form */
  await page.click('label#loginbutton');
  await page.waitForNavigation();

  /* Click on profile button */
  await page.click('#u_0_a > div:nth-child(1) > div:nth-child(1) > div > a');
  await page.waitFor(3000);

  /* Click on activity log button */
  await page.click('a._42ft._4jy0._4jy4._517h._51sy');
  await page.waitFor(3000);

  /* Select posts activity log */
  await page.click('#navItem_statuscluster > a');
  await page.waitFor(2000);

  /* Click on activity log item options */
  await page.click('a._42ft._42fu._4-s1._2agf._4o_4._p._42gx');
  await page.waitFor(2000);

  /* Destroy browser */
  await browser.close();
})();

const keyboardTypingOptions = {
  delay: 0,
};
