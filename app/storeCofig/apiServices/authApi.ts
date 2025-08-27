import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/auth", // change to your backend URL
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, RegisterUserRequest>({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

// Auto-generated hook
export const { useRegisterUserMutation } = authApi;

// Define request type (optional but good for TS)
export interface Address {
  addressline: string;
  pincode: string;
  landmark?: string;
  city: string;
  state: string;
}

export interface RegisterUserRequest {
  phone_number: string;
  email: string;
  name: string;
  address?: Address;
  role?: "user" | "admin";
}
