import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateBearer } from "../feature/user/UserSlice";

// --------------------
//  Base Query Wrapper
// --------------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1/auth",
  credentials: "include", // include refresh token cookie
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState()?.user?._bearer;

    // only attach bearer for /me
    if (token && endpoint === "getMe") {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  // If token expired
  if (result?.error?.status === 401) {
    // try refreshing
    const refreshResult = await rawBaseQuery(
      { url: "/refresh-token", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult?.data?.access_token) {
      // save new token in redux
      api.dispatch(updateBearer(refreshResult.data.access_token));

      // retry original query with new token
      result = await rawBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

// --------------------
//  API Slice
// --------------------
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
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
    verifyOtp: builder.mutation<any, VerifyOtpRequest>({
      query: (otpData) => ({
        url: "/verify-otp",
        method: "POST",
        body: otpData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMe: builder.mutation<User, void>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    refreshToken: builder.mutation<{ access_token: string }, void>({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

// --------------------
//  Auto-generated hooks
// --------------------
export const {
  useRegisterUserMutation,
  useVerifyOtpMutation,
  useGetMeMutation,
  useRefreshTokenMutation,
} = authApi;

// --------------------
//  Types
// --------------------
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

export interface VerifyOtpRequest {
  identifier: string;
  otp: string;
}

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
}
