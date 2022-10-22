import { Group, Groups } from "@store/model/groups";

export const initialState: Group = {
  id: -1,
  name: "",
  image: "",
  fk_user: -1,
  group_key: "",
  created_at: "",
  updated_at: "",
  deleted_at: "",
  groupeInfo: undefined,
};

export const reducerPath = "groupsApi";

export const endpoint = {
  create: "group/create",
  join: "group/join",
  leave: "group/leave",
  delete: "group/delete",
  get: "group",
  getAll: "groups",
  info: "group/info",
};
