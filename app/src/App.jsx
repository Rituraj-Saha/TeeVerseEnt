import React, { useEffect } from "react";
import "./App.css";
import Nav from "./components/navigationBar/Nav";
import LandingHome from "./components/home/LandingHome";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, Divider, ThemeProvider } from "@mui/material";
import theme, { injectCssVariables } from "./theme/theme";

function App() {
  useEffect(() => {
    injectCssVariables(theme); // Inject only after mount
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Nav />
      <div
        style={{
          marginTop: "8vh",
        }}
      >
        <Divider
          component="div"
          variant="middle"
          sx={{ border: "0.2 solid", borderColor: "#FFF" }}
          orientation="horizontal"
        />

        <LandingHome />
        {/* <ClientOnlyRender>
          <LandingHome />
        </ClientOnlyRender> */}
      </div>
    </ThemeProvider>
  );
}

export default App;
