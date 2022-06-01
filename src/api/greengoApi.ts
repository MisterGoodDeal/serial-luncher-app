import useExpiredToken from "@hooks/useExpiredToken";
import { ExpiredTokenError } from "@store/api";
import { Env } from "@utils/environnement";
import { Platform } from "react-native";
import { Fetch, isErrorStatus } from "./utils";
import { LoginApi, makeLoginApi } from "./login";

interface Tokens {
  xauth: string | null;
  hauth: string | null;
}

// Login API
const loginRoute = "user/login";

const refreshRoute = "refresh/token";

export interface GreengoApi {
  login: LoginApi;
}

export interface GetGreenGoApiParams {
  baseUrl: string;
  getTokens: () => Tokens;
  setTokens: (tokens: Tokens) => void;
}

export const getGreenGoApi = ({
  baseUrl,
  getTokens,
  setTokens,
}: GetGreenGoApiParams): GreengoApi => {
  const fetchFn = getGreenGoApiFetch(
    baseUrl,
    greengoApiFetch,
    getTokens,
    setTokens
  );

  return {
    login: makeLoginApi(fetchFn),
  };
};

export const getGreenGoApiFetch = (
  baseUrl: string,
  fetchFn: Fetch,
  getTokens: () => Tokens,
  setTokens: (tokens: Tokens) => void
): Fetch => {
  // Setting up a timeout of 15sec in case of too long request.
  const timeout = 15000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return async (url, init) => {
    const urlRoute = `${baseUrl}/${url}`;
    const tokens = getTokens();
    if (url === loginRoute) {
      return await fetchFn(urlRoute, init); // Routes that doesn't need tokens
    }

    let res = await fetchFn(urlRoute, addTokensToHeaders(init, tokens));
    if (tokens.xauth && tokens.hauth) {
      // Getting token validity
      const { isExpiredRefreshToken, isExpiredToken } = useExpiredToken({
        token: tokens.xauth,
        refreshToken: tokens.hauth,
      });

      // Check if token is expired (but not refresh token)
      if (isExpiredToken && !isExpiredRefreshToken) {
        // Ask for new token

        const refreshRes = await fetchFn(`${baseUrl}/${refreshRoute}`, {
          ...init,
          headers: {
            ...init?.headers,
            "h-auth": tokens.hauth,
          },
        });
        console.log(refreshRes);

        if (!isErrorStatus(refreshRes.status)) {
          const refreshedTokens = {
            hauth: refreshRes.headers.get("h-auth"),
            xauth: refreshRes.headers.get("x-auth"),
          };

          setTokens(refreshedTokens);
          res = await fetchFn(
            urlRoute,
            addTokensToHeaders(init, refreshedTokens)
          );
        } else if (isExpiredToken && isExpiredRefreshToken) {
          throw new ExpiredTokenError();
        }
      }
    }
    clearTimeout(id);
    return res;
  };
};

const addTokensToHeaders = (
  init: RequestInit | undefined,
  tokens: Tokens
): RequestInit => {
  return {
    ...init,
    headers: {
      ...init?.headers,
      ...{
        "x-client-version": Env.clientVersion,
        "x-client-name":
          Platform.OS === "android"
            ? Env.clientName.android
            : Env.clientName.ios,
        ...(tokens.xauth ? { "x-auth": tokens.xauth } : {}),
        ...(tokens.hauth ? { "h-auth": tokens.hauth } : {}),
      },
    },
  };
};

export const greengoApiFetch: Fetch = (url, init) => {
  // Setting up a timeout of 15sec in case of too long request.
  const timeout = 15000;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const requestInit: RequestInit = {
    ...init,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  };
  clearTimeout(id);
  return fetch(url, requestInit);
};
