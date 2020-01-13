import dotenv from 'dotenv';

export const loadEnvironmentVariables = (variables: string[]): void => {
  const { error } = dotenv.config();

  if (error) {
    throw new Error('Failed to load .env file');
  }

  let missingVariables: string[] = [];

  variables.forEach(variable => {
    if (!process.env[variable]) {
      missingVariables = missingVariables.concat(variable);
    }
  });

  if (missingVariables.length) {
    if (missingVariables.length === 1) {
      throw new Error('Missing environment variable: ' + missingVariables[0]);
    }

    throw new Error(
      'Missing environment variables: ' + missingVariables.join(', '),
    );
  }
};
