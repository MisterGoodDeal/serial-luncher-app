import { User } from "./enrollment";

export type Application = {
  userInfos: User;
  token: string;
  loading: boolean;
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
