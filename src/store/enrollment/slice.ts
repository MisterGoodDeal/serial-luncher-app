import { createApi } from "@reduxjs/toolkit/query/react";
import { CACHE_KEY, endpoint, initialState, reducerPath } from "./constants";
import {
  Enrollment,
  ForgottenPassword,
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
  tagTypes: [CACHE_KEY],
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
    forgottenPassword: builder.mutation<
      User | GenericApiReponse,
      ForgottenPassword
    >({
      query: (forgotPasswordPayload) => ({
        url: `${endpoint.forgottenPassword}`,
        method: "POST",
        body: forgotPasswordPayload,
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

export const {
  useRegisterMutation,
  useLoginMutation,
  useLoginOAuthMutation,
  useForgottenPasswordMutation,
} = enrollmentApi;
