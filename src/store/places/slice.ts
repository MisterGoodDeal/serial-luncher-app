import { createApi } from "@reduxjs/toolkit/query/react";
import { endpoint, reducerPath } from "./constants";
import {
  CreatePlace,
  PlaceId,
  GetPlaces,
  Place,
  AddComment,
  Comment,
  CommentId,
} from "@store/model/places";
import { GenericApiReponse, Token } from "@store/model/application";
import { baseQuery } from "@store/api";

export const placesApi = createApi({
  reducerPath,
  baseQuery,
  tagTypes: ["Places", "Favorites"],
  endpoints: (builder) => ({
    /**
     * Place endpoints
     */
    getPlaces: builder.query<Place[] | GenericApiReponse, GetPlaces & Token>({
      query: ({ group_key }) => ({
        url: `${endpoint.places.get}/${group_key}`,
        method: "GET",
      }),
      providesTags: (_result, _error, { group_key }) => [
        { type: "Places", id: group_key },
      ],
    }),
    addPlace: builder.mutation<Place | GenericApiReponse, CreatePlace & Token>({
      query: ({ token, ...place }) => ({
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
      AddComment & PlaceId & Token
    >({
      query: ({ token, id, ...comment }) => ({
        url: `${endpoint.favorites.add(id)}`,
        method: "POST",
        body: comment,
        headers: {
          "x-auth": token,
        },
      }),
      transformResponse: (
        response: { data: Comment | GenericApiReponse },
        meta,
        arg
      ) => response.data,
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
  }),
});

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
} = placesApi;
