// src/api/cartApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./authApi";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../feature/cartStore/CartSlice";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    addCartItem: builder.mutation<any, any>({
      query: (cartData) => ({
        url: "/cart", // http://localhost:8000/api/v1/cart
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          // fetch product details
          const productResp = await fetch(
            `http://localhost:8000/api/v1/products/${data.product_id}`
          );
          const product = await productResp.json();

          const basePrice = parseFloat(product.price);
          const discount = product.discount || 0;
          const sellingPrice = basePrice - (basePrice * discount) / 100;

          // sync with cart slice
          dispatch(
            addToCart({
              cid: data.id,
              productName: product.name,
              product_id: data.product_id,
              quantity: data.requested_qty,
              selectedSize: data.requested_size,
              sellingPrice,
              price: basePrice,
              discount: product.discount,
              thumbnail: product.thumbnail,
              sizes: product.sizes,
            })
          );
        } catch (err) {
          console.error("addCartItem sync error:", err);
        }
      },
    }),

    getCart: builder.query<any[], void>({
      query: () => ({ url: "/cart", method: "GET" }),
      providesTags: ["Cart"],
      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          // clear slice before syncing
          dispatch(clearCart());

          // fetch product details for all cart items in parallel
          const enrichedCart = await Promise.all(
            data.map(async (item) => {
              const productResp = await fetch(
                `http://localhost:8000/api/v1/products/${item.product_id}`
              );
              const product = await productResp.json();

              const basePrice = parseFloat(product.price);
              const discount = product.discount || 0;
              const sellingPrice = basePrice - (basePrice * discount) / 100;

              return {
                cid: item.id,
                product_id: item.product_id,
                quantity: item.requested_qty,
                selectedSize: item.requested_size,
                sellingPrice,
                price: basePrice,
                discount: product.discount,
                productName: product.name,
                thumbnail: product.thumbnail,
                sizes: product.sizes,
              };
            })
          );

          // sync enriched cart with store
          enrichedCart.forEach((item) => dispatch(addToCart(item)));
        } catch (err) {
          console.error("getCart sync error:", err);
        }
      },
    }),

    updateCartItem: builder.mutation<any, { cart_id: string; data: any }>({
      query: ({ cart_id, data }) => ({
        url: `/cart/${cart_id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted({ cart_id, data }, { dispatch, queryFulfilled }) {
        try {
          const { data: updated } = await queryFulfilled;
          dispatch(
            updateQuantity({ cid: cart_id, quantity: updated.requested_qty })
          );
        } catch (err) {
          console.error("updateCartItem sync error:", err);
        }
      },
    }),

    deleteCartItem: builder.mutation<{ success: boolean }, string>({
      query: (cart_id) => ({
        url: `/cart/${cart_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
      async onQueryStarted(cart_id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(removeFromCart(cart_id));
        } catch (err) {
          console.error("deleteCartItem sync error:", err);
        }
      },
    }),
  }),
});

export const {
  useAddCartItemMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
} = cartApi;
