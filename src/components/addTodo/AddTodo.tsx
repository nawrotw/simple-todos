import { TextField, Button, styled } from "@mui/material";
import { FormEvent } from "react";

export const Form = styled('form')`
    display: flex;
`;

interface FormElements extends HTMLFormControlsCollection {
  newTodo: HTMLInputElement
}

interface UsernameFormElement extends HTMLFormElement {
  readonly elements: FormElements
}

export interface AddTodoProps {
  value?: string;
  onAdd: (value: string) => void;
}

export const AddTodo = (props: AddTodoProps) => {
  const { value, onAdd } = props;

  const handleSubmit = (e: FormEvent<UsernameFormElement>) => {
    e.preventDefault();
    onAdd(e.currentTarget.elements.newTodo.value);
  }

  return <div>
    <Form onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextField
        id="newTodo"
        autoFocus
        autoComplete="off"
        defaultValue={value}
        label="What needs to be done?"
        size='small'
        sx={{ flex: 1 }}
      />
      <Button type="submit" sx={{ marginLeft: '5px' }} variant='contained'>Add Todo</Button>
    </Form>
  </div>
}
