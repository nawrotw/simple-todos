import { setupServer } from 'msw/node'
import { beforeAll, describe, expect, it, afterEach, } from 'vitest';

import { todosApiMock } from './mocks/todosApiMock.ts';
import { fetchTodos } from "./fetchTodos.ts";

const server = setupServer();

describe("fetch todos", () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: "error" });
    return () => server.close();
  });
  afterEach(() => {
    server.resetHandlers();
  });

  it("should return todos", async () => {
    server.use(...todosApiMock.success);
    const todos = await fetchTodos();
    expect(todos).toEqual(todos);
  });

  it('error?!', async () => {
    server.use(...todosApiMock.error);
    expect(() => fetchTodos()).rejects.toMatchObject(new Error(`Could not fetch todos`));
  });
});
