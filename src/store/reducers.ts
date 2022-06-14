import { applicationAPI } from "./application/slice";
import { enrollmentApi } from "./enrollment/slice";
import { groupsApi } from "./groups/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
} as const;
