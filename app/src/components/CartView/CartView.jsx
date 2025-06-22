import React from "react";
import CartItemView from "app/src/reusableComponent/itemViews/CartItemView/CartItemView";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartView.module.css";
import { Button, useTheme } from "@mui/material";
import { close } from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
function CartView() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(close());
  };
  const theme = useTheme();
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        gap: "15px",
        flexWrap: "wrap",
        alignContent: "baseline",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 0.7,
          // border: "1px solid black",
          flexDirection: "column",
          gap: "5px",

          overflowY: "auto", // enables scrolling
          maxHeight: "100%", // restricts height to parent
          // flexGrow: 0, // prevents vertical growing
        }}
      >
        {useSelector((state) => state.cart.cartItems).map((item, idx) => {
          return <CartItemView key={idx} productDetails={item} />;
        })}
      </div>
      <div
        style={{
          display: "flex",
          flex: 0.3,
          width: "100%",
          height: "100%",
          flexDirection: "column",
          border: "1px solid black",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 0.9,
            width: "100%",
            height: "100%",
            flexDirection: "column",
            border: "1px solid black",
          }}
        >
          <span>
            Total Amount:{" "}
            <span>{useSelector((state) => state.cart.totalAmount)}</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            flex: 0.1,
            flexDirection: "row",
            border: "1px solid black",
            gap: "5px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              flex: 0.5,
              background: theme.palette.secondary.main,
              margin: "20px",
            }}
            onClick={handleClose}
          >
            close cart
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 0.5,
              margin: "20px",
              background: theme.palette.success.main,
            }}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CartView;
