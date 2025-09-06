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
import styles from "./rootLayout.module.css";
import {
  useGetMeMutation,
  useRefreshTokenMutation,
} from "app/storeCofig/apiServices/authApi";
import {
  updateBearer,
  updateUser,
} from "app/storeCofig/feature/user/UserSlice";
import { useEffect } from "react";
import { useGetCartQuery } from "app/storeCofig/apiServices/cartApi";
export default function RootLayout() {
  const dispatch = useDispatch();
  const showView = useSelector(
    (state) => state.bottomSheetControllerReducer.showView
  );

  const handleClose = () => {
    dispatch(close());
  };
  const [refreshToken] = useRefreshTokenMutation();
  const [getMe] = useGetMeMutation();
  const { getCart } = useGetCartQuery();
  useEffect(() => {
    const initAuth = async () => {
      try {
        const response = await refreshToken().unwrap();
        dispatch(updateBearer(response.access_token));

        // Now fetch user
        const userRes = await getMe().unwrap();
        dispatch(updateUser(userRes));
        getCart();
      } catch (err) {
        console.warn("User not logged in", err);
      }
    };

    initAuth();
  }, []);
  return (
    // <ToastProvider>
    <>
      <Nav />
      <div className={styles.parent}>
        <Outlet />
      </div>
      <ClientOnlyRender>
        <BottomSheet onClose={handleClose}>
          <div
            style={{
              height: "100%",
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
            <CartView />
          </div>
        </BottomSheet>
      </ClientOnlyRender>
    </>
    // </ToastProvider>
  );
}
