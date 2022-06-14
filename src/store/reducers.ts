import { applicationAPI } from "./application/slice";
import { enrollmentApi } from "./enrollment/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
} as const;
