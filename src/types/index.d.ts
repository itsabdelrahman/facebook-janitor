export type Credentials = {
  email: string;
  password: string;
};

export type DeletionOptions = {
  filters?: ActivityLogFilter[];
};

export type ActivityLogFilter = 'posts';
