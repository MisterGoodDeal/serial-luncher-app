import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { endpoint, reducerPath } from "./constants";

export const fakeApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<{}, string>({
      query: () => `${endpoint.todos}`,
    }),
    getTodo: builder.query<{}, string>({
      query: (id) => `${endpoint.todos}/${id}`,
    }),
  }),
});

export const { useGetTodoQuery, useGetTodosQuery } = fakeApi;
