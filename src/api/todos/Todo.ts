export interface Todo {
  id: number;
  checked: boolean;
  description: string;
}

export interface UpdateTodoCheckedRequest {
  id: number;
  checked: boolean;
}
