import React from "react";
import CartItemView, {
  AddressAdderDialog,
} from "app/src/reusableComponent/itemViews/CartItemView/CartItemView";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartView.module.css";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
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
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PublicIcon from "@mui/icons-material/Public";
import PinIcon from "@mui/icons-material/Pin";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { updateUser } from "app/storeCofig/feature/user/UserSlice";
import {
  useAddAddressMutation,
  useDeleteAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
} from "app/storeCofig/apiServices/adressApi";
const EDIT = "EDIT";
const ADD_NEW = "ADD_NEW";
const AddressCard = ({ addresses }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedAddressId, setSelectedAddressId] = React.useState("");
  const [deleteAddress, { isLoading }] = useDeleteAddressMutation();
  const [addAddress, { isLoading: isLoadingAddAddress }] =
    useAddAddressMutation();
  const [updateAddress, { isLoading: isLoadingUpdateAddress }] =
    useUpdateAddressMutation();
  const [usedFor, setUsedFor] = React.useState(EDIT);
  // Pick default or first
  React.useEffect(() => {
    if (addresses && addresses.length > 0) {
      const defaultAddr = addresses.find((a) => a.default);
      setSelectedAddressId(defaultAddr ? defaultAddr.id : addresses[0].id);
    }
  }, [addresses]);

  const handleDialogClose = () => {
    setOpen(false);
    setUsedFor(EDIT);
  };

  const handleDialogSave = async (address) => {
    try {
      if (usedFor === EDIT) {
        // update logic here
        await updateAddress(address).unwrap();
      } else {
        // add new address
        await addAddress(address).unwrap();
      }
    } catch (e) {
      console.error("Failed to save address:", e);
      // optionally show a toast/snackbar
    } finally {
      setUsedFor(EDIT);
      setOpen(false);
    }
  };
  const handleChange = (e) => {
    if (e.target.value === "add_new") {
      setUsedFor(ADD_NEW);
      setOpen(true);
    } else {
      setSelectedAddressId(e.target.value);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteAddress({ id: id }).unwrap();
      // unwrap() lets you catch errors with try/catch
    } catch (err) {
      console.error("Failed to delete address:", err);
    }
  };
  const selectedAddress =
    addresses.find((a) => a.id === selectedAddressId) || null;

  return (
    <>
      <Box
        sx={{
          p: 2,
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fafafa",
          width: "100%",
        }}
      >
        <FormControl fullWidth size="small">
          <InputLabel>Choose Address</InputLabel>
          <Select
            value={selectedAddressId || ""}
            onChange={handleChange}
            label="Choose Address"
          >
            {addresses.map((addr) => (
              <MenuItem key={addr.id} value={addr.id}>
                {addr.addressline}, {addr.city} ({addr.pincode})
              </MenuItem>
            ))}
            <MenuItem value="add_new">
              <AddIcon fontSize="small" sx={{ mr: 1 }} /> Add New Address
            </MenuItem>
          </Select>
        </FormControl>

        {/* Show selected address details */}
        {selectedAddress && (
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 2 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <LocationOnIcon color="primary" />
              <Stack spacing={0.5}>
                <Typography variant="body2">
                  <strong>{selectedAddress.addressline}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {selectedAddress.city}, {selectedAddress.state}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Typography variant="caption">
                    <PinIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {selectedAddress.pincode}
                  </Typography>
                  <Typography variant="caption">
                    <PublicIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {selectedAddress.nation}
                  </Typography>
                  <Typography variant="caption">
                    <PublicIcon sx={{ fontSize: 14, mr: 0.5 }} />
                    {selectedAddress.receiverPhoneNumber}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {/* Edit button */}
            <Stack direction="row">
              <IconButton
                onClick={() => {
                  handleDelete(selectedAddress.id);
                }}
                size="small"
                color="primary"
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
              {/* Edit button */}
              <IconButton
                onClick={() => setOpen(true)}
                size="small"
                color="primary"
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>
        )}
      </Box>

      {/* Address Add/Edit Dialog */}
      <AddressAdderDialog
        open={open}
        onClose={handleDialogClose}
        onSave={handleDialogSave}
        formPrefill={usedFor == ADD_NEW ? null : selectedAddress}
      />
    </>
  );
};

const OrderView = () => {
  const cartItems = useSelector((state) => state.cart);
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching, isError } = useGetAddressQuery();
  console.log("CartItem: ", JSON.stringify(cartItems));
  const [orderPayload, setOrderPayload] = React.useState(
    transformCartToOrderPayload(cartItems, {})
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        height: "85%",
        alignItems: "center",
        padding: "15px",
        gap: "5px",
        // justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid red",
          width: "100%",
        }}
      >
        <span>
          {`Name: ${userDetails.user.name}`} <span>phone: +91967445373</span>
        </span>
        {!isLoading && (
          <AddressCard
            // address={{
            //   ...userDetails.user.address,
            //   recieverPhoneNumeber: userDetails.user.phone_number,
            // }}
            addresses={data?.addresses}
            onAddressSave={(newAddress) =>
              dispatch(updateUser({ ...userDetails.user, address: newAddress }))
            }
          />
        )}
      </div>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowY: "auto" }}
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
            {/* {SAMPLE_ORDER_PAYLOAD.productsInfo.map((item) => ( */}
            {console.log("Order payload:", orderPayload)}
            {orderPayload.productsInfo.map((item) => (
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

const transformCartToOrderPayload = (cartState, address) => {
  return {
    billInfo: {
      totalmem: String(cartState.totalItems),
      totalAmount: cartState.totalAmount,
      address: address || "sample address", // fallback
    },
    productsInfo: cartState.cartItems.map((item) => ({
      productId: item.product_id,
      productName: item.productName,
      productPrice: item.price,
      productDiscount: item.discount,
      price: item.sellingPrice, // already discounted
      qty: item.quantity,
      size: item.selectedSize,
    })),
  };
};
