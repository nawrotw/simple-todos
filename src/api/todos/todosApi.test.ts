import { setupServer } from 'msw/node'
import { beforeAll, describe, expect, it, afterEach, } from 'vitest';

import { mockedTodosApi } from './mocks/mockedTodosApi.ts';
import { todosApi } from "./todosApi.ts";

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
    server.use(...mockedTodosApi.success);
    const todos = await todosApi();
    expect(todos).toEqual(todos);
  });

  it('error?!', async () => {
    server.use(...mockedTodosApi.error);
    expect(() => todosApi()).rejects.toMatchObject(new Error(`Could not fetch todos`));
  });
});
