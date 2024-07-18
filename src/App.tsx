import { useCallback, useMemo, useState } from 'react'
import './App.scss'
import { styled } from "@mui/material";
import { AddTodo } from "./components/addTodo/AddTodo.tsx";
import { TodoList } from "./components/todoList/TodoList.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./utils/fetchTodos.ts";
import { useMutateUpdateTodoChecked, useClearCompleted } from "./utils/useMutateUpdateTodoChecked.ts";
import { ActionBar, FilterType } from "./components/actionBar/ActionBar.tsx";
import { colors } from "./styles/colors.ts";
import { Todo } from "./api/todos/Todo.ts";

export const Root = styled('div')`
    background-color: ${({ theme }) => theme.palette.background.default};
    height: 100dvh;
    width: 600px;
    display: flex;
    flex-direction: column;

    padding: ${({ theme }) => theme.spacing(1)};

    box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
    -moz-box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
    -webkit-box-shadow: 0px 0px 24px 0px rgba(66, 68, 90, 1);
`;
export const Title = styled('div')`
    font-size: 5rem;
    margin-top: -8px;
    font-weight: 100;
    color: ${colors.orange};
    text-align: center;
`;

const filterMap: Record<FilterType, (todo: Todo) => boolean> = {
  none: () => true,
  active: (todo) => !todo.checked,
  completed: (todo) => todo.checked,
}

function App() {

  const { data: todos, isPending, error } = useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos() });
  const { mutate: updateChecked } = useMutateUpdateTodoChecked();
  const { mutate: clearCompleted } = useClearCompleted();


  const [filter, setFilter] = useState<FilterType>('none');

  const filteredTodos = useMemo(
    () => (todos || []).filter(filterMap[filter]),
    [todos, filter]
  );

  const itemsLeftCount = useMemo(() => {
    if (!todos) return -1;
    return todos.reduce((count, todo) => todo.checked ? count : count + 1, 0);
  }, [todos]);

  if (error) return 'An error has occurred: ' + error.message;

  const handleAddTodo = (newTodo: string) => {
    console.log(newTodo)
  }

  // This is one of the essential piece to have stable reference to toggle function, so ListItem memo will work
  // There are many different ways to handle this ListItem rendering issue.
  const handleToggle = useCallback((selectedItemId: number, checked: boolean) => {
    updateChecked({ id: selectedItemId, checked, description: 'FIXME' });
  }, [updateChecked]);

  return (
    <Root>
      <Title>todos</Title>
      <AddTodo onAdd={handleAddTodo}/>
      <TodoList isPending={isPending} todos={filteredTodos} onToggle={handleToggle}/>
      <ActionBar itemsLeftCount={itemsLeftCount} filter={filter} onFilterChange={setFilter} onClear={clearCompleted}/>
    </Root>
  )
}

export default App
