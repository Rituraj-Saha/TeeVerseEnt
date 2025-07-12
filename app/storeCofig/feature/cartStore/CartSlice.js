import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
};

// Helper function to recalculate totals
const recalculateTotals = (state) => {
  state.totalAmount = state.cartItems.reduce(
    (sum, item) => sum + item.sellingPrice * item.quantity,
    0
  );
  state.totalItems = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.cid === item.cid);

      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }

      recalculateTotals(state);
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.cid !== itemId); // need to specify with cID

      recalculateTotals(state);
    },

    updateQuantity: (state, action) => {
      const { cid, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.cid === cid); // need to specify with cID

      if (item && quantity > 0) {
        item.quantity = quantity;
      }

      recalculateTotals(state);
    },

    incrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.cid === action.payload);
      console.log("Cid in incr: " + item);
      if (item) {
        item.quantity += 1;
      }

      recalculateTotals(state);
    },

    decrementQuantity: (state, action) => {
      const item = state.cartItems.find((i) => i.cid === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Optionally remove item if quantity drops to 0
        state.cartItems = state.cartItems.filter(
          (i) => i.cid !== action.payload
        );
      }

      recalculateTotals(state);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalItems = 0;
    },

    calculateTotals: (state) => {
      recalculateTotals(state);
    },

    modifyAdrress: (state, action) => {
      const item = state.cartItems.find((i) => i.cid == action.payload.id);
      if (item) {
        item.address = action.payload.address;
      }
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
  modifyAdrress,
} = cartSlice.actions;

export default cartSlice.reducer;
