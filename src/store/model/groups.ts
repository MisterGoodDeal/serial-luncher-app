import { Token } from "./application";
import { User } from "./enrollment";

export type Groups = {
  groupInfo: GroupInfo;
};

export interface Group {
  id: number;
  name: string;
  image: string;
  fk_user: number;
  group_key: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  groupeInfo?: GroupInfo;
}

export interface GroupInfo {
  group: Partial<Group> & { creator: Partial<User> };
  users: {
    firstname: string;
    lastname: string;
    profile_picture: string;
  }[];
  last_places: {
    name: string;
    country_speciality: string;
    rating: number;
    price_range: number;
    image: string;
    can_bring_reusable_contents: boolean;
    creator: Partial<User>;
    created_at: string;
    lat: number;
    lng: number;
  }[];
  random_image: string;
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
