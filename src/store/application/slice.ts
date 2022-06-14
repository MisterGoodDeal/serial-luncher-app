import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { endpoint, initialState, reducerPath } from "./constants";
import { BASE_URL } from "@environments/test.environment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@store/model/enrollment";

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
  },
});

export const { setUser, setToken, setLoading } = applicationSlice.actions;

export const { useGetPokemonByNameQuery } = applicationAPI;
