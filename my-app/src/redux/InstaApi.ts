import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = "https://instagram-nrdh.onrender.com/api/";
const BASE_URL = "http://localhost:4444/api/";

export const InstaApis = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include",
  }),

  tagTypes: ["USER", "POST"],
  endpoints: (builder) => ({
    postNewUser: builder.mutation({
      query: (credentials) => ({
        url: "/user-registration",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
      invalidatesTags: ["USER"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/user-login",
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: credentials,
      }),
      invalidatesTags: ["USER"],
    }),

    getAllPosts: builder.query({
      query: ({ skip = 0, limit = 10 }) => `/posts?skip=${skip}&limit=${limit}`,
      providesTags: ["POST"],
    }),
   getUserById:builder.query({
    query: (userId) => ({
      url: `/get-user-profile/${userId}`,
      method: "get",
      params: { userId },
    }),
    providesTags: ["USER"],
   })

  }),
});

// Export hooks generated by createApi for the endpoints
export const {
  usePostNewUserMutation,

  useLoginUserMutation,
  useGetAllPostsQuery,
  useGetUserByIdQuery
} = InstaApis;
