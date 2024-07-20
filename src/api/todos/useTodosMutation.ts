import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodoCheck, clearCompleted as clearCompletedFn, addTodo, updateTodoText, deleteTodo } from "./fetchTodos.ts";
import { Todo } from "./Todo.ts";
import { getTodoFromCache, setTodoCache } from "../../utils/reactQueryUtils.ts";

export const useTodosMutation = () => {
  const queryClient = useQueryClient();

  const getTodo = (id: number) => getTodoFromCache(queryClient, id);
  const setTodo = (todo: Todo) => setTodoCache(queryClient, todo);

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      // Cancel any outgoing re-fetches (so they don't overwrite our optimistic update)
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
    // Always re-fetch after error or success:
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos', id] });
      queryClient.setQueryData(['todos'], (old: Todo[]) => old.filter(todo => todo.id !== id));
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateTextMutation = useMutation({
    mutationFn: updateTodoText,
    onMutate: async ({ id, text }) => {
      await queryClient.cancelQueries({ queryKey: ['todos', id] });
      setTodo({ ...getTodo(id), text: text });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const updateCheckedMutation = useMutation({
    mutationFn: updateTodoCheck,
    onMutate: async ({ id, checked }) => {
      await queryClient.cancelQueries({ queryKey: ['todos', id] });
      setTodo({ ...getTodo(id), checked: checked });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  const clearCompletedMutate = useMutation({
    mutationFn: clearCompletedFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      queryClient.setQueryData<Todo[]>(['todos'],
        (old) => old?.map((todo: Todo) => ({ ...todo, checked: false }))
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });

  addTodoMutation.error
  addTodoMutation.reset

  return {
    addTodo: addTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    updateChecked: updateCheckedMutation.mutate,
    updateText: updateTextMutation.mutate,
    clearCompleted: clearCompletedMutate.mutate,
    mutations: [addTodoMutation, deleteTodoMutation, updateCheckedMutation, updateTextMutation, clearCompletedMutate]
  };
}
