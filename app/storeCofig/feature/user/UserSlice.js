import { createSlice } from "@reduxjs/toolkit";
// const hasRefreshToken = () => {
//   if (typeof document === "undefined") return false; // SSR guard
//   return document.cookie
//     .split(";")
//     .some((c) => c.trim().startsWith("refresh_token="));
// };
// user: {
//   id: "1",
//   name: "Rituraj Saha",
//   phone: "+919674345373",
// },
// address: [
//   {
//     id: 1,
//     line: "68, Railway park, sodepur",
//     pin: "700110",
//     landmaerk: "near pond",
//     receiverPhone: "+91 8910901854",
//     default: true,
//   },
//   {
//     id: 2,
//     line: "sulekha prakriti",
//     pin: "700115",
//     landmaerk: "near pond",
//     receiverPhone: "+91 9674345373",
//     default: false,
//   },
//   {
//     id: 3,
//     line: "Purti veda",
//     pin: "700108",
//     landmaerk: "near pond",
//     receiverPhone: "+91 8910901854",
//     default: false,
//   },
// ],
const initialState = {
  _bearer: "",
  isLoggedIn: false,
  user: null,
  address: [],
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
      state.user.address = state.user.address.map((addr) =>
        addr.id === updatedAddress.id ? { ...addr, ...updatedAddress } : addr
      );
    },
    syncAddress(state, action) {
      const allAddress = action.payload;
      state.user.address = allAddress;
    },
    removeAddress(state, action) {
      const idToRemove = action.payload;
      state.address = state.address.filter((addr) => addr.id !== idToRemove);
    },
    updateBearer(state, action) {
      const mBearer = action.payload;
      state._bearer = mBearer;
      state.isLoggedIn = true;
    },
    logout(state) {
      state._bearer = "";
      state.user = null;
      state.isLoggedIn = false;
      state.address = [];
    },
  },
});

export const {
  updateUser,
  addAddress,
  updateDefaultAddress,
  updateAddress,
  removeAddress,
  updateBearer,
  syncAddress,
  logout,
} = userSlice.actions;

export default userSlice.reducer;
