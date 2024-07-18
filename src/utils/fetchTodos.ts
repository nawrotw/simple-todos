import { Todo } from "../api/todos/Todo.ts";

export const BASE_URL = "api/todos";

export const fetchTodos = async (): Promise<Todo[]> => {

  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Could not fetch todos`);
  }

  return await response.json();
};

export const updateTodoCheck = async ({ id, checked }: Todo): Promise<Todo> => {

  const response = await fetch(BASE_URL + `/${id}/update-checked`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(checked)
  });
  if (!response.ok) {
    throw new Error(`Could not update todo ${id}`);
  }
  return await response.json();
};

export const clearCompleted = async (): Promise<void> => {

  const response = await fetch(BASE_URL + `/clear-completed`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error(`Could not update todos`);
  }
  await response.json();
};
