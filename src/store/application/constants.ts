import { Application } from "@store/model/application";

export const initialState: Application = {
  userInfos: {
    id: -1,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profile_picture: "",
    oauth_service: "",
    oauth_service_id: "",
    token: "",
    created_at: new Date(),
    updated_at: new Date(),
  },
  token: "",
  notification_token: "",
  loading: false,
  hasGroup: false,
  settings: {
    notification_enabled: true,
  },
  options: {},
};

export const reducerPath = "applicationApi";

export const endpoint = {
  updateUser: "/user/edit",
  delete: "/user/delete",
  mobileToken: "/notifications/token",
};
