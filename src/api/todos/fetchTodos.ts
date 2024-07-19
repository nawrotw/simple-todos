import { Todo, UpdateTodoCheckedRequest, UpdateTodoTextRequest } from "./Todo.ts";

export const TODOS_URL = "api/todos";

interface FetchApiProps<Body> {
  url?: string
  method?: 'GET' | 'POST' | 'PUT',
  body?: Body
}

const fetchTodosApi = async <R = void, Body = Record<string, unknown>>(props?: FetchApiProps<Body>): Promise<R> => {

  const { url = '', method = 'GET', body } = props || {};

  const response = await fetch(TODOS_URL + url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    throw new Error(`Could not fetch todos`);
  }

  return await response.json();
}

export const fetchTodos = () => fetchTodosApi<Todo[]>();

export const addTodo = (newTodo: Partial<Todo>) =>
  fetchTodosApi<Todo>({
    method: 'POST',
    body: newTodo
  });

export const updateTodoText = ({ id, text }: UpdateTodoTextRequest) =>
  fetchTodosApi<Todo>({
    url: `/${id}/text`,
    method: 'PUT',
    body: { text }
  });

export const updateTodoCheck = ({ id, checked }: UpdateTodoCheckedRequest) =>
  fetchTodosApi({
    url: `/${id}/update-checked`,
    method: 'PUT',
    body: { checked }
  });

export const clearCompleted = () =>
  fetchTodosApi({
    url: '/clear-completed',
    method: 'PUT'
  });
