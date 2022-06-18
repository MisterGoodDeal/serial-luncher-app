import { createApi } from "@reduxjs/toolkit/query/react";

import { endpoint, initialState, reducerPath } from "./constants";

import {
  CreateGroup,
  Groups,
  GetAndJoinGroup,
  LeaveAndDeleteGroup,
  Group,
} from "@store/model/groups";

import { GenericApiReponse, Token } from "@store/model/application";
import { baseQuery } from "@store/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const groupsApi = createApi({
  reducerPath,
  baseQuery,
  endpoints: (builder) => ({
    getGroup: builder.mutation<
      Group | GenericApiReponse,
      GetAndJoinGroup & Token
    >({
      query: ({ group_key }) => ({
        url: `${endpoint.get}/${group_key}`,
        method: "GET",
      }),
    }),

    createGroup: builder.mutation<Group | GenericApiReponse, CreateGroup>({
      query: ({ ...group }) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: group,
      }),
    }),

    joinGroup: builder.mutation<Group | GenericApiReponse, GetAndJoinGroup>({
      query: ({ group_key }) => ({
        url: `${endpoint.join}/${group_key}`,
        method: "POST",
      }),
    }),

    leaveGroup: builder.mutation<
      GenericApiReponse,
      LeaveAndDeleteGroup & Token
    >({
      query: ({ id }) => ({
        url: `${endpoint.leave}/${id}`,
        method: "DELETE",
      }),

      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),

    deleteGroup: builder.mutation<
      GenericApiReponse,
      LeaveAndDeleteGroup & Token
    >({
      query: ({ id }) => ({
        url: `${endpoint.delete}/${id}`,
        method: "DELETE",
      }),

      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),
  }),
});

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroup: (state, action: PayloadAction<Group>) => {
      state = action.payload;
    },
  },
});

export const { setGroup } = groupSlice.actions;

export const {
  useGetGroupMutation,
  useCreateGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
