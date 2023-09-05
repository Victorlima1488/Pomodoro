import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./Styles/themes/default";
import { GlobalStyle } from "./Styles/global";
import { Router } from "./Router";
import {BrowserRouter} from "react-router-dom";
import { CycleContextProvider } from "./contexts/CycleContext";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
    
  )
}
