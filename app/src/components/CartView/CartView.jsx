import React from "react";
import CartItemView from "app/src/reusableComponent/itemViews/CartItemView/CartItemView";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartView.module.css";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import {
  CART_VIEW,
  close,
  ORDER_CHECKOUT_VIEW,
  setView,
} from "app/storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import { createOrderFromCart } from "app/storeCofig/feature/orderStore/orderSlice";
import { PriceContainer } from "app/src/reusableComponent/itemViews/thumbnailItemView/ThumbnailItemView";

const SAMPLE_ORDER_PAYLOAD = {
  billInfo: {
    totalmem: "1",
    totalAmount: 899,
    address: "sample address",
  },
  productsInfo: [
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "test",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
    {
      productId: "alkjklasjkldj",
      productName: "testLast",
      productPrice: 999,
      productDiscount: 10,
      price: 890,
      qty: 1,
      size: "M",
    },
  ],
};

const OrderView = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        height: "85%",
        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span>Name: Rituraj</span>
        <span>Address: 68, Railway park sodepur</span>
        <span>phone: +91967445373</span>
      </div>
      <div>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", maxHeight: "55%", overflowY: "auto" }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontStyle: "bold", fontWeight: 800 }}>
                  Id
                </TableCell>
                <TableCell
                  sx={{ fontStyle: "bold", fontWeight: 800 }}
                  align="right"
                >
                  Product
                </TableCell>
                <TableCell
                  sx={{ fontStyle: "bold", fontWeight: 800 }}
                  align="right"
                >
                  MRP
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontStyle: "bold", fontWeight: 800 }}
                >
                  Discount
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontStyle: "bold", fontWeight: 800 }}
                >
                  Price
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ fontStyle: "bold", fontWeight: 800 }}
                >
                  Qty
                </TableCell>
                <TableCell
                  sx={{ fontStyle: "bold", fontWeight: 800 }}
                  align="right"
                >
                  Size
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {SAMPLE_ORDER_PAYLOAD.productsInfo.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {item.productId}
                  </TableCell>
                  <TableCell align="right" component="th" scope="row">
                    {item.productName}
                  </TableCell>
                  <TableCell align="right">{item.productPrice}</TableCell>
                  <TableCell align="right">{item.productDiscount}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="right">{item.qty}</TableCell>
                  <TableCell align="right">{item.size}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
function CartView() {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(close());
  };
  const theme = useTheme();
  const cartItems = useSelector((state) => state.cart.cartItems);
  // React.useEffect(() => {
  //   dispatch(createOrderFromCart(cartItems));
  // }, [cartItems]);
  const orders = useSelector((state) => state.orders.orders);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalItems = useSelector((state) => state.cart.totalItems);
  const showView = useSelector(
    (state) => state.bottomSheetControllerReducer.showView
  );
  return (
    <div className={styles.cartParent}>
      {showView === CART_VIEW ? (
        <div
          style={{
            display: "flex",
            flex: 0.8,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 0.7,
              flexDirection: "column",
              gap: "5px",
            }}
          >
            {cartItems.map((item, idx) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                  }}
                >
                  <CartItemView key={idx} productDetails={item} />
                </div>
              );
            })}
            <div style={{ height: "100px" }}></div>
          </div>
          <div></div>
        </div>
      ) : showView === ORDER_CHECKOUT_VIEW ? (
        <OrderView />
      ) : (
        <></>
      )}
      <div
        style={{
          position: "fixed",
          display: "flex",
          width: "100%",
          // border: "1px solid black",
          gap: "5px",
          bottom: "0px",
          flex: 0.1,
          flexDirection: "column",
          background: "white",
          paddingRight: "25px",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            // border: "1px solid black",
            gap: "5px",
          }}
        >
          <span>
            <span className={styles.field_name_text}>Total Items: </span>
            {totalItems}
          </span>
          <span>
            {" "}
            <span className={styles.field_name_text}>Total Amount: </span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "50px",
            padding: "10px",
          }}
        >
          <Button
            variant="contained"
            sx={{
              flex: 0.5,
              background: theme.palette.secondary.main,
              // margin: "20px",
            }}
            onClick={handleClose}
          >
            close cart
          </Button>
          <Button
            variant="contained"
            sx={{
              flex: 0.5,
              // margin: "20px",
              background: theme.palette.success.main,
            }}
            onClick={() => {
              dispatch(setView(ORDER_CHECKOUT_VIEW));
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

{
  /* <div className={styles.checkoutSummeryContainer}>
        <div className={styles.checkoutSummeryContent}>
          
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
      </div> */
}
