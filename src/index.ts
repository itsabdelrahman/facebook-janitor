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
  const page = await openNewPage('https://facebook.com')(browser);

  await loginUser({ email, password })(page);
  await navigateToProfile(page);
  await navigateToActivityLog(page);
  await selectActivityLogFilter('POSTS')(page);
  await deleteFirstPost(page);

  await closeBrowser(browser);
})();
