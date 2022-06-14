import { Groups } from "@store/model/groups";

export const initialState: Groups = {};

export const reducerPath = "groupsApi";

export const endpoint = {
  create: "group/create",
  join: "group/join",
  leave: "group/leave",
  delete: "group/delete",
  get: "group",
};
