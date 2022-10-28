import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb";

export const placeholderApi = createApi({
  reducerPath: "placeholderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ id }) => `/data/${id}`,
    }),
    usersList: builder.query({
      query: () => `/data`,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `data/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: ({ data }) => ({
        url: `data`,
        method: "POST",
        body: data,
      }),
    }),
    removeUser: builder.mutation({
      query: ({ id }) => ({
        url: `data/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUsersListQuery,
  useUpdateUserMutation,
  useCreateUserMutation,
  useRemoveUserMutation,
} = placeholderApi;
