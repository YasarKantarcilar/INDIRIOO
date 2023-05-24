import React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import "./index.css";
const theme = createTheme({
  palette: {
    primary: {
      main: "#FD841F",
    },
    secondary: {
      main: "#E14D2A",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </HashRouter>
);
reportWebVitals();
