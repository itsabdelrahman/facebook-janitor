#!/usr/bin/env node

import inquirer from 'inquirer';
import consola from 'consola';
import { deleteFacebookPosts } from '.';

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

  try {
    await deleteFacebookPosts({ email, password });
  } catch (error) {
    consola.error(error);
    process.exitCode = 1;
  }
})();
