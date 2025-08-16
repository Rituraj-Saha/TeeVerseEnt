import { configureStore } from "@reduxjs/toolkit";
import bottomSheetControllerReducer from "../storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
import cartReducer from "../storeCofig/feature/cartStore/CartSlice";
import userReducer from "../storeCofig/feature/user/UserSlice";
import orderReducer from "../storeCofig/feature/orderStore/orderSlice";
import { productsApi } from "./apiServices/productsApi";
export const store = configureStore({
  reducer: {
    bottomSheetControllerReducer: bottomSheetControllerReducer,
    cart: cartReducer,
    user: userReducer,
    orders: orderReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
