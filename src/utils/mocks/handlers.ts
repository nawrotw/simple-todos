import { http, HttpResponse, } from 'msw';
import { BASE_URL } from "../fetchTodos.ts";
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

export const handlers = {
  success: [
    http.get(
      BASE_URL,
      (/*{ request, params, cookies }*/) => {
        return HttpResponse.json(todos);
      }
    ),
    http.post(
      `${BASE_URL}/:id/update-checked`, async ({ request/*, params*/ }) => {
        // Read the intercepted request body as JSON.
        const body = await request.json() as Todo;
        // console.log(body, params)
        return HttpResponse.json(body);
      }
    ),
    http.post(
      `${BASE_URL}/clear-completed`,
      () => HttpResponse.json()
    ),
  ],

  error: [
    http.get(
      BASE_URL,
      (/*{ request, params, cookies }*/) => {
        return new HttpResponse(null, { status: 500 });
      }
    ),
  ],
};
