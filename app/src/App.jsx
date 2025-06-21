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

import CartItemView from "./reusableComponent/itemViews/CartItemView/CartItemView";
import CartView from "./components/CartView/CartView";
// import { ToastProvider } from "utils/ToastProvider";

function App() {
  useEffect(() => {
    injectCssVariables(theme); // Inject only after mount
  }, []);

  return (
    // <Provider store={store}>
    //   <ThemeProvider theme={theme}>
    //     <CssBaseline />

    <MainAppContent />
    // </ThemeProvider>
    //</Provider>
  );
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
          {showView === CART_VIEW ? (
            // <div
            //   style={{
            //     display: "flex",
            //     border: "1px solid red",
            //     width: "100%",
            //     gap: "15px",
            //     flexWrap: "wrap",
            //     alignContent: "baseline",
            //   }}
            // >
            //   <div>
            //     {useSelector((state) => state.cart.cartItems).map(
            //       (item, idx) => {
            //         return <CartItemView key={idx} productDetails={item} />;
            //       }
            //     )}
            //   </div>
            // </div>
            <CartView />
          ) : (
            // <>
            //   {cartItems &&
            //     cartItems.map((item, idx) => {
            //       return <CartItemView product={item} key={idx} />;
            //     })}
            // </>
            <></>
          )}
        </div>
      </BottomSheet>
      {/* <ToastProvider /> */}
    </>
  );
};
export default App;
{
  /* <ClientOnlyRender>
          <LandingHome />
        </ClientOnlyRender> */
}
