import React, { useState } from "react";
import {
  PriceContainer,
  SizeSelector,
} from "../thumbnailItemView/ThumbnailItemView";
import { useSizeAvailability } from "../../../../../utils/useSizeAvailabilty";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Address as StaticAddress } from "app/src/assets/payload/Address";
import styles from "./cartItemView.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  updateAddress,
} from "app/storeCofig/feature/user/UserSlice";
import { modifyAdrress } from "app/storeCofig/feature/cartStore/CartSlice";
import SvgStringRenderer from "../../SvgReusableRenderer";
import { pencil } from "app/src/assets/svgAssets";

// ✅ Extracted Dialog Component Outside
const AddressAdderDialog = React.memo(({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: Date.now(),
    line: "",
    pin: "",
    landmark: "",
    receiverPhone: "",
    default: false,
  });

  const handleFormChange = (e) => {
    const { productName, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [productName]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.line || !form.pin || !form.receiverPhone) {
      alert("Please fill required fields");
      return;
    }
    onSave(form);
    setForm({
      line: "",
      pin: "",
      landmark: "",
      receiverPhone: "",
      default: false,
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            productName="line"
            label="Address Line"
            value={form.line}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            productName="pin"
            label="PIN Code"
            value={form.pin}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            productName="landmark"
            label="Landmark"
            value={form.landmark}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="dense"
            productName="receiverPhone"
            label="Receiver Phone"
            value={form.receiverPhone}
            onChange={handleFormChange}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.default}
                onChange={handleFormChange}
                productName="default"
              />
            }
            label="Set as default"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
});

// ✅ Main CartItemView component
const CartItemView = ({ productDetails }) => {
  const { sizeAvailability, selectedSize, setSelectedSize, getMaxStock } =
    useSizeAvailability(productDetails.availableSize);

  const addressList = useSelector((state) => state.user.address);
  const dispatch = useDispatch();

  const [selectedAddress, setSelectedAddress] = useState(
    productDetails.address || {}
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value === "add_new") {
      setDialogOpen(true);
    } else {
      setSelectedAddress(value);
    }
  };
  React.useEffect(() => {
    dispatch(
      modifyAdrress({ id: productDetails.cid, address: selectedAddress })
    );
  }, [selectedAddress]);

  const handleAddAddress = (newAddress) => {
    dispatch(addAddress(newAddress));
    setSelectedAddress(newAddress);
  };
  const handlePhoneChange = (address) => {
    setSelectedAddress(address);
    dispatch(updateAddress(address));
  };
  const preparedProductDetails = React.useMemo(
    () => ({
      ...productDetails,
      maxStock: getMaxStock(selectedSize),
      sellingPrice:
        productDetails.price -
        (productDetails.price * productDetails.discount) / 100,
    }),
    [productDetails, selectedSize]
  );
  return (
    <div className={styles.cartItemParent}>
      <div style={{ flex: "0.2" }}>
        <img
          src={productDetails.thubnailImage}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "5px",
            boxShadow: "0px 2px 2px 2px rgba(161, 246, 112 , 0.632)",
          }}
        />
      </div>
      <div
        style={{
          flex: "0.8",
          flexDirection: "column",
          paddingLeft: "5px",
          display: "flex",
        }}
      >
        <span className={styles.productName}>{productDetails.productName}</span>
        <span className={styles.productName}>{productDetails.description}</span>
        <div style={{ display: "flex", alignItems: "baseline" }}>
          {/* <div style={{ display: "flex", flex: ".7" }}> */}
          <span className={styles.label}>Size: </span>
          <span className={styles.label_val}>
            {productDetails.selectedSize}
          </span>
          <span className={styles.label}>Quantity: </span>
          <span className={styles.label_val}>{productDetails.quantity}</span>
          {/* </div> */}
        </div>
        <div className={styles.priceandnumberContainer}>
          <div className={styles.priceContainer}>
            <PriceContainer
              {...preparedProductDetails}
              showCart={true}
              showPrice={true}
            />
          </div>

          <TextField
            margin="dense"
            productName="recieverPhone"
            label="Receiver's Phone Number"
            value={selectedAddress.receiverPhone}
            onChange={(event) => {
              handlePhoneChange({
                ...selectedAddress,
                receiverPhone: event.target.value,
              });
            }}
            disabled={true}
          ></TextField>
        </div>

        <FormControl fullWidth sx={{ minWidth: 200 }}>
          <InputLabel id="address-label" sx={{ color: "black" }}>
            Address
          </InputLabel>
          <Select
            labelId="address-label"
            id="address-select"
            value={selectedAddress}
            onChange={handleSelectChange}
            label="Address"
            sx={{ color: "black", background: "white" }}
            renderValue={(value) => value?.line || "Select Address"}
          >
            {addressList.map((item, index) => (
              <MenuItem value={item} key={index}>
                <div style={{ display: "flex", flex: 1, width: "100%" }}>
                  <div style={{ display: "flex", flex: 1, width: "99%" }}>
                    {item.line}
                  </div>
                  <div
                    style={{
                      display: "flex",

                      border: "1px solid black",
                      justifyContent: "end",
                    }}
                  >
                    <SvgStringRenderer
                      svgString={pencil}
                      height={"20px"}
                      width={"20px"}
                    />
                  </div>
                </div>
              </MenuItem>
            ))}
            <MenuItem
              value="add_new"
              sx={{ fontWeight: "bold", color: "green" }}
            >
              + Add New Address
            </MenuItem>
          </Select>
        </FormControl>

        <AddressAdderDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onSave={handleAddAddress}
        />
      </div>
    </div>
  );
};

export default CartItemView;
