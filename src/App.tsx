import { useCallback, useMemo, useState, useRef } from 'react'
import './App.scss'
import { styled, Alert } from "@mui/material";
import { AddTodo } from "./components/addTodo/AddTodo.tsx";
import { TodoList } from "./components/todoList/TodoList.tsx";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./api/todos/fetchTodos.ts";
import { useTodosMutation } from "./api/todos/useTodosMutation.ts";
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

  const { addTodo, deleteTodo, updateChecked, updateText, clearCompleted } = useTodosMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const [editId, setEditId] = useState<number>();
  const [editText, setEditText] = useState<string>("");

  const [filter, setFilter] = useState<FilterType>('none');

  const filteredTodos = useMemo(
    () => (todos || []).filter(filterMap[filter]),
    [todos, filter]
  );

  const itemsLeftCount = useMemo(() => {
    if (!todos) return -1;
    return todos.reduce((count, todo) => todo.checked ? count : count + 1, 0);
  }, [todos]);

  const handleAddTodo = (text: string) => {
    addTodo({ id: -1, text, checked: false });
    setEditText('');
  }

  // This is one of the essential piece to have stable reference to toggle function, so ListItem memo will work
  // There are many different ways to handle this ListItem rendering issue.
  const handleToggle = useCallback((todoId: number, checked: boolean) => {
    updateChecked({ id: todoId, checked: !checked });
  }, [updateChecked]);

  const handleEdit = useCallback((todoId: number, text: string) => {
    setEditId(todoId);
    setEditText(text);
    inputRef.current?.focus();
  }, []);

  const handleDelete = useCallback((todoId: number) => {
    deleteTodo(todoId);
  }, [deleteTodo]);

  const handleSave = (id: number, text: string) => {
    updateText({ id, text });
    setEditId(undefined);
    setEditText("");
  };

  const handleTextClear = () => {
    setEditId(undefined);
    setEditText("");
  };

  return (
    <Root>
      {error && <Alert sx={{ m: -1, mb: 1, borderRadius: 0 }} variant="filled" severity="error">{error.message}</Alert>}
      <Title>todos</Title>
      <AddTodo
        id={editId}
        ref={inputRef}
        text={editText}
        onAdd={handleAddTodo}
        onSave={handleSave}
        onTextChange={setEditText}
        onTextClear={handleTextClear}
      />
      <TodoList isPending={isPending} todos={filteredTodos} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete}/>
      <ActionBar itemsLeftCount={itemsLeftCount} filter={filter} onFilterChange={setFilter} onClear={clearCompleted}/>
    </Root>
  )
}

export default App
