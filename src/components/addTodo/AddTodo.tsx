import { TextField, Button, styled, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import { FormEvent, forwardRef } from "react";

export const Form = styled('form')`
    display: flex;
`;

export interface AddTodoProps {
  id?: number;
  text: string;
  onTextChange: (value: string) => void;
  onAdd: (value: string) => void;
  onSave: (todoId: number, text: string) => void;
}

export const AddTodo = forwardRef<HTMLInputElement, AddTodoProps>((props: AddTodoProps, ref) => {
  const { id, text, onTextChange, onAdd, onSave } = props;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id) {
      onSave(id, text);
      return;
    }
    onAdd(text);
  }

  return <div>
    <Form onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextField
        inputRef={ref}
        id="newTodo"
        autoFocus
        autoComplete="off"
        value={text}
        onChange={e => onTextChange(e.target.value)}
        label="What needs to be done?"
        size='small'
        sx={{ flex: 1 }}
        InputProps={{
          endAdornment: <InputAdornment position="start">
            <IconButton onClick={() => onTextChange('')}>
              <ClearIcon/>
            </IconButton>
          </InputAdornment>,
        }}
      />
      <Button
        type="submit"
        sx={{ marginLeft: '5px' }}
        variant='contained'
      >
        {id ? 'Save' : 'Add Todo'}
      </Button>
    </Form>
  </div>
})
