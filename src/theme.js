import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", 
    },
    secondary: {
      main: "#ff4081", 
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h3: {
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
