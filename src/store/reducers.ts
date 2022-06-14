import { applicationAPI } from "./application/slice";
import { enrollmentApi } from "./enrollment/slice";
import { groupsApi } from "./groups/slice";
import { placesApi } from "./places/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [placesApi.reducerPath]: placesApi.reducer,
} as const;
