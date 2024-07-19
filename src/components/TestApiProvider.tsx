import { ReactNode } from "react";

import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const TestApiProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  return (<>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </>
  );
};
