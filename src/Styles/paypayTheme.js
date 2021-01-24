import { createMuiTheme } from "@material-ui/core/styles";

export const paypayTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#002653",
    },
    secondary: {
      main: "#3949ab",
    },
    text: {
      primary: "#000",
    },
    background: {
      default: "#f2f3f3",
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif", "Titillium Web"].join(","),
  },
});
