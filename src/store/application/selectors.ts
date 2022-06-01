import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const get = (state: AppState) => state.application;
export const info = createSelector(get, (application) => application.info);
export const pending = createSelector(
  get,
  (application) => application.pending
);
