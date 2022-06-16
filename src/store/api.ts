import { SERIAL_LUNCHER_API } from "@environments/test.environment";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { applicationState } from "./application/selector";
import { AppState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: SERIAL_LUNCHER_API,

  prepareHeaders: (headers, { getState }) => {
    const appState = getState() as AppState;
    const token = applicationState(appState).token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("x-auth", token);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
