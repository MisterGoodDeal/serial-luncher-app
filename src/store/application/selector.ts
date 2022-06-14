import { createSelector } from "reselect";
import { store } from "@store/store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.applicationSlice;
export const applicationState = createSelector(
  get,
  (application) => application
);
