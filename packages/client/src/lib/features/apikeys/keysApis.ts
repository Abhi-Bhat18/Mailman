import api from "@/lib/api";

const BASE_STRING = "/transactionals";

export const APIKeyAPIs = api.injectEndpoints({
  endpoints: (builder) => ({
    getAPIKeys: builder.query({
      query: (params) => ({
        url: `${BASE_STRING}/api-keys`,
        method: "GET",
        params: params,
      }),
    }),

    generateAPIKey: builder.mutation({
      query: (body) => ({
        url: `${BASE_STRING}/api-key`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGenerateAPIKeyMutation, useGetAPIKeysQuery } = APIKeyAPIs;
