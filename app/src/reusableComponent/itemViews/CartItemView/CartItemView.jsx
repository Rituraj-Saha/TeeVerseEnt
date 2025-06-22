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

// ✅ Extracted Dialog Component Outside
const AddressAdderDialog = React.memo(({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    line: "",
    pin: "",
    landmark: "",
    receiverPhone: "",
    default: false,
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
            name="line"
            label="Address Line"
            value={form.line}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            name="pin"
            label="PIN Code"
            value={form.pin}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            name="landmark"
            label="Landmark"
            value={form.landmark}
            onChange={handleFormChange}
          />
          <TextField
            fullWidth
            margin="dense"
            name="receiverPhone"
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
                name="default"
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
    useSizeAvailability(productDetails.id);

  const [addressList, setAddressList] = useState([...StaticAddress]);
  const [selectedAddress, setSelectedAddress] = useState(
    StaticAddress[0] || {}
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

  const handleAddAddress = (newAddress) => {
    const updated = [...addressList, newAddress];
    setAddressList(updated);
    setSelectedAddress(newAddress);
  };

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
          gap: "10px",
          display: "flex",
        }}
      >
        <span className={styles.productName}>{productDetails.name}</span>

        <div style={{ display: "flex", alignItems: "baseline" }}>
          {/* <div style={{ display: "flex", flex: ".7" }}> */}
          <span className={styles.label}>Size: </span>
          <span className={styles.label_val}>
            {productDetails.selectedSize}
          </span>
          {/* <SizeSelector
              availableSize={sizeAvailability}
              selectedSize={productDetails.selectedSize}
              setSelectedSize={setSelectedSize}
            /> */}
          {/* </div>
          <div> */}
          <span className={styles.label}>Quantity: </span>
          <span className={styles.label_val}>{productDetails.quantity}</span>
          {/* </div> */}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div style={{ flex: "1" }}>
            <PriceContainer
              id={productDetails.id}
              name={productDetails.name}
              gender={productDetails.gender}
              ageGroup={productDetails.ageGroup}
              price={productDetails?.price}
              discount={productDetails.discount}
              maxStock={getMaxStock(selectedSize)}
              selectedSize={productDetails.selectedSize}
              sellingPrice={
                productDetails.price -
                (productDetails.price * productDetails.discount) / 100
              }
              thubnailImage={productDetails.thubnailImage}
            />
          </div>

          <TextField
            margin="dense"
            name="recieverPhone"
            label="Receiver's Phone Number"
            value={selectedAddress.receiverPhone}
            // onChange={handleFormChange}
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
                {item.line}
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
