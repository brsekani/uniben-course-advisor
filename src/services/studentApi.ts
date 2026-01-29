import { baseApi } from "./baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      providesTags: ["Students"],
    }),
    updateStudent: builder.mutation({
      query: ({ id, ...student }) => ({
        url: `/students/${id}`,
        method: "PATCH",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const { useGetStudentsQuery, useUpdateStudentMutation } = studentApi;
