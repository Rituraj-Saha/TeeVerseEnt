import { createSlice } from "@reduxjs/toolkit";

// Helper to generate order list grouped by address
const generateOrderList = (cartItems) => {
  const grouped = {};

  cartItems.forEach((item) => {
    const addressKey = item.address.id;
    if (!grouped[addressKey]) {
      grouped[addressKey] = {
        // orderId: `ORDER-${addressKey}-${Date.now()}`,
        address: item.address,
        items: [],
        totalAmount: 0,
        totalItems: 0,
      };
    }
    grouped[addressKey].items.push(item);
    grouped[addressKey].totalAmount += item.sellingPrice * item.quantity;
    grouped[addressKey].totalItems += item.quantity;
  });

  return Object.values(grouped);
};

const initialState = {
  orders: [], // array of grouped orders
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrderFromCart: (state, action) => {
      const cartItems = action.payload; // expecting cart.cartItems
      const orderList = generateOrderList(cartItems);
      state.orders = orderList;
    },
    clearOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { createOrderFromCart, clearOrders } = orderSlice.actions;

export default orderSlice.reducer;
