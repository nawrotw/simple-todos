import { TodoList } from "../../../components/todoList/TodoList.tsx";
import { todos } from "../../../utils/mocks/handlers.ts";
import { useCallback } from "react";


export const TodoListStory = () => {

  const handleToggle = useCallback((todoId: number, checked: boolean) => {
    console.log(`[handleToggle] todoId: ${todoId}, checked: ${checked}`);
  }, []);

  return (<div style={{ minWidth: "350px" }}>
    <TodoList todos={todos} onToggle={handleToggle}/>
  </div>);
};
