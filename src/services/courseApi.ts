import { baseApi } from "./baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Courses"],
    }),
  }),
});

export const { useGetCoursesQuery } = courseApi;
