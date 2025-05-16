import { configureStore } from "@reduxjs/toolkit";
import bottomSheetControllerReducer from "../storeCofig/feature/bottomSheetController/BottomsheetControllerSlice";
export const store = configureStore({
  reducer: {
    bottomSheetControllerReducer: bottomSheetControllerReducer,
  },
});
