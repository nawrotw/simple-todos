import { CssBaseline } from "@mui/material";
import { ReactElement } from "react";

import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const themeWrapper = <T, >(ComponentFn: (props: T) => ReactElement) => (props: T) => {

  return (<>
      <CssBaseline/>
      {ComponentFn(props)}
    </>
  );
};
