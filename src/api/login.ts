import { User } from "@store/model/user";
import { selectors } from "@store/selectors";
import { Response } from "node-fetch";
import { Fetch, ServiceResponse } from "./utils";

export interface LoginApi {
  login: (email: string, password: string) => Promise<ServiceResponse<any>>;
}

export const makeLoginApi = (fetchFn: Fetch): LoginApi => ({
  login: async (email: string, password: string) => {
    const res = await fetchFn(`user/login`, {
      body: JSON.stringify({ login: email, password: password }),
      method: "POST",
    });

    return res;
  },
});
