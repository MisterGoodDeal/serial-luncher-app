import { Enrollment } from "@store/model/enrollment";

export const initialState: Enrollment = {
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profile_picture: "",
    oauth_service: "",
    oauth_service_id: "",
  },
  groupId: "",
  group: {
    name: "",
    picture: "",
  },
};

export const reducerPath = "enrollmentApi";

export const endpoint = {
  register: "user/register",
  login: "user/login",
  login_oauth: "user/login/oauth",
};
