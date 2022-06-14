import { Token } from "./application";

export type Groups = {};

export interface Group {
  id: number;
  name: string;
  image: string;
  fk_user: number;
  group_key: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface CreateGroup {
  name: string;
  image: string;
}

export interface GetAndJoinGroup {
  group_key: string;
}

export interface LeaveAndDeleteGroup {
  id: number;
}
