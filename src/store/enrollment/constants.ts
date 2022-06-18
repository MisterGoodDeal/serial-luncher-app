import { Enrollment } from "@store/model/enrollment";

export const initialState: Enrollment = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  profile_picture: "",
  oauth_service: "",
  oauth_service_id: "",
};

export const reducerPath = "enrollmentApi";

export const CACHE_KEY = "User";

export const endpoint = {
  register: "user/register",
  login: "user/login",
  forgottenPassword: "user/forgot-password",
  login_oauth: "user/login/oauth",
};
