import { QueryClient } from "@tanstack/react-query";
import { Todo } from "../api/todos/Todo.ts";

export const updateCacheTodo = (queryClient: QueryClient, todo: Todo) => {
  queryClient.setQueryData<Todo[]>(['todos'], (old) => {
    if (!old) throw new Error(`Todos list is undefined. Should not happen`);
    const index = old?.findIndex(({id}) => id === todo.id);
    if (index === -1) throw new Error(`Todo {id: ${todo.id} not found. Should not happen!`);
    return [...old.slice(0, index), todo, ...old.slice(index + 1)];
  });
}

export const getTodoFromCache = (queryClient: QueryClient, id: number) => {
  const old: Todo[] | undefined = queryClient.getQueryData(['todos']);
  const todo = old?.find(todo => todo.id === id);
  if (!todo) {
    throw new Error(`Todo {id: ${id} not found. Should not happen!`);
  }
  return todo;
}
