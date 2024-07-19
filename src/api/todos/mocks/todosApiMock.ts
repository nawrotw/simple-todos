import { http, HttpResponse, } from 'msw';
import { TODOS_URL } from "../fetchTodos.ts";
import { Todo } from "../Todo.ts";

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
  },
  {
    id: 3,
    checked: false,
    description: "Wax a chain"
  },
  {
    id: 4,
    checked: false,
    description: "Call John"
  },
  ...Array.from(Array(0).keys()).map(i => ({
    id: 5 + i,
    checked: false,
    description: `Item ${i}`
  }) satisfies Todo)
];

let todosDB: Todo[] = [...todos];
export const resetTodosDB = () => todosDB = [...todos];

export const todosApiMock = {
  success: [
    http.get(
      TODOS_URL,
      () => HttpResponse.json(todosDB)
    ),
    http.post( // addTodo
      TODOS_URL, async ({ request }) => {
        const newTodo = await request.json() as Todo;
        newTodo.id = todosDB.length + 1;
        todosDB = [newTodo, ...todosDB];
        return HttpResponse.json(newTodo);
      }
    ),
    http.delete( // deleteTodo
      `${TODOS_URL}/:id`, async ({ params }) => {

        const todoId = parseInt(params.id as string);
        const index = todosDB.findIndex(todo => todo.id === todoId);
        if (index === -1) {
          return new HttpResponse(null, { status: 500, statusText: `Todo Not Found, id: ${todoId}` });
        }
        todosDB = todosDB.filter(todo => todo.id !== todoId);
        return HttpResponse.json();
      }
    ),
    http.put( // updateText
      `${TODOS_URL}/:id/text`, async ({ request, params }) => {
        const { text } = await request.json() as { text: string };

        const todoId = parseInt(params.id as string);
        const index = todosDB.findIndex(todo => todo.id === todoId);
        if (index === -1) {
          return new HttpResponse(null, { status: 500, statusText: `Todo Not Found, id: ${todoId}` });
        }
        const newTodo: Todo = { ...todosDB[index], description: text };
        todosDB = [...todosDB.slice(0, index), newTodo, ...todosDB.slice(index + 1)];
        return HttpResponse.json();
      }
    ),
    http.put( // updateChecked
      `${TODOS_URL}/:id/update-checked`, async ({ request, params }) => {
        const { checked } = await request.json() as { checked: boolean };

        const todoId = parseInt(params.id as string);
        const index = todosDB.findIndex(todo => todo.id === todoId);
        if (index === -1) {
          return new HttpResponse(null, { status: 500, statusText: `Todo Not Found, id: ${todoId}` });
        }
        const newTodo = { ...todosDB[index], checked: checked };
        todosDB = [...todosDB.slice(0, index), newTodo, ...todosDB.slice(index + 1)];
        return HttpResponse.json();
      }
    ),
    http.put(
      `${TODOS_URL}/clear-completed`,
      () => {
        todosDB = todosDB.map(todo => ({ ...todo, checked: false }));
        return HttpResponse.json();
      }
    ),
  ],

  error: [
    http.get(
      TODOS_URL,
      (/*{ request, params, cookies }*/) => {
        return new HttpResponse(null, { status: 500 });
      }
    ),
  ],
};
