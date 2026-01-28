import { baseApi } from "./baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      providesTags: ["Students"],
    }),
  }),
});

export const { useGetStudentsQuery } = studentApi;
