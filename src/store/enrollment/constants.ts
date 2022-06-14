import { Faker } from "@store/model/fake";

export const initialState: Faker = {};

export const reducerPath = "enrollmentApi";

export const endpoint = {
  register: "user/register",
  login: "user/login",
  login_oauth: "user/login/oauth",
};
