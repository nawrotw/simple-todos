export interface Todo {
  id: number;
  checked: boolean;
  text: string;
}

export interface UpdateTodoTextRequest {
  id: number;
  text: string;
}

export interface UpdateTodoCheckedRequest {
  id: number;
  checked: boolean;
}

