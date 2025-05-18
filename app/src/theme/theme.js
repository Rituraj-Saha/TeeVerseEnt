// theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Replace with your desired primary color
    },
    secondary: {
      main: "#dc004e", // Replace with your desired secondary color
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    // You can add custom colors too
    disable: {
      main: "#b1afae",
    },
    customGreen: {
      main: "#00C853",
      contrastText: "#fff",
    },
    custom: {
      light: "#f0f0f0",
      main: "#9c27b0",
      dark: "#6a0080",
      contrastText: "#fff",
      lightSecondary: "#f15e8a",
    },
    lightBackdropForDeliver: {
      main: "#ffecfb",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", "sans-serif"',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
        },
      },
    },
  },
});
export const injectCssVariables = (theme) => {
  if (typeof document === "undefined") return; // Skip during SSR

  const root = document.documentElement;

  Object.keys(theme.palette).forEach((item) => {
    const palette = theme.palette[item];
    if (palette?.main) {
      root.style.setProperty(`--color-${item}-main`, palette.main);
    }
  });
};

export default theme;
