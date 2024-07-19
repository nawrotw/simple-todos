import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddTodo } from "./AddTodo.tsx";
import { userEvent } from "@testing-library/user-event";

const getTodoInput = () => screen.getByLabelText('What needs to be done?');
const getSubmitButton = () => screen.getByText("Add Todo");
const getSaveButton = () => screen.getByText("Save");

describe("Add todo", () => {

  it("should respect props value", async () => {
    render(<AddTodo text='Some default todo' onAdd={vi.fn()} onSave={vi.fn()} onTextChange={vi.fn()}/>);
    expect(getTodoInput()).toHaveValue('Some default todo');
  });

  it("should fire onAddFn on button click", async () => {
    const onAddSpy = vi.fn();
    const user = userEvent.setup();

    render(<AddTodo text='Something awesome!' onAdd={onAddSpy} onSave={vi.fn()} onTextChange={vi.fn()}/>);

    await user.click(getSubmitButton());
    expect(onAddSpy).toHaveBeenCalledWith('Something awesome!');
  });

  it("should fire onAddFn on enter key", async () => {
    const onAddSpy = vi.fn();
    const user = userEvent.setup();

    render(<AddTodo text='Something awesome!' onAdd={onAddSpy} onSave={vi.fn()} onTextChange={vi.fn()}/>);

    await user.keyboard('[Enter]');

    expect(onAddSpy).toHaveBeenCalledWith('Something awesome!');
  });

  it("should fire onSaveFn on button click", async () => {
    const onSaveSpy = vi.fn();
    const onAddSpy = vi.fn();
    const user = userEvent.setup();

    render(<AddTodo text='Something awesome!' id={6543223} onAdd={onAddSpy} onSave={onSaveSpy} onTextChange={vi.fn()}/>);

    await user.click(getSaveButton());
    expect(onSaveSpy).toHaveBeenCalledWith(6543223, 'Something awesome!');
    expect(onAddSpy).not.toHaveBeenCalled();
  });

});
