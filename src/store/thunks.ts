import { createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import { GreengoApi } from "@api/greengoApi";
import { localStorage } from "../services/localStorage.service";
import {
  ExpiredTokenError,
  InternalServerError,
  TimeoutError,
  UnauthorizedError,
} from "./api";
//@ts-ignore
import { Actions, AppDispatch } from "./storeTypes";

export interface ThunkExtraArgs {
  extra: { greengoApi: GreengoApi; actions: Actions };
}

declare class RejectWithValue<RejectValue> {
  readonly payload: RejectValue;
  name: string;
  message: string;
  constructor(payload: RejectValue);
}

type AbortedThunk = "thunk_aborted";

export const createGreenGoThunk = <Input, Returned, Rejected = unknown>(
  typePrefix: string,
  fn: (
    args: Input,
    config: {
      dispatch: AppDispatch;
      rejectWithValue: (
        value: Rejected | AbortedThunk
      ) => RejectWithValue<Rejected | AbortedThunk>;
      greengoApi: GreengoApi;
      actions: Actions;
    }
  ) => Promise<Returned | RejectWithValue<Rejected | AbortedThunk>>
) =>
  createAsyncThunk<
    Returned,
    Input,
    ThunkExtraArgs & { rejectValue: Rejected | AbortedThunk }
  >(
    typePrefix,
    async (
      args,
      { rejectWithValue, dispatch, extra: { greengoApi, actions } }
    ) => {
      try {
        return await fn(args, {
          dispatch,
          rejectWithValue,
          greengoApi,
          actions,
        });
      } catch (e: any) {
        console.log("thunk error => ", e);

        if (e.message === "Network request failed" || e.message === "Timeout") {
          dispatch(actions.application.networkError());
        } else if (e instanceof ExpiredTokenError) {
          dispatch(actions.application.clean);
          dispatch(actions.user.disconnectUser);
          await localStorage.clear();
        } else if (e instanceof InternalServerError) {
          dispatch(actions.application.serverFailed);
        } else if (e instanceof TimeoutError) {
          actions.application.networkError();
        } else {
          dispatch(actions.application.unhandledError());
        }

        return rejectWithValue("thunk_aborted");
      }
    }
  );
