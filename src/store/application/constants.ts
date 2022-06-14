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
};

export const reducerPath = "applicationApi";

export const endpoint = "pokemon";
