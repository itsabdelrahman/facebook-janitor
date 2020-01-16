import inquirer from 'inquirer';
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

(async () => {
  const { email, password } = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: 'Enter email:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter password:',
      mask: '*',
    },
  ]);

  const browser = await launchBrowser({ headless: false });

  let page = await openNewPage('https://facebook.com')(browser);

  page = await loginUser({ email, password })(page);
  page = await navigateToProfile(page);
  page = await navigateToActivityLog(page);
  page = await selectActivityLogFilter('POSTS')(page);
  page = await deleteFirstPost(page);

  await closeBrowser(browser);
})();
