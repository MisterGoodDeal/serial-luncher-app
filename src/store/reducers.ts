import { userSlice } from "./userSlice";
import { applicationSlice } from "./application/applicationSlice";

export const reducers = {
  [userSlice.name]: userSlice.reducer,
  [applicationSlice.name]: applicationSlice.reducer,
};
