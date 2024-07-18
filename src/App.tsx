import { useCallback } from 'react'
import './App.scss'
import { styled } from "@mui/material";
import { AddTodo } from "./components/addTodo/AddTodo.tsx";
import { TodoList } from "./components/todoList/TodoList.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./utils/fetchTodos.ts";
import { useMutateUpdateTodoChecked } from "./utils/useMutateUpdateTodoChecked.ts";
import { ActionBar } from "./components/actionBar/ActionBar.tsx";

export const Root = styled('div')`
    background-color: ${({ theme }) => theme.palette.background.default};
    height: 100dvh;
    min-width: 600px;
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
    color: #E08400;
    text-align: center;
`;


function App() {

  const { data: todos, isPending, error } = useQuery({ queryKey: ['todos'], queryFn: () => fetchTodos() })

  const { mutate } = useMutateUpdateTodoChecked();

  if (error) return 'An error has occurred: ' + error.message;

  const handleAddTodo = (newTodo: string) => {
    console.log(newTodo)
  }

  const handleToggle = useCallback((selectedItemId: number, checked: boolean) => {
    mutate({ id: selectedItemId, checked, description: '' });
  }, [mutate]);

  return (
    <Root>
      <Title>todos</Title>
      <AddTodo onAdd={handleAddTodo}/>
      <TodoList isPending={isPending} todos={todos} onToggle={handleToggle}/>
      <ActionBar/>
    </Root>
  )
}

export default App
