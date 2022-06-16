import { createApi } from "@reduxjs/toolkit/query/react";

import { endpoint, reducerPath } from "./constants";

import {
  CreateGroup,
  Groups,
  GetAndJoinGroup,
  LeaveAndDeleteGroup,
} from "@store/model/groups";

import { GenericApiReponse, Token } from "@store/model/application";
import { baseQuery } from "@store/api";

export const groupsApi = createApi({
  reducerPath,
  baseQuery,
  endpoints: (builder) => ({
    getGroup: builder.mutation<
      Groups | GenericApiReponse,
      GetAndJoinGroup & Token
    >({
      query: ({ group_key }) => ({
        url: `${endpoint.get}/${group_key}`,
        method: "GET",
      }),
    }),

    createGroup: builder.mutation<
      Groups | GenericApiReponse,
      CreateGroup & Token
    >({
      query: ({ token, ...group }) => ({
        url: `${endpoint.create}`,
        method: "POST",
        body: group,
      }),
    }),

    joinGroup: builder.mutation<
      Groups | GenericApiReponse,
      GetAndJoinGroup & Token
    >({
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

export const {
  useGetGroupMutation,

  useCreateGroupMutation,

  useJoinGroupMutation,

  useLeaveGroupMutation,

  useDeleteGroupMutation,
} = groupsApi;
