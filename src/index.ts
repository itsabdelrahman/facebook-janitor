import consola from 'consola';
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
import { Credentials, DeletionOptions } from './types';

const defaultDeletionOptions: DeletionOptions = {
  filters: ['posts'],
};

const deleteFacebookActivities = (
  deletionOptions: DeletionOptions = defaultDeletionOptions,
) => async (credentials: Credentials): Promise<void> => {
  const operationalOptions = {
    ...defaultDeletionOptions,
    ...deletionOptions,
  };

  const { email, password } = credentials;

  const browser = await launchBrowser({ headless: false });
  const page = await openNewPage('https://facebook.com')(browser);

  consola.info('LOGGING IN...');
  await loginUser({ email, password })(page);

  consola.info('NAVIGATING TO PROFILE...');
  await navigateToProfile(page);

  consola.info('NAVIGATING TO ACTIVITY LOG...');
  await navigateToActivityLog(page);

  consola.info('SELECTING ACTIVITY LOG FILTER...');
  await selectActivityLogFilter('posts')(page);

  consola.info('DELETING FIRST POST...');
  await deleteFirstPost(page);

  await closeBrowser(browser);
};

export default deleteFacebookActivities;
