import { User } from "./enrollment";

export type Application = {
  userInfos: User;
  token: string;
  notification_token: string;
  loading: boolean;
  hasGroup: boolean;
  settings: AppSettings;
  options: any;
};

export interface Token {
  token: string;
}

export interface AppSettings {
  notification_enabled: boolean;
}

export interface GenericApiReponse {
  title: string;
  message: string;
}

export type GenericApiReponseType = {
  title: string;
  message: string;
};
