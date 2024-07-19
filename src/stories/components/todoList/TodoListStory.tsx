import { TodoList } from "../../../components/todoList/TodoList.tsx";
import { todos } from "../../../api/todos/mocks/todosApiMock.ts";
import { useCallback } from "react";


export const TodoListStory = () => {

  const handleToggle = useCallback((todoId: number, checked: boolean) => {
    console.log(`[handleToggle] todoId: ${todoId}, checked: ${checked}`);
  }, []);

  const handleEdit = useCallback((todoId: number, text: string) => {
    console.log(`[handleEdit] todoId: ${todoId}, checked: ${text}`);
  }, []);

  const handleDelete = useCallback((todoId: number) => {
    console.log(`[handleDelete] todoId: ${todoId}`);
  }, []);

  return (<div style={{ minWidth: "350px" }}>
    <TodoList todos={todos} onToggle={handleToggle} onEdit={handleEdit} onDelete={handleDelete}/>
  </div>);
};
