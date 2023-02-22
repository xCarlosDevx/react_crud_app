export interface IInputText {
  value?: { state: any; set: any };
  label: string;
}
export interface IInputButton extends IInputText {
  fn(): void;
}
export interface ITask {
  id: number;
  nameTask: string;
  descriptionTask: string;
  state: boolean;
}
export interface ITaskList {
  taskCount: number;
  tasks: ITask[];
  complete: number;
  pending: number;
}

export interface props {
  children: JSX.Element | JSX.Element[];
}
