import { applicationAPI } from "./application/slice";
import { fakeApi } from "./faker/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [fakeApi.reducerPath]: fakeApi.reducer,
} as const;
