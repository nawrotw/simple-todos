import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoCheck, clearCompleted, addTodo } from "./fetchTodos.ts";
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
        const index = old?.findIndex(todo => todo.id === id);
        if (index === -1) throw new Error(`Todo {id: ${id} not found. Should not happen!`);
        const newTodo = {
          ...old[index],
          checked: !checked
        }
        return [...old.slice(0, index), newTodo, ...old.slice(index + 1)];
      });
    },
    onSettled: () => {
      // TODO wkn uncomment!
      // Always re-fetch after error or success
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })
}

export const useClearCompleted = () => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCompleted,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      // Optimistically update to the new value
      queryClient.setQueryData<Todo[]>(['todos'], (old) => {
        if (!old) return;

        return old.map((todo: Todo) => ({
          ...todo,
          checked: false
        }));
      });
    },
    onSettled: () => {
      // Always re-fetch after error or success
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  })
}

export const useAddTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData(['todos']) as Todo[];
      queryClient.setQueryData(['todos'], (old: Todo[]) => [...old, newTodo])

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newTodo, context) => {
      context && queryClient.setQueryData(['todos'], context.previousTodos)
    },
    // Always re-fetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}
