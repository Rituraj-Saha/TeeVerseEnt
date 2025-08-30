import { configureStore } from "@reduxjs/toolkit";
import bottomSheetControllerReducer from "./feature/bottomSheetController/BottomsheetControllerSlice";
import authDialogControllerReducer from "./feature/authDialogController/AuthDialogController";
import cartReducer from "./feature/cartStore/CartSlice";
import userReducer from "./feature/user/UserSlice";
import orderReducer from "./feature/orderStore/orderSlice";
import { productsApi } from "./apiServices/productsApi";
import { authApi } from "./apiServices/authApi";
export const store = configureStore({
  reducer: {
    bottomSheetControllerReducer: bottomSheetControllerReducer,
    authDialogControllerReducer: authDialogControllerReducer,
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([productsApi.middleware, authApi.middleware]),
});
