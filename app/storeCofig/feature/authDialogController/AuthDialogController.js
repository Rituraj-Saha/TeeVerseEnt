import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showAuthDialog: false,
};

export const AuthDialogControllerSlice = createSlice({
  name: "authDialogController",
  initialState,
  reducers: {
    authDialogOpen: (state) => {
      state.showAuthDialog = true;
    },
    authDialogClose: (state) => {
      state.showAuthDialog = false;
    },
  },
});
export const { authDialogOpen, authDialogClose } =
  AuthDialogControllerSlice.actions;

export default AuthDialogControllerSlice.reducer;
