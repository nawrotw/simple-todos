import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { TodoList } from "./TodoList.tsx";
import { Todo } from "../../api/todos/Todo.ts";

export const todos: Todo[] = [
  {
    id: 1,
    checked: false,
    description: "Buy some water"
  },
  {
    id: 2,
    checked: true,
    description: "Clean a bike"
  }
];

const getTodoItem = (todoId: number) => (screen.getByTestId(`todoItem-${todoId}`));
const isTodoChecked = (todoId: number) => (getTodoItem(todoId).querySelector('input') as HTMLInputElement)?.checked;

describe("Todo List", () => {

  it("should render todos", async () => {
    render(<TodoList todos={todos}/>);

    expect(screen.getByText('Buy some water')).toBeInTheDocument();
    expect(isTodoChecked(1)).toBeFalsy();

    expect(screen.getByText('Clean a bike')).toBeInTheDocument();
    expect(isTodoChecked(2)).toBeTruthy();
  });

  it("should fire onToggle with proper params", async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();

    render(<TodoList todos={todos} onToggle={onToggle}/>);

    await user.click(getTodoItem(1));
    expect(onToggle).toHaveBeenCalledWith(1, false);

    await user.click(getTodoItem(2));
    expect(onToggle).toHaveBeenCalledWith(2, true);
  });
});
