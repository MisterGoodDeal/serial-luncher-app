import { createSelector } from "reselect";
import { store } from "@store/store";

type RootState = ReturnType<typeof store.getState>;

const get = (state: RootState) => state.enrollment;
export const enrollmentState = createSelector(get, (enrollment) => enrollment);
