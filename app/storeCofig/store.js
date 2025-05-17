import { configureStore } from "@reduxjs/toolkit";
import bottomSheetControllerReducer from "../storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import cartReducer from "../storeCofig/feature/cartStore/CartSlice";
export const store = configureStore({
  reducer: {
    bottomSheetControllerReducer: bottomSheetControllerReducer,
    cart: cartReducer,
  },
});
