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

  await loginUser({ email, password })(page);
  consola.success('LOGGED IN');

  await navigateToProfile(page);
  consola.success('NAVIGATED TO PROFILE');

  await navigateToActivityLog(page);
  consola.success('NAVIGATED TO ACTIVITY LOG');

  await selectActivityLogFilter('posts')(page);
  consola.success('SELECTED ACTIVITY LOG FILTER');

  await deleteFirstPost(page);
  consola.success('DELETED FIRST POST');

  await closeBrowser(browser);
};

export default deleteFacebookActivities;
