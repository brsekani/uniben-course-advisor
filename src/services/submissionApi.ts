import { baseApi } from "./baseApi";

export const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubmissions: builder.query({
      query: () => "/submissions",
      providesTags: ["Submissions"],
    }),
    addSubmission: builder.mutation({
      query: (submission) => ({
        url: "/submissions",
        method: "POST",
        body: submission,
      }),
      invalidatesTags: ["Submissions"],
    }),
    updateSubmission: builder.mutation({
      query: ({ id, ...submission }) => ({
        url: `/submissions/${id}`,
        method: "PATCH",
        body: submission,
      }),
      invalidatesTags: ["Submissions"],
    }),
  }),
});

export const {
  useGetSubmissionsQuery,
  useAddSubmissionMutation,
  useUpdateSubmissionMutation,
} = submissionApi;
