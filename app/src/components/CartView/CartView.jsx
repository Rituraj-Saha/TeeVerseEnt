import React from "react";
import CartItemView from "app/src/reusableComponent/itemViews/CartItemView/CartItemView";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartView.module.css";
import { Button, useTheme } from "@mui/material";
import { close } from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import { createOrderFromCart } from "app/storeCofig/feature/orderStore/orderSlice";
import { PriceContainer } from "app/src/reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";
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
            padding: "5px",
          }}
        >
          {/* <span>
            Total Amount:{" "}
            <span>{useSelector((state) => state.cart.totalAmount)}</span>
          </span> */}
          {orders.map((order, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 4px 30px rgba(166, 128, 243, 0.63)",
                backdropFilter: "blur(5px)",
                borderRadius: "5px",
                fontFamily: "Poppins",
                padding: "5px",
                fontSize: "14px",
              }}
            >
              {/* <h3>Order ID: {order.orderId}</h3> */}
              <div>
                <span className={styles.field_name_text}>Address: </span>
                <span>
                  {order.address.line}, {order.address.pin}
                </span>
              </div>
              <span>
                <span className={styles.field_name_text}>
                  Receiver phone number:{" "}
                </span>
                <span>{order.address.receiverPhone}</span>
              </span>
              <span>
                <span className={styles.field_name_text}>Total Items: </span>
                {order.totalItems}
              </span>
              <span>
                {" "}
                <span className={styles.field_name_text}>Total Amount: </span>
                <span>₹{order.totalAmount}</span>
              </span>
              <div>
                {order.items.map((item) => (
                  <div key={item.cid} style={{ display: "flex", flex: 1 }}>
                    {/* {item.productName} (Qty: {item.quantity}) - ₹{item.sellingPrice} */}
                    <div style={{ display: "flex", flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          flex: 0.5,
                          justifyContent: "space-around",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",

                            paddingTop: "5px",
                          }}
                        >
                          {item.productName}
                        </div>
                        <div
                          style={{
                            display: "flex",

                            paddingTop: "5px",
                          }}
                        >
                          Qty: {item.quantity}
                        </div>
                        <div
                          style={{
                            display: "flex",

                            paddingTop: "5px",
                          }}
                        >
                          Size: {item.selectedSize}
                        </div>
                      </div>
                      <div style={{ display: "flex", flex: 0.5 }}>
                        <PriceContainer
                          id={item.id}
                          productName={item.productName}
                          gender={item.gender}
                          ageGroup={item.ageGroup}
                          price={item?.price}
                          discount={item.discount}
                          // maxStock={getMaxStock(selectedSize)}
                          // selectedSize={item.selectedSize}
                          sellingPrice={
                            item.price - (item.price * item.discount) / 100
                          }
                          thubnailImage={item.thubnailImage}
                          showCart={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
