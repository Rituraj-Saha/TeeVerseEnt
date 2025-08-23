import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Typography,
} from "@mui/material";

export default function AuthDialog({
  open,
  onClose,
  onSubmit,
  mode = "signup",
}) {
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    phone_number: "",
    email: "",
    name: "",
    address: {
      addressline: "",
      pincode: "",
      landmark: "",
      city: "",
      state: "",
      nation: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = () => {
    // Here you’d call backend API to send OTP
    console.log("Send OTP for:", formData.phone_number || formData.email);
    setStep("otp");
  };

  const handleOtpVerify = () => {
    // Verify OTP with backend
    console.log("Verify OTP:", otp);

    // Send final signup/signin data to parent
    onSubmit({ ...formData, otp });

    // Reset
    setOtp("");
    setStep("form");
    onClose();
  };

  const renderForm = () => (
    <Grid container spacing={2}>
      {mode === "signup" && (
        <>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address Line"
              name="addressline"
              value={formData.address.addressline}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pincode"
              name="pincode"
              value={formData.address.pincode}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Landmark"
              name="landmark"
              value={formData.address.landmark}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="State"
              name="state"
              value={formData.address.state}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nation"
              name="nation"
              value={formData.address.nation}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}

      {mode === "signin" && (
        <>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email or Phone Number"
              name="identifier"
              value={formData.identifier || ""}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}
    </Grid>
  );

  const renderOtp = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          An OTP has been sent to {formData.phone_number || formData.email}.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </Grid>
    </Grid>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {mode === "signup" ? "Sign Up for Teesverse" : "Sign In to Teesverse"}
      </DialogTitle>
      <DialogContent>
        {step === "form" ? renderForm() : renderOtp()}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        {step === "form" ? (
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
          >
            Send OTP
          </Button>
        ) : (
          <Button onClick={handleOtpVerify} variant="contained" color="success">
            Verify OTP
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
