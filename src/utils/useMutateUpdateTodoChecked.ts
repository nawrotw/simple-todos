import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoCheck } from "./fetchTodos.ts";
import { Todo } from "../api/todos/Todo.ts";

export const useMutateUpdateTodoChecked = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoCheck,
    onMutate: async ({ id, checked }: Todo) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos', id] });

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        if (!old) return;
        const todo = old?.find(todo => todo.id === id);
        if (!todo) throw new Error(`Todo {id: ${id} not found. Should not happen!`);
        todo.checked = !checked;
        return [...old];
      });
    },
    onSettled: () => {
      // Always re-fetch after error or success
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })
}
