import { User } from './user';

export type Note = {
  id: string;
  title: string;
  author: User;
  isImportant: boolean;
};
