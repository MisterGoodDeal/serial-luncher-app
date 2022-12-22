import { applicationAPI, applicationSlice } from "./application/slice";
import { enrollmentApi, enrollmentSlice } from "./enrollment/slice";
import { groupsApi, groupSlice } from "./groups/slice";
import { placesApi, placesSlice } from "./places/slice";

export const reducers = {
  [applicationAPI.reducerPath]: applicationAPI.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
  [enrollmentSlice.name]: enrollmentSlice.reducer,
  [groupsApi.reducerPath]: groupsApi.reducer,
  [groupSlice.name]: groupSlice.reducer,
  [placesApi.reducerPath]: placesApi.reducer,
  [placesSlice.name]: placesSlice.reducer,
};
