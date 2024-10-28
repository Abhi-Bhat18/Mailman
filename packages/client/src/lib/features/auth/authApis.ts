import api from "@/lib/api";

export const authAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: body,
      }),
    }),

    checkLogin: builder.query({
      query: () => ({
        url: "/auth/check",
        method: "GET",
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignupMutation, useCheckLoginQuery, useLoginMutation, useLogoutMutation } =
  authAPIs;
