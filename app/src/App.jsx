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
import { store } from "app/storeCofig/store";
import { Provider, useDispatch } from "react-redux";
import BottomSheet from "./reusableComponent/bottomSheet/BottomSheet";
import { closeSvg } from "./assets/svgAssets";
import SvgStringRenderer from "./reusableComponent/SvgReusableRenderer";
import { close } from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
function App() {
  useEffect(() => {
    injectCssVariables(theme); // Inject only after mount
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* <Nav />
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
          
        </div>
        <BottomSheet onClose={onclose}>
          <div>
            <div onClick={onclose}>
              <SvgStringRenderer
                svgString={closeSvg}
                height={"30px"}
                width={"30px"}
              />
            </div>

            <h2>Bottom Sheet Content</h2>
            <p>This is where you render your custom children content.</p>
          </div>
        </BottomSheet> */}
        <MainAppContent />
      </ThemeProvider>
    </Provider>
  );
}
const MainAppContent = () => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(close());
  };
  return (
    <>
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
      <BottomSheet onClose={handleClose}>
        <div>
          <div onClick={handleClose}>
            <SvgStringRenderer
              svgString={closeSvg}
              height={"30px"}
              width={"30px"}
            />
          </div>

          <h2>Bottom Sheet Content</h2>
          <p>This is where you render your custom children content.</p>
        </div>
      </BottomSheet>
    </>
  );
};
export default App;
{
  /* <ClientOnlyRender>
          <LandingHome />
        </ClientOnlyRender> */
}
