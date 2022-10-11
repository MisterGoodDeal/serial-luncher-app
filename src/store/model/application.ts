import { User } from "./enrollment";

export type Application = {
  userInfos: User;
  token: string;
  notification_token: string;
  loading: boolean;
  hasGroup: boolean;
};

export interface Token {
  token: string;
}

export interface GenericApiReponse {
  title: string;
  message: string;
}

export type GenericApiReponseType = {
  title: string;
  message: string;
};
