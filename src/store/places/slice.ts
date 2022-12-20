import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoint, initialState, reducerPath } from "./constants";
import {
  CreatePlace,
  PlaceId,
  GetPlaces,
  Place,
  AddComment,
  Comment,
  CommentId,
  StuffedPlace,
  RoutePlannerResponse,
  RoutePlannerRequest,
  Specialty,
  SpecialtyStore,
} from "@store/model/places";
import { GenericApiReponse, Token } from "@store/model/application";
import { baseQuery } from "@store/api";
import {
  EventDelete,
  EventInsert,
  EventJoinAndLeave,
  FormattedEvent,
} from "@store/model/events";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const placesApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: ["Places", "Favorites"],
  endpoints: (builder) => ({
    /**
     * Place endpoints
     */
    getPlaces: builder.query<StuffedPlace[] | GenericApiReponse, {}>({
      query: () => ({
        url: `${endpoint.places.get}`,
        method: "GET",
      }),
    }),
    addPlace: builder.mutation<Place | GenericApiReponse, CreatePlace>({
      query: ({ ...place }) => ({
        url: `${endpoint.places.create}`,
        method: "POST",
        body: place,
      }),
    }),
    deletePlace: builder.mutation<GenericApiReponse, PlaceId & Token>({
      query: ({ token, id }) => ({
        url: `${endpoint.places.delete}/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),
    /**
     * Favorite endpoints
     */
    getFavorites: builder.query<Place[] | GenericApiReponse, Token>({
      query: () => ({
        url: `${endpoint.favorites.get}`,
        method: "GET",
      }),
    }),
    addFavorite: builder.mutation<Place | GenericApiReponse, PlaceId & Token>({
      query: ({ token, id }) => ({
        url: `${endpoint.favorites.add(id)}`,
        method: "POST",
      }),
    }),
    deleteFavorite: builder.mutation<GenericApiReponse, PlaceId & Token>({
      query: ({ token, id }) => ({
        url: `${endpoint.favorites.remove(id)}`,
        method: "DELETE",
      }),
      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),
    /**
     * Comments endpoints
     */
    getComments: builder.query<Comment[] | GenericApiReponse, PlaceId & Token>({
      query: ({ token, id }) => ({
        url: `${endpoint.comments.get(id)}`,
        method: "GET",
        headers: {
          "x-auth": token,
        },
      }),
    }),
    addComment: builder.mutation<
      Comment | GenericApiReponse,
      AddComment & PlaceId
    >({
      query: ({ id, ...comment }) => ({
        url: `place/${id}/comment`,
        method: "POST",
        body: comment,
      }),
    }),
    deleteComment: builder.mutation<
      GenericApiReponse,
      CommentId & PlaceId & Token
    >({
      query: ({ token, id, commentId }) => ({
        url: `${endpoint.comments.remove(id, commentId)}`,
        method: "DELETE",
        headers: {
          "x-auth": token,
        },
      }),
      transformResponse: (response: { data: GenericApiReponse }, meta, arg) =>
        response.data,
    }),
    /**
     * Events endpoints
     */
    getEvents: builder.query<FormattedEvent[] | GenericApiReponse, {}>({
      query: () => ({
        url: `${endpoint.events.get}`,
        method: "GET",
      }),
    }),
    createEvent: builder.mutation<GenericApiReponse, EventInsert>({
      query: (body) => ({
        url: `${endpoint.events.create}`,
        method: "POST",
        body,
      }),
    }),
    deleteEvent: builder.mutation<GenericApiReponse, EventDelete>({
      query: (body) => ({
        url: `${endpoint.events.delete}`,
        method: "DELETE",
        body,
      }),
    }),
    joinEvent: builder.mutation<GenericApiReponse, EventJoinAndLeave>({
      query: (body) => ({
        url: `${endpoint.events.join}`,
        method: "POST",
        body,
      }),
    }),
    leaveEvent: builder.mutation<GenericApiReponse, EventJoinAndLeave>({
      query: (body) => ({
        url: `${endpoint.events.leave}`,
        method: "POST",
        body,
      }),
    }),
    requestRoutePlanning: builder.mutation<
      RoutePlannerResponse | GenericApiReponse,
      RoutePlannerRequest
    >({
      query: (params) => ({
        url: `place/${params.placeId}/route`,
        method: "POST",
        body: {
          startLat: params.startLat,
          startLng: params.startLng,
        },
      }),
    }),
    getSpecialties: builder.query<GenericApiReponse | Specialty[], {}>({
      query: () => ({
        url: `${endpoint.specialties.get}`,
        method: "GET",
      }),
    }),
  }),
});

export const placesSlice = createSlice({
  name: "placesSlice",
  initialState,
  reducers: {
    setSpecialties: (state, action: PayloadAction<SpecialtyStore[]>) => {
      state.specialties = action.payload;
    },
  },
});

export const { setSpecialties } = placesSlice.actions;

export const {
  useGetPlacesQuery,
  useGetCommentsQuery,
  useGetFavoritesQuery,
  useAddPlaceMutation,
  useAddCommentMutation,
  useAddFavoriteMutation,
  useDeletePlaceMutation,
  useDeleteCommentMutation,
  useDeleteFavoriteMutation,
  useGetEventsQuery,
  useCreateEventMutation,
  useDeleteEventMutation,
  useJoinEventMutation,
  useLeaveEventMutation,
  useRequestRoutePlanningMutation,
  useGetSpecialtiesQuery,
} = placesApi;
