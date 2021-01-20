import React, { useState } from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";

import { paypayTheme } from "./paypayTheme";

console.log(paypayTheme);

export const ThemeFunctionsContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [theme] = useState(paypayTheme);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
