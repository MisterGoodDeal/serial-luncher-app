import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { endpoint, reducerPath } from "./constants";
import { SERIAL_LUNCHER_API } from "environments/test.environment";
import { Login, LoginOAuth, User, UserRegister } from "@store/model/enrollment";

export const enrollmentApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: SERIAL_LUNCHER_API,
  }),
  endpoints: (builder) => ({
    register: builder.mutation<User, UserRegister>({
      query: (user) => ({
        url: `${endpoint.register}`,
        method: "POST",
        body: user,
      }),
      transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),
    login: builder.mutation<User, Login>({
      query: (loginPayload) => ({
        url: `${endpoint.login}`,
        method: "POST",
        body: loginPayload,
      }),
      transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),
    loginOAuth: builder.mutation<User, LoginOAuth>({
      query: (loginPayload) => ({
        url: `${endpoint.login_oauth}`,
        method: "POST",
        body: loginPayload,
      }),
      transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLoginOAuthMutation } =
  enrollmentApi;
