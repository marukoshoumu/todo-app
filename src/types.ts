export type StatusType = 'notStarted' | 'inProgress' | 'done';

export interface TodoItemType {
  id: number;
  title: string;
  status: StatusType;
  detail: string;
  deadline?: string;
}
