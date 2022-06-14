import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { endpoint, reducerPath } from "./constants";
import { SERIAL_LUNCHER_API } from "@environments/test.environment";
import {
  CreateGroup,
  Groups,
  GetAndJoinGroup,
  LeaveAndDeleteGroup,
} from "@store/model/groups";
import { GenericApiReponse, Token } from "@store/model/application";

export const groupsApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: SERIAL_LUNCHER_API,
  }),
  endpoints: (builder) => ({
    getGroup: builder.query<
      Groups | GenericApiReponse,
      GetAndJoinGroup & Token
    >({
      query: ({ group_key, token }) => ({
        url: `${endpoint.get}/${group_key}`,
        method: "GET",
        headers: {
          "x-auth": token,
        },
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
        headers: {
          "Content-Type": "application/json",
          "x-auth": token,
        },
      }),
      transformResponse: (
        response: { data: Groups | GenericApiReponse },
        meta,
        arg
      ) => response.data,
    }),
    joinGroup: builder.mutation<
      Groups | GenericApiReponse,
      GetAndJoinGroup & Token
    >({
      query: ({ token, group_key }) => ({
        url: `${endpoint.join}/${group_key}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth": token,
        },
      }),
      transformResponse: (
        response: { data: Groups | GenericApiReponse },
        meta,
        arg
      ) => response.data,
    }),
    leaveGroup: builder.mutation<
      GenericApiReponse,
      LeaveAndDeleteGroup & Token
    >({
      query: ({ token, id }) => ({
        url: `${endpoint.leave}/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth": token,
        },
      }),
      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),
    deleteGroup: builder.mutation<
      GenericApiReponse,
      LeaveAndDeleteGroup & Token
    >({
      query: ({ token, id }) => ({
        url: `${endpoint.delete}/${id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth": token,
        },
      }),
      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),
  }),
});

export const {
  useGetGroupQuery,
  useCreateGroupMutation,
  useJoinGroupMutation,
  useLeaveGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
