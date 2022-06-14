import { Enrollment } from "@store/model/enrollment";

export const initialState: Enrollment = {};

export const reducerPath = "enrollmentApi";

export const endpoint = {
  register: "user/register",
  login: "user/login",
  login_oauth: "user/login/oauth",
};
