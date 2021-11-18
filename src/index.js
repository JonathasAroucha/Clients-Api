import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./state/auth";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { yellow } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import App from "./App";
import "./index.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[900],
    },
    secondary: {
      main: red[900],
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
