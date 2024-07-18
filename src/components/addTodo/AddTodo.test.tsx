import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddTodo } from "./AddTodo.tsx";
import { userEvent } from "@testing-library/user-event";

const getTodoInput = () => screen.getByLabelText('What needs to be done?');
const getSubmitButton = () => screen.getByText("Add Todo");

describe("Add todo", () => {

  it("should respect props value", async () => {
    render(<AddTodo onAdd={vi.fn()} value='Some default todo'/>);
    expect(getTodoInput()).toHaveValue('Some default todo');
  });

  it("should fire onAddFn on button click", async () => {
    const onAddSpy = vi.fn();
    const user = userEvent.setup();

    render(<AddTodo onAdd={onAddSpy}/>);

    await user.type(getTodoInput(), 'Something awesome!');
    expect(getTodoInput()).toHaveValue('Something awesome!');

    await userEvent.click(getSubmitButton());
    expect(onAddSpy).toHaveBeenCalledWith('Something awesome!');
  });

  it("should fire onAddFn on enter key", async () => {
    const onAddSpy = vi.fn();
    const user = userEvent.setup();

    render(<AddTodo onAdd={onAddSpy}/>);

    await user.type(getTodoInput(), 'Something awesome!');
    await userEvent.keyboard('[Enter]');

    expect(onAddSpy).toHaveBeenCalledWith('Something awesome!');
  });

});
