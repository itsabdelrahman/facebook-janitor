import {
  launchBrowser,
  openNewPage,
  loginUser,
  navigateToProfile,
  navigateToActivityLog,
  selectActivityLogFilter,
  deleteFirstPost,
  closeBrowser,
} from './automation';
import { loadEnvironmentVariables } from './utilities';

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
