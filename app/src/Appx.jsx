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
import { Provider, useDispatch, useSelector } from "react-redux";
import BottomSheet from "./reusableComponent/bottomSheet/BottomSheet";
import { closeSvg } from "./assets/svgAssets";
import SvgStringRenderer from "./reusableComponent/SvgReusableRenderer";

import {
  CART_VIEW,
  close,
} from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";

import CartView from "./components/CartView/CartView";

function Appx() {
  useEffect(() => {
    injectCssVariables(theme); // Inject only after mount
  }, []);

  return <MainAppContent />;
}
const MainAppContent = () => {
  const dispatch = useDispatch();
  const showView = useSelector(
    (state) => state.bottomSheetControllerReducer.showView
  );

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
        <div className="cartContainer">
          <div onClick={handleClose} className="cartCloseButton">
            <SvgStringRenderer
              svgString={closeSvg}
              height={"30px"}
              width={"30px"}
            />
          </div>
          {showView === CART_VIEW ? <CartView /> : <></>}
        </div>
      </BottomSheet>
    </>
  );
};
export default Appx;
{
  /* <ClientOnlyRender>
          <LandingHome />
        </ClientOnlyRender> */
}
