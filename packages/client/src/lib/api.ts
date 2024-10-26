import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:1335";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithSilentRefresh: BaseQueryFn<
  any,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {

    // here I want to hit the refresh token query 
    const refreshResult = await baseQuery('/auth/refresh-token', api , extraOptions);

    if(refreshResult.data) { 
        result = await baseQuery(args, api, extraOptions);
    }else { 
        // call the logout function
    }
  }

  return result;
};

const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithSilentRefresh,
  endpoints: () => ({}),
});

export default api;
