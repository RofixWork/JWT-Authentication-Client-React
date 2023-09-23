import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:7119/api/Auth" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: `/Register`,
        body,
      }),
    }),
    signinUser: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "/Login",
        body,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useSigninUserMutation } = authAPI;
