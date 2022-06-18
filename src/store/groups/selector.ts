import { createSelector } from "reselect";
import { store } from "@store/store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.group;
export const groupState = createSelector(get, (group) => group);
