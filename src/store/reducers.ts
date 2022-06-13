import { applicationAPI } from "./application/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
} as const;
