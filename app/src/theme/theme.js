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
  const root = document.documentElement;

  // Loop over each key in theme.palette
  Object.keys(theme.palette).forEach((item) => {
    // Dynamically access the `main` color for each palette item
    const colorValue = theme.palette[item]?.main;
    if (colorValue) {
      // Set the CSS variable for the color
      root.style.setProperty(`--color-${item}-main`, colorValue);
    }
  });
};

export default theme;
