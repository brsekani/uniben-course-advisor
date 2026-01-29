import { baseApi } from "./baseApi";

export const advisorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdvisors: builder.query({
      query: () => "/advisors",
      providesTags: ["Advisors"],
    }),
    addAdvisor: builder.mutation({
      query: (advisor) => ({
        url: "/advisors",
        method: "POST",
        body: advisor,
      }),
      invalidatesTags: ["Advisors"],
    }),
    updateAdvisor: builder.mutation({
      query: ({ id, ...advisor }) => ({
        url: `/advisors/${id}`,
        method: "PATCH",
        body: advisor,
      }),
      invalidatesTags: ["Advisors"],
    }),
  }),
});

export const {
  useGetAdvisorsQuery,
  useAddAdvisorMutation,
  useUpdateAdvisorMutation,
} = advisorApi;
