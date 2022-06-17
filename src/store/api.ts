import { SERIAL_LUNCHER_API } from "@environments/test.environment";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";
import { applicationState } from "./application/selector";
import { AppState } from "./store";

export const baseQuery = fetchBaseQuery({
  baseUrl: SERIAL_LUNCHER_API,

  prepareHeaders: (headers, { getState }) => {
    const appState = getState() as AppState;
    const app = applicationState(appState);
    console.log(app.token);

    // If we have a token set in state, let's assume that we should be passing it.
    if (app) {
      headers.set("x-auth", app.token);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});
