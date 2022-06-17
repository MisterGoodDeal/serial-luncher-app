import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoint, initialState, reducerPath } from "./constants";
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
    setFirstStep: (
      state,
      action: PayloadAction<{
        firstname: string;
        lastname: string;
        picture: string;
      }>
    ) => {
      state.user.firstname = action.payload.firstname;
      state.user.lastname = action.payload.lastname;
      state.user.profile_picture = action.payload.picture;
    },
    setSecondStep: (
      state,
      action: PayloadAction<{
        email: string;
        password: string;
      }>
    ) => {
      state.user.email = action.payload.email;
      state.user.password = action.payload.password;
    },
    setGroupCode: (state, action: PayloadAction<string>) => {
      state.groupId = action.payload;
    },
    setGroup: (
      state,
      action: PayloadAction<{
        name: string;
        picture: string;
      }>
    ) => {
      state.group.name = action.payload.name;
      state.group.picture = action.payload.picture;
    },
    resetRegister: (state) => {
      state = initialState;
    },
  },
});

export const {
  setEnrollment,
  setFirstStep,
  setSecondStep,
  setGroupCode,
  setGroup,
  resetRegister,
} = enrollmentSlice.actions;

export const { useRegisterMutation, useLoginMutation, useLoginOAuthMutation } =
  enrollmentApi;
