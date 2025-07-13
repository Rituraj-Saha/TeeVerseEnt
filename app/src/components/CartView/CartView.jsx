import React from "react";
import CartItemView from "app/src/reusableComponent/itemViews/CartItemView/CartItemView";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartView.module.css";
import { Button, useTheme } from "@mui/material";
import { close } from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import { createOrderFromCart } from "app/storeCofig/feature/orderStore/orderSlice";
function CartView() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(close());
  };
  const theme = useTheme();
  const cartItems = useSelector((state) => state.cart.cartItems);
  React.useEffect(() => {
    dispatch(createOrderFromCart(cartItems));
  }, [cartItems]);
  const orders = useSelector((state) => state.orders.orders);
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
        {cartItems.map((item, idx) => {
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
          {/* <span>
            Total Amount:{" "}
            <span>{useSelector((state) => state.cart.totalAmount)}</span>
          </span> */}
          {orders.map((order, idx) => (
            <div key={idx}>
              {/* <h3>Order ID: {order.orderId}</h3> */}
              <p>
                Address: {order.address.line}, {order.address.pin}
              </p>
              <p>Total Items: {order.totalItems}</p>
              <p>Total Amount: ₹{order.totalAmount}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.cid}>
                    {item.name} (Qty: {item.quantity}) - ₹{item.sellingPrice}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
