import { Todo, UpdateTodoCheckedRequest, UpdateTodoTextRequest } from "./Todo.ts";

export const TODOS_URL = "api/todos";

interface FetchApiProps<Body> {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: Body,
  errorMessage?: string,
}

const fetchTodosApi = async <R = void, Body = Record<string, unknown>>(props?: FetchApiProps<Body>): Promise<R> => {

  const { url = '', method = 'GET', body, errorMessage } = props || {};

  const response = await fetch(TODOS_URL + url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method,
    body: body ? JSON.stringify(body) : undefined
  });

  const textResp = await response.text();
  const responseBody = textResp ? JSON.parse(textResp) : undefined;
  if (!response.ok) {
    throw new Error(responseBody?.message || errorMessage || `ServerError`);
  }
  return responseBody;
}

export const fetchTodos = () =>
  fetchTodosApi<Todo[]>({
    errorMessage: 'Could not fetch todos'
  });

export const addTodo = (newTodo: Partial<Todo>) =>
  fetchTodosApi({
    method: 'POST',
    body: newTodo
  });

export const deleteTodo = (id: number) =>
  fetchTodosApi({
    url: `/${id}`,
    method: 'DELETE',
    errorMessage: 'Delete failed'
  });

export const updateTodoText = ({ id, text }: UpdateTodoTextRequest) =>
  fetchTodosApi<Todo>({
    url: `/${id}/text`,
    method: 'PUT',
    body: { text },
    errorMessage: `Todo '${text}' update failed`
  });

export const updateTodoCheck = ({ id, checked }: UpdateTodoCheckedRequest) =>
  fetchTodosApi({
    url: `/${id}/checked`,
    method: 'PUT',
    body: { checked },
    errorMessage: `Todo update failed`
  });

export const clearCompleted = () =>
  fetchTodosApi({
    url: '/clear-completed',
    method: 'PUT',
    errorMessage: `Clearing all todos completion failed`
  });
