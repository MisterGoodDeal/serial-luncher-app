import { Faker } from "@store/model/fake";

export const initialState: Faker = {};

export const reducerPath = "enrollmentApi";

export const endpoint = {
  places: {
    get: "place",
    create: "place/create",
    delete: "place",
  },
  favorites: {
    get: "places/favorite",
    add: (placeId: number) => `places/${placeId}/favorite`,
    remove: (placeId: number) => `places/${placeId}/favorite`,
  },
  comments: {
    get: (placeId: number) => `places/${placeId}/comment`,
    add: (placeId: number) => `places/${placeId}/comment`,
    remove: (placeId: number, commentId: number) =>
      `places/${placeId}/comment/${commentId}`,
  },
};
