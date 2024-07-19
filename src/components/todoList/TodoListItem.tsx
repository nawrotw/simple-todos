import { memo, useRef } from "react";
import { ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, IconButton, styled } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export const StyledListItem = styled(ListItem)`
    .MuiListItemSecondaryAction-root {
        opacity: 0;
        transition: opacity 0.1s ease-out;
    }

    :hover .MuiListItemSecondaryAction-root {
        opacity: 1;
    }
`

export interface TodoListItemProps<T> {
  id: T;
  text: string;
  checked: boolean;
  onClick: (todoId: T, checked: boolean) => void;
  onEdit: (todoId: T, text: string) => void;
  onDelete: (todoId: T) => void;
}

const GenericTodoListItem = <T, >(props: TodoListItemProps<T>) => {
  const { id, text, checked, onClick, onEdit, onDelete } = props
  const labelId = `todos-label-${text}`;

  // just for render demo purposes
  const renderTimesRef = useRef(0);
  renderTimesRef.current = renderTimesRef.current + 1;
  // const primaryText = `[${renderTimesRef.current}] ` + text;
  const primaryText = text;

  return <StyledListItem
    disablePadding sx={{ borderBottom: '1px solid #CCC' }}
    secondaryAction={<>
      <IconButton
        edge="end" aria-label="edit" sx={{ mr: 0.5 }}
        onClick={() => onEdit(id, text)}
      >
        <EditIcon/>
      </IconButton>
      <IconButton edge="end" aria-label="delete" onClick={() => onDelete(id)}>
        <DeleteForeverIcon color='error'/>
      </IconButton>
    </>}
  >
    <ListItemButton
      onClick={() => onClick(id, checked)} data-testid={`todoItem-${id}`}
      onDoubleClick={() => onEdit(id, text)}
    >
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
  </StyledListItem>
};

export const TodoListItem = memo(GenericTodoListItem) as typeof GenericTodoListItem;

