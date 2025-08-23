// src/redux/services/productsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/v1/" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ skip = 0, limit = 10 }) =>
        `products/?skip=${skip}&limit=${limit}`,
    }),
    getProductById: builder.query({
      query: (productId) => `/products/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;
