import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      console.log("Item id to be incr: " + item.id);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },

    calculateTotals: (state) => {
      let totalAmount = 0;
      let totalItems = 0;

      state.cartItems.forEach((item) => {
        totalAmount += item.price * item.quantity;
        totalItems += item.quantity;
      });

      state.totalAmount = totalAmount;
      state.totalItems = totalItems;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
