import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { updateBearer } from "../feature/user/UserSlice";

// --------------------
//  Base Query Wrapper
// --------------------
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api/v1", // generic base
  credentials: "include", // send refresh token cookie
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.user?._bearer;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof rawBaseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // attempt refresh
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh-token", method: "POST" },
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
        url: "auth/verify-otp",
        method: "POST",
        body: otpData,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getMe: builder.mutation<User, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),
    refreshToken: builder.mutation<{ access_token: string }, void>({
      query: () => ({
        url: "auth/refresh-token",
        method: "POST",
      }),
    }),
    login: builder.mutation<void, Identifier>({
      query: (identifier) => ({
        url: `auth/login/?identifier=%2B91${identifier}`,
        method: "POST",
        // body: identifier,
        // headers: {
        //   "Content-Type": "application/json",
        // },
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
  useLoginMutation,
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
interface Identifier {
  identifier: string;
}
