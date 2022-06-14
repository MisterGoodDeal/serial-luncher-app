import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { endpoint, reducerPath } from "./constants";
import { BASE_URL } from "@environments/test.environment";

//Implementation fake with pokemonAPI
export const applicationAPI = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<{}, string>({
      query: (name) => `${endpoint}/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = applicationAPI;
