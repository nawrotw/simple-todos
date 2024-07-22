import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { todosApiMock } from "./api/todos/mocks/todosApiMock.ts";
import { setupWorker } from "msw/browser";
import { SpeedInsights } from "@vercel/speed-insights/react"

const useLocalStorageDB = import.meta.env.VITE_USE_LOCAL_STORAGE_DB === 'true'

if(useLocalStorageDB) {
  console.log('useLocalStorageDB')
  const worker = setupWorker(...todosApiMock.success);
  worker.start({
    // This is going to perform unhandled requests
    // but print no warning whatsoever when they happen.
    onUnhandledRequest: 'bypass'
  });
}

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    // mode: 'dark',
  } ,
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline/>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </QueryClientProvider>
    <SpeedInsights/>
  </React.StrictMode>,
)
