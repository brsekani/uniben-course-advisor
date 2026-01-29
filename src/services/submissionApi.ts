import { baseApi } from "./baseApi";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissions: builder.query({
      query: () => "/submissions",
      providesTags: ["Submissions"],
    }),
  }),
});

export const { useGetSubmissionsQuery } = submissionApi;
