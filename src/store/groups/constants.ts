import { Faker } from "@store/model/fake";

export const initialState: Faker = {};

export const reducerPath = "groupsApi";

export const endpoint = {
  create: "group/create",
  join: "group/join",
  leave: "group/leave",
  delete: "group/delete",
  get: "group",
};
