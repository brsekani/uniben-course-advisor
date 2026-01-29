import { baseApi } from "./baseApi";

export const resultsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getResults: builder.query({
      query: () => "/results",
      providesTags: ["Results"],
    }),
  }),
});

export const { useGetResultsQuery } = resultsApi;
