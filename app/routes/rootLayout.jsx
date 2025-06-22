// src/routes/rootLayout.tsx
// import React from "react";
import { Outlet } from "react-router";
// use the correct path
import { useDispatch, useSelector } from "react-redux";
import {
  close,
  CART_VIEW,
} from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import { ToastProvider } from "utils/ToastProvider";
import Nav from "app/src/components/navigationBar/Nav";
import BottomSheet from "app/src/reusableComponent/bottomSheet/BottomSheet";
import SvgStringRenderer from "app/src/reusableComponent/SvgReusableRenderer";
import CartView from "app/src/components/CartView/CartView";
import { closeSvg } from "app/src/assets/svgAssets";
import ClientOnlyRender from "utils/ClientOnlyRender";

export default function RootLayout() {
  const dispatch = useDispatch();
  const showView = useSelector(
    (state) => state.bottomSheetControllerReducer.showView
  );

  const handleClose = () => {
    dispatch(close());
  };

  return (
    // <ToastProvider>
    <>
      <Nav />
      <div style={{ marginTop: "8vh" }}>
        <Outlet />
      </div>
      <ClientOnlyRender>
        <BottomSheet onClose={handleClose}>
          <div
            style={{
              height: "60vh",
            }}
          >
            {/* <div
              onClick={handleClose}
              style={{
                position: "absolute",
                right: "30px",
                top: "1px",
              }}
            >
              <SvgStringRenderer
                svgString={closeSvg}
                height={"30px"}
                width={"30px"}
              />
            </div> */}
            {showView === CART_VIEW && <CartView />}
          </div>
        </BottomSheet>
      </ClientOnlyRender>
    </>
    // </ToastProvider>
  );
}
