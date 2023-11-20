export type TaskNoId = {
  name: string;
  owner: string;
  isCompleted: boolean;
};

export type Task = {
  id: string;
} & TaskNoId;
