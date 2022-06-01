import { applicationSlice } from "./application/applicationSlice";
import * as applicationSelectors from "./application/selectors";
import { userSlice } from "./userSlice";
import * as userSelectors from "./user/selectors";

export const selectors = {
  [applicationSlice.name]: applicationSelectors,
  [userSlice.name]: userSelectors,
};
