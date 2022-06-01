import { ActionReducerMapBuilder, AsyncThunk } from "@reduxjs/toolkit";
import { Application, Info } from "../model/application";
import { ThunkExtraArgs } from "../thunks";

/** Utility to handle thunks dispatching an Info to be displayed to the screen when a request success or fails */
export const addThunksWithInfo = (
  thunks: AsyncThunk<
    Info,
    any,
    ThunkExtraArgs & {
      rejectValue: Info | "thunk_aborted";
    }
  >[],
  builder: ActionReducerMapBuilder<Application>
) => {
  thunks.map((thunk) => {
    builder
      .addCase(thunk.pending, (state) => {
        state.pending = true;
      })
      .addCase(thunk.rejected, (state, action) => {
        if (
          action.payload === "thunk_aborted" ||
          action.payload === undefined
        ) {
          return;
        }

        state.info = action.payload;
      })
      .addCase(thunk.fulfilled, (_state, action) => {
        if (action.payload !== undefined) {
          return { info: { ...action.payload }, pending: false };
        }
      });
  });
};
