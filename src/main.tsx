import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { mockedTodosApi } from "./api/todos/mocks/mockedTodosApi.ts";
import { setupWorker } from "msw/browser";


const queryClient = new QueryClient();
export const worker = setupWorker(...mockedTodosApi.success);
worker.start({
  // This is going to perform unhandled requests
  // but print no warning whatsoever when they happen.
  onUnhandledRequest: 'bypass'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline/>
    <QueryClientProvider client={queryClient}>
      <App/>
    </QueryClientProvider>
  </React.StrictMode>,
)
