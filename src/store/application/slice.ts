import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@store/api";
import { endpoint, initialState, reducerPath } from "./constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@store/model/enrollment";

export const applicationAPI = createApi({
  reducerPath,
  baseQuery,
  endpoints: (builder) => ({
    editUser: builder.mutation<User, Partial<User>>({
      query: (body) => ({
        url: endpoint.updateUser,
        method: "PUT",
        body,
      }),
    }),
    deleteUser: builder.mutation<{}, {}>({
      query: () => ({
        url: endpoint.delete,
        method: "DELETE",
      }),
    }),
  }),
});

export const applicationSlice = createSlice({
  name: "applicationSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.userInfos = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setHasGroup: (state, action: PayloadAction<boolean>) => {
      state.hasGroup = action.payload;
    },
    disconnect: (state) => {
      state.userInfos = initialState.userInfos;
      state.token = initialState.token;
      state.loading = initialState.loading;
    },
  },
});

export const { setUser, setToken, setLoading, setHasGroup, disconnect } =
  applicationSlice.actions;

export const { useEditUserMutation, useDeleteUserMutation } = applicationAPI;
