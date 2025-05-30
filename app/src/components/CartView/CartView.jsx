import React from "react";
import CartItemView from "app/src/reusableComponent/itemViews/CartItemView/CartItemView";
import { useSelector } from "react-redux";
import styles from "./CartView.module.css";
import { Button } from "@mui/material";
function CartView() {
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid red",
        width: "100%",
        gap: "15px",
        flexWrap: "wrap",
        alignContent: "baseline",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 0.7,
          border: "1px solid black",
          flexDirection: "column",
          gap: "5px",
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
          border: "1px solid red",
        }}
      >
        <span>
          Total Amount:{" "}
          <span>{useSelector((state) => state.cart.totalAmount)}</span>
        </span>
        <Button variant="contained">Place Order</Button>
      </div>
    </div>
  );
}

export default CartView;
