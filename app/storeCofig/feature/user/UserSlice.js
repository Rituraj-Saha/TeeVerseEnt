import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Rituraj Saha",
    _bearer: "abc",
    phone: "+919674345373",
  },
  address: [
    {
      id: 1,
      line: "68, Railway park, sodepur",
      pin: "700110",
      landmaerk: "near pond",
      receiverPhone: "+91 8910901854",
      default: true,
    },
    {
      id: 2,
      line: "sulekha prakriti",
      pin: "700115",
      landmaerk: "near pond",
      receiverPhone: "+91 9674345373",
      default: false,
    },
    {
      id: 3,
      line: "Purti veda",
      pin: "700108",
      landmaerk: "near pond",
      receiverPhone: "+91 8910901854",
      default: false,
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      // accepts partial user fields to update
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    addAddress(state, action) {
      const newAddress = action.payload;
      // Auto-generate id if not provided
      newAddress.id = newAddress.id ?? Date.now();
      state.address.push(newAddress);
    },
    updateDefaultAddress(state, action) {
      const idToSetDefault = action.payload;
      state.address = state.address.map((addr) => ({
        ...addr,
        default: addr.id === idToSetDefault,
      }));
    },
    updateAddress(state, action) {
      const updatedAddress = action.payload; // should contain id
      state.address = state.address.map((addr) =>
        addr.id === updatedAddress.id ? { ...addr, ...updatedAddress } : addr
      );
    },
    removeAddress(state, action) {
      const idToRemove = action.payload;
      state.address = state.address.filter((addr) => addr.id !== idToRemove);
    },
  },
});

export const {
  updateUser,
  addAddress,
  updateDefaultAddress,
  updateAddress,
  removeAddress,
  getDefaultAddress,
} = userSlice.actions;

export default userSlice.reducer;
