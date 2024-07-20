import { Alert } from "@mui/material";

interface MutationError {
  error: Error | null;
  reset?: () => void
}

export interface ApiErrorAlertProps {
  mutations: MutationError[]
}

export const ApiErrorAlert = ({ mutations }: ApiErrorAlertProps) => {

  return mutations
    .filter(mutation => mutation.error)
    .map((mutation) => (
      <Alert sx={{ m: -1, mb: 1, borderRadius: 0 }} variant="filled" severity="error" onClose={() => mutation.reset?.()}>
        {mutation.error?.message}
      </Alert>
    ));
}
