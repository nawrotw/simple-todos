import { Todo, UpdateTodoCheckedRequest } from "./Todo.ts";

export const TODOS_URL = "api/todos";

export const todosApi = async (): Promise<Todo[]> => {

  const response = await fetch(TODOS_URL);

  if (!response.ok) {
    throw new Error(`Could not fetch todos`);
  }

  return await response.json();
};

export const addTodo = async (newTodo: Partial<Todo>): Promise<Todo> => {

  const response = await fetch(TODOS_URL, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(newTodo)
  });
  if (!response.ok) {
    throw new Error(`Could not add todo`);
  }
  return await response.json();
};

export const updateTodoCheck = async ({ id, checked }: UpdateTodoCheckedRequest): Promise<void> => {

  const response = await fetch(TODOS_URL + `/${id}/update-checked`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
    body: JSON.stringify({ checked })
  });
  if (!response.ok) {
    throw new Error(`Could not update todo ${id}`);
  }
};

export const clearCompleted = async (): Promise<void> => {

  const response = await fetch(TODOS_URL + `/clear-completed`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "PUT",
  });
  if (!response.ok) {
    throw new Error(`Could not update todos`);
  }
  await response.json();
};
