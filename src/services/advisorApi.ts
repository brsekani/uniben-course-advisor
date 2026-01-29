import { baseApi } from "./baseApi";

export const advisorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdvisors: builder.query({
      query: () => "/advisors",
      providesTags: ["Advisors"],
    }),
  }),
});

export const { useGetAdvisorsQuery } = advisorApi;
