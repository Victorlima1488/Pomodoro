import { ThemeProvider } from "styled-components";
import theme from "./Styles/themes/index";
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import {BrowserRouter} from "react-router-dom";
import { CycleContextProvider } from "./contexts/CycleContext";

export function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
    
  )
}
