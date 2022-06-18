import { applicationAPI, applicationSlice } from "./application/slice";
import { enrollmentApi, enrollmentSlice } from "./enrollment/slice";
import { groupsApi, groupSlice } from "./groups/slice";
import { placesApi } from "./places/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
  [enrollmentSlice.name]: enrollmentSlice.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [groupSlice.name]: groupSlice.reducer,
  [placesApi.reducerPath]: placesApi.reducer,
} as const;
