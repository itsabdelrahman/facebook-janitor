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
  await navigateToProfile(page);
  await navigateToActivityLog(page);
  await selectActivityLogFilter('posts')(page);
  await deleteFirstPost(page);

  await closeBrowser(browser);
};

const defaultDeletionOptions: DeletionOptions = {
  filters: ['posts'],
};

export default deleteFacebookActivities;
