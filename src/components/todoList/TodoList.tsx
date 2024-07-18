import { Todo } from "../../api/todos/Todo.ts";
import { List, styled } from "@mui/material";
import { TodoListItem } from "./TodoListItem.tsx";

export const StyledList = styled(List)`
    flex: 1;
    overflow: auto;
    padding-top: 0;
    margin-top: 8px;
`;
export const LoadingText = styled('div')`
    padding: 2rem;
    font-size: 2rem;
    font-weight: 300;
`;

export interface TodoListProps {
  isPending: boolean;
  todos?: Todo[];
  onToggle: (selectedItemId: number, checked: boolean) => void;
}

export const TodoList = ({ todos, onToggle, isPending }: TodoListProps) => {

  return <StyledList>
    {isPending && <LoadingText>Loading...</LoadingText>}
    {todos?.map(({ id, description, checked }) =>
      <TodoListItem key={id} id={id} text={description} checked={checked} onClick={onToggle}/>)}
  </StyledList>
}
