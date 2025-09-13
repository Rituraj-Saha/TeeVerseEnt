import { createApi } from "@reduxjs/toolkit/query/react";
import { addAddress, syncAddress } from "../feature/user/UserSlice";
import { baseQueryWithReauth } from "./authApi";

type Address = {
  id: number;
  addressline: string;
  pincode: string;
  landmark: string;
  city: string;
  state: string;
  nation: string;
  receiverPhoneNumber: string;
  default: boolean;
};

type AddressResponse = {
  addresses: Address[];
};

type DeleteAddressRequest = {
  id: number;
};

type AddOrDeleteResponse = {
  message: string;
  addresses: Address[];
};

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddress: builder.query<AddressResponse, void>({
      query: () => ({ url: "/auth/address/list", method: "GET" }),
      providesTags: ["Address"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(syncAddress(data.addresses));
        } catch (err) {
          console.error("getAddress sync error:", err);
        }
      },
    }),
    deleteAddress: builder.mutation<AddOrDeleteResponse, DeleteAddressRequest>({
      query: (body) => ({
        url: `/auth/address/delete`,
        method: "DELETE",
        body, // { id: number }
      }),
      invalidatesTags: ["Address"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(syncAddress(data.addresses)); // ✅ no more type error
        } catch (err) {
          console.error("deleteAddress sync error:", err);
        }
      },
    }),
    addAddress: builder.mutation<AddOrDeleteResponse, Address>({
      query: (body) => ({
        url: `/auth/address/add`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(syncAddress(data.addresses)); // ✅ no more type error
        } catch (err) {
          console.error("deleteAddress sync error:", err);
        }
      },
    }),
    updateAddress: builder.mutation<AddOrDeleteResponse, Address>({
      query: (body) => ({
        url: `/auth/address/update`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(syncAddress(data.addresses)); // ✅ no more type error
        } catch (err) {
          console.error("deleteAddress sync error:", err);
        }
      },
    }),
  }),
});

export const {
  useGetAddressQuery,
  useDeleteAddressMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
} = addressApi;
