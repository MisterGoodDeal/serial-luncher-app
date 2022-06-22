import { Places } from "@store/model/places";

export const initialState: Places = {
  places: [],
};

export const reducerPath = "placesApi";

export const endpoint = {
  places: {
    get: "places/all",
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
