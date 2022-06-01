import { userSlice } from "./userSlice";
import * as userThunks from "./user/thunks";
import { applicationSlice } from "./application/applicationSlice";

export const actions = {
  [userSlice.name]: { ...userSlice.actions, ...userThunks },
  [applicationSlice.name]: applicationSlice.actions,
} as const;
