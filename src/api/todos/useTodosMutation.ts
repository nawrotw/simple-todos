import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoCheck, clearCompleted as clearCompletedFn, addTodo, updateTodoText } from "./fetchTodos.ts";
import { Todo } from "./Todo.ts";
import { getTodoFromCache, setTodoCache } from "../../utils/reactQueryUtils.ts";

export const useTodosMutation = () => {
  const queryClient = useQueryClient();

  const getTodo = (id: number) => getTodoFromCache(queryClient, id);
  const setTodo = (todo: Todo) => setTodoCache(queryClient, todo);

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      const previousTodos = queryClient.getQueryData(['todos']) as Todo[];
      queryClient.setQueryData(['todos'], (old: Todo[]) => [...old, newTodo]);

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_err, _newTodo, context) => {
      context && queryClient.setQueryData(['todos'], context.previousTodos)
    },
    onSettled: () => { // Always re-fetch after error or success:
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const updateTextMutation = useMutation({
    mutationFn: updateTodoText,
    onMutate: async ({ id, text }) => {
      await queryClient.cancelQueries({ queryKey: ['todos', id] });
      setTodo({ ...getTodo(id), description: text });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const updateCheckedMutation = useMutation({
    mutationFn: updateTodoCheck,
    onMutate: async ({ id, checked }) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['todos', id] });
      setTodo({ ...getTodo(id), checked: checked });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const clearCompletedMutate = useMutation({
    mutationFn: clearCompletedFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      queryClient.setQueryData<Todo[]>(['todos'],
        (old) => old?.map((todo: Todo) => ({ ...todo, checked: false }))
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },

  })

  return {
    updateChecked: updateCheckedMutation.mutate,
    updateText: updateTextMutation.mutate,
    clearCompleted: clearCompletedMutate.mutate,
    addTodo: addTodoMutation.mutate
  };
}
