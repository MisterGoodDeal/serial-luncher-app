import { createSelector } from "reselect";
import { store } from "@store/store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.placesSlice;
export const placesState = createSelector(get, (places) => places);
