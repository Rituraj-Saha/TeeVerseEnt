import React, { useState } from "react";
import { PriceContainer } from "../thumbnailItemView/ThumbnailItemView";
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
    <div
      style={{
        display: "flex",
        border: "1px solid black",
        paddingBottom: "10px",
      }}
    >
      <div style={{ flex: "0.2", border: "1px solid black" }}>
        <img
          src={productDetails.thubnailImage}
          height={"100%"}
          width={"100%"}
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
        <span>{productDetails.name}</span>

        <div style={{ display: "flex" }}>
          <div>
            <span>Size: </span>
            <span>{productDetails.selectedSize}</span>
          </div>
          <div>
            <span>Quantity: </span>
            <span>{productDetails.quantity}</span>
          </div>
        </div>

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
