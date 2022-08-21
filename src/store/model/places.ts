export type Places = {
  places: Place[];
};

export interface Place {
  id: number;
  name: string;
  fk_country_speciality: string;
  lat: number;
  lng: number;
  rating: number;
  price_range: number;
  can_bring_reusable_contents: boolean;
  image: string;
  url: string | null;
  fk_lunch_group: number;
}

export interface StuffedPlace extends Place {
  comments: {
    id: number;
    comment: string;
    created_at: string;
    firstname: string;
    lastname: string;
    profile_picture: string;
  }[];
}

export interface CreatePlace {
  country_speciality: number;
  lat: number;
  lng: number;
  name: string;
  rating: number;
  price_range: number;
  can_bring_reusable_content: boolean;
  image: string;
  url: string | null;
}

export interface GetPlaces {
  group_key: string;
}

export interface PlaceId {
  id: number;
}

export interface Comment {
  id: number;
  comment: string;
  fk_user: number;
  fk_lunch_place: number;
  created_at: string;
}

export interface CommentId {
  commentId: number;
}

export interface AddComment {
  comment: string;
}
