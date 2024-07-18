import { memo, useRef } from "react";
import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText } from "@mui/material";

export interface TodoListItemProps<T> {
  id: T;
  text: string;
  checked: boolean;
  onClick: (selectedItemId: T, checked: boolean) => void;
}

const GenericTodoListItem = <T, >(props: TodoListItemProps<T>) => {
  const { id, text, checked, onClick } = props
  const labelId = `todos-label-${text}`;

  // just for render demo purposes
  const renderTimesRef = useRef(0);
  renderTimesRef.current = renderTimesRef.current + 1;
  // const primaryText = `[${renderTimesRef.current}] ` + text;
  const primaryText = text;

  return <ListItem disablePadding sx={{borderBottom:'1px solid #CCC'}}>
    <ListItemButton onClick={() => onClick(id, checked)} data-testid={`todoItem-${id}`}>
      <ListItemIcon sx={{ minWidth: 0 }}>
        <Checkbox
          edge="start"
          checked={checked}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </ListItemIcon>
      <ListItemText id={labelId} primary={primaryText}/>
    </ListItemButton>
  </ListItem>
};

export const TodoListItem = memo(GenericTodoListItem) as typeof GenericTodoListItem;

