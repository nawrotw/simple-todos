import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import { afterAll, beforeAll, describe, expect, it, beforeEach, afterEach } from "vitest";
import App from "./App.tsx";
import { TestApiProvider } from "./components/TestApiProvider.tsx";
import { setupServer } from 'msw/node'
import { todosApiMock, resetTodosDB, todos } from "./api/todos/mocks/todosApiMock.ts";
import { userEvent, UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { TODOS_URL } from "./api/todos/fetchTodos.ts";

const getTodoItem = (todoId: number) => (screen.getByTestId(`todoItem-${todoId}`));
const isTodoChecked = (todoId: number) => (getTodoItem(todoId).querySelector('input') as HTMLInputElement)?.checked;

const waitTodosLoaded = async () => {
  await screen.findByText('Loading...');
  await waitForElementToBeRemoved(screen.getByText('Loading...'));
}

describe("App integration suite", () => {
  const server = setupServer(...todosApiMock.success);

  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    resetTodosDB();
  });

  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
    render(<TestApiProvider><App/></TestApiProvider>);
  });

  it("should load and render todos", async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    await waitForElementToBeRemoved(screen.getByText('Loading...'));

    expect(await screen.findByText('Buy some water')).toBeInTheDocument();
    expect(isTodoChecked(1)).toBeFalsy();

    expect(screen.getByText('Clean a bike')).toBeInTheDocument();
    expect(isTodoChecked(2)).toBeTruthy();

    expect(screen.getByText('3 items left')).toBeInTheDocument();
  });

  it("should add new todo", async () => {
    await screen.findByText('3 items left'); // await loaded

    await user.keyboard('foo');
    await user.click(screen.getByText('Add Todo'));

    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(isTodoChecked(5)).toBeFalsy();

    expect(screen.getByTestId('leftItemsCount')).toHaveTextContent('4 items left');
  });

  it("should delete todo", async () => {
    await waitTodosLoaded();

    await user.click(screen.getByTestId('deleteTodoBtn-1'));

    expect(screen.queryByText('Buy some water')).not.toBeInTheDocument();
  });

  it("should update todo text", async () => {
    await waitTodosLoaded();

    await user.click(screen.getByTestId('editTodoBtn-1'));
    await user.keyboard(' 2');
    await user.click(screen.getByText('Save'));

    await screen.findByText('Buy some water 2');
  });

  it("should toggle todo", async () => {
    await screen.findByText('3 items left');

    await user.click(getTodoItem(1));
    await screen.findByText('2 items left');

    await user.click(getTodoItem(1));
    await screen.findByText('3 items left');
  });

  it("should clear completed", async () => {
    await screen.findByText('3 items left');

    await user.click(screen.getByText('Clear completed'));
    await screen.findByText('4 items left');
  });

  describe('should apply filter', () => {

    it("Active", async () => {
      await screen.findByText('Clean a bike');

      await user.click(screen.getByText('Active'));

      expect(screen.getByText('Buy some water')).toBeInTheDocument();
      expect(screen.queryByText('Clean a bike')).not.toBeInTheDocument();
      expect(screen.getByText('Wax a chain')).toBeInTheDocument();
      expect(screen.getByText('Call John')).toBeInTheDocument();
    });

    it("Completed", async () => {
      await screen.findByText('Clean a bike');

      await user.click(screen.getByText('Completed'));

      expect(screen.queryByText('Buy some water')).not.toBeInTheDocument();
      expect(screen.getByText('Clean a bike')).toBeInTheDocument();
      expect(screen.queryByText('Wax a chain')).not.toBeInTheDocument();
      expect(screen.queryByText('Call John')).not.toBeInTheDocument();
    });
  });

  it("should show and close error", async () => {
    await waitTodosLoaded();

    server.resetHandlers(
      http.get(TODOS_URL, () => HttpResponse.json(todos)),
      http.put(`${TODOS_URL}/clear-completed`, () => new HttpResponse(null, { status: 500 })),
    )

    await user.click(screen.getByText('Clear completed'));
    expect(await screen.findByTestId('errorAlert')).toHaveTextContent('Clearing completed todos failed');

    await user.click(within(screen.getByTestId('errorAlert')).getByTitle('Close'));

    expect(screen.queryByTestId('errorAlert')).not.toBeInTheDocument();
  });
});
