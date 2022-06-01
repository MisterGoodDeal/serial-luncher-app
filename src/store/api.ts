import { Store } from "@reduxjs/toolkit";
import { selectors as appSelectors } from "./selectors";
import { actions as appActions } from "./actions";
import { getGreenGoApi, GreengoApi } from "@api/greengoApi";
import { isErrorResponse, ServiceResponse } from "@api/utils";
import { Env } from "../utils/environnement";

export const getThunkGreengoApi = (
  getStore: () => Store,
  selectors: typeof appSelectors,
  actions: typeof appActions
): GreengoApi => {
  return getGreenGoApi({
    baseUrl: Env.api,
    getTokens: () => {
      const store = getStore();
      return {
        xauth: selectors.user.get(store.getState()).token,
        hauth: selectors.user.get(store.getState()).refreshToken,
      };
    },
    setTokens: (tokens) => {
      const store = getStore();
      store.dispatch(
        actions.user.setTokens({
          token: tokens.xauth,
          refreshToken: tokens.hauth,
        })
      );
    },
  });
};

export const checkApiError = <T extends object | undefined>(
  res: ServiceResponse<T>
) => {
  if (isErrorResponse(res)) {
    if (res.statusCode === 500) {
      throw new InternalServerError();
    } else if (res.statusCode === 401) {
      throw new UnauthorizedError();
    } else if (res.statusCode === 408) {
      throw new TimeoutError();
    }
  }

  return res;
};

export class InternalServerError extends Error {}
export class UnauthorizedError extends Error {}
export class ExpiredTokenError extends Error {}
export class TimeoutError extends Error {}
