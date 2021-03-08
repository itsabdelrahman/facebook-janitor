import consola from 'consola';
import {
  launchBrowser,
  openNewPage,
  loginUser,
  navigateToProfilePage,
  deleteLatestPost,
} from './automation';
import { Credentials } from './types';

export const deleteFacebookPosts = async (
  credentials: Credentials,
): Promise<void> => {
  const { email, password } = credentials;

  const browser = await launchBrowser();
  const page = await openNewPage('https://facebook.com')(browser);

  consola.info('Logging in...');
  await loginUser({ email, password })(page);

  consola.info('Navigating to profile page...');
  await navigateToProfilePage(page);

  while (true) {
    consola.info('Deleting post...');
    await deleteLatestPost(page);
  }
};
