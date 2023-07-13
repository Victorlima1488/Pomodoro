import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./Styles/themes/default";
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import {BrowserRouter} from "react-router-dom";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
    
  )
}
