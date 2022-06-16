import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { endpoint, initialState, reducerPath } from "./constants";
import { SERIAL_LUNCHER_API } from "@environments/test.environment";
import {
  Enrollment,
  Login,
  LoginOAuth,
  User,
  UserRegister,
} from "@store/model/enrollment";
import { GenericApiReponse } from "@store/model/application";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "@store/api";

export const enrollmentApi = createApi({
  reducerPath,
  baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<User | GenericApiReponse, UserRegister>({
      query: (user) => ({
        url: `${endpoint.register}`,
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation<User | GenericApiReponse, Login>({
      query: (loginPayload) => ({
        url: `${endpoint.login}`,
        method: "POST",
        body: loginPayload,
      }),
    }),
    loginOAuth: builder.mutation<User | GenericApiReponse, LoginOAuth>({
      query: (loginPayload) => ({
        url: `${endpoint.login_oauth}`,
        method: "POST",
        body: loginPayload,
      }),
    }),
  }),
});

export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollment: (state, action: PayloadAction<Enrollment>) => {
      state = action.payload;
    },
  },
});

export const { setEnrollment } = enrollmentSlice.actions;

export const { useRegisterMutation, useLoginMutation, useLoginOAuthMutation } =
  enrollmentApi;
