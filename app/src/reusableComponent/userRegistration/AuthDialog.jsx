import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Tabs,
  Tab,
  Box,
  Divider,
  Alert,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import {
  useGetMeMutation,
  useLoginMutation,
  useRegisterUserMutation,
  useVerifyOtpMutation,
} from "app/storeCofig/apiServices/authApi";
import _ from "lodash";
import { useDispatch } from "react-redux";
import {
  updateBearer,
  updateUser,
} from "app/storeCofig/feature/user/UserSlice";

export default function AuthDialog({ open, onClose, onSubmit }) {
  const [tab, setTab] = useState(0); // 0 -> Signup, 1 -> Signin
  const [step, setStep] = useState("form"); // form | otp
  const [otp, setOtp] = useState("");
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();
  const [
    loginUser,
    { isLoadingLogin, isSuccessLogin, isErrorLogin, errorLogin },
  ] = useLoginMutation();
  const [verifyOtp, { isLoadingOtp, errorOtp, data }] = useVerifyOtpMutation();
  const [getMe] = useGetMeMutation();

  const [formData, setFormData] = useState({
    phone_number: "",
    email: "",
    name: "",
    identifier: "",
    address: {
      addressline: "",
      pincode: "",
      landmark: "",
      city: "",
      state: "",
      nation: "",
    },
  });
  const [errors, setErrors] = useState({});
  const [showAlert, setShowAlert] = useState({
    show: false,
    msg: "",
  });
  const mode = tab === 0 ? "signup" : "signin";
  const dispatch = useDispatch();
  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setStep("form");
    setOtp("");
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (mode === "signup") {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!/^[0-9]{10}$/.test(formData.phone_number))
        newErrors.phone_number = "Phone must be 10 digits";
      if (!/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = "Enter a valid email";
    } else {
      if (!formData.identifier.trim())
        newErrors.identifier = "Email or phone is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    // Validate inputs
    if (!validate()) return;

    // Pick identifier (phone/email)
    if (mode == "signup") {
      const identifier =
        formData.phone_number || formData.email || formData.identifier;
      if (!identifier) {
        console.warn("No valid identifier provided");
        return;
      }
      const { identifier: _omit, ...payload } = {
        ...formData,
        phone_number: formData.phone_number
          ? `+91${formData.phone_number.replace(/^(\+91)?/, "")}` // ensures only one +91
          : "",
      };

      try {
        // Call backend register API
        await registerUser(payload).unwrap();
        console.log("OTP sent successfully for:", identifier);
        // Move to OTP step
        setStep("otp");
      } catch (err) {
        // console.error("Failed to register user:", err);
        setShowAlert({
          show: true,
          msg: err?.data?.detail || "Something went wrong",
        });
      }
    } else {
      const identifier =
        formData.phone_number || formData.email || formData.identifier;
      if (!identifier) {
        console.warn("No valid identifier provided");
        return;
      }
      // const { identifier: _omit, ...payload } = {
      //   ...formData,
      //   identifier: formData.phone_number
      //     ? `+91${formData.phone_number.replace(/^(\+91)?/, "")}` // ensures only one +91
      //     : "",
      // };
      try {
        // Call backend register API
        await loginUser(formData.identifier).unwrap();
        console.log("OTP sent successfully for:", identifier);
        // Move to OTP step
        setStep("otp");
      } catch (err) {
        // console.error("Failed to register user:", err);
        setShowAlert({
          show: true,
          msg: err?.data?.detail || "Something went wrong",
        });
      }
      setStep("otp");
    }
  };

  const handleOtpVerify = async () => {
    try {
      const response = await verifyOtp({
        identifier: _.isEmpty(formData.phone_number)
          ? `+91${formData.identifier}`
          : formData.phone_number`+91${formData.phone_number.replace(
              /^(\+91)?/,
              ""
            )}`,
        otp: otp,
      }).unwrap();

      console.log("OTP Verified Successfully:", response.data);
      dispatch(updateBearer(response.access_token));
      const userRes = await getMe().unwrap();
      dispatch(updateUser(userRes));
      // Reset & go back to form step
      setOtp("");
      setStep("form");
      onClose();

      // If you get tokens, you can save them here
      // localStorage.setItem("access_token", response.access_token);
    } catch (err) {
      console.error("OTP Verification Failed:", err);
    }
  };

  const renderForm = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      {mode === "signup" && (
        <>
          {/* Contact Info Section */}
          <Typography variant="subtitle1" fontWeight="bold">
            Contact Information
          </Typography>
          <Divider />
          <TextField
            label="👤Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="📞Phone Number"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            error={!!errors.phone_number}
            InputProps={{ startAdornment: <PhoneIcon color="action" /> }}
            helperText={errors.phone_number}
          />
          <TextField
            label="📧Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{ startAdornment: <EmailIcon color="action" /> }}
            error={!!errors.email}
            helperText={errors.email}
          />

          {/* Address Section */}
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight="bold">
              Address Information
            </Typography>
            <Divider />
          </Box>
          <TextField
            label="Address Line"
            name="addressline"
            value={formData.address.addressline}
            onChange={handleChange}
          />
          <TextField
            label="Pincode"
            name="pincode"
            value={formData.address.pincode}
            onChange={handleChange}
          />
          <TextField
            label="Landmark"
            name="landmark"
            value={formData.address.landmark}
            onChange={handleChange}
          />
          <TextField
            label="City"
            name="city"
            value={formData.address.city}
            onChange={handleChange}
          />
          <TextField
            label="State"
            name="state"
            value={formData.address.state}
            onChange={handleChange}
          />
          <TextField
            label="Nation"
            name="nation"
            value={formData.address.nation}
            onChange={handleChange}
          />
          {showAlert.show && <Alert severity="error">{showAlert.msg}</Alert>}
        </>
      )}

      {mode === "signin" && (
        <TextField
          label="Phone Number"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          error={!!errors.identifier}
          helperText={errors.identifier}
        />
      )}
    </Box>
  );

  const renderOtp = () => (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography>
        An OTP has been sent to{" "}
        {formData.phone_number || formData.email || formData.identifier}.
      </Typography>
      <TextField
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
    </Box>
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {step === "form" ? (
          <Tabs value={tab} onChange={handleTabChange} centered>
            <Tab icon={<PersonAddIcon />} label="Sign Up" />
            <Tab icon={<LoginIcon />} label="Sign In" />
          </Tabs>
        ) : (
          "OTP Verification"
        )}
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
