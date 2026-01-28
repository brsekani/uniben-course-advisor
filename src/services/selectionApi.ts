import { baseApi } from "./baseApi";

export const selectionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSelection: builder.query({
      query: () => "/selections",
      providesTags: ["Selection"],
    }),

    addCourse: builder.mutation({
      query: (course) => ({
        url: "/selections",
        method: "POST",
        body: course,
      }),
      invalidatesTags: ["Selection"],
    }),

    removeCourse: builder.mutation({
      query: (id) => ({
        url: `/selections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Selection"],
    }),

    resetSelection: builder.mutation({
      async queryFn(_, { dispatch }) {
        const res = await fetch("http://localhost:4000/selections");
        const data = await res.json();

        await Promise.all(
          data.map((item: any) =>
            fetch(`http://localhost:4000/selections/${item.id}`, {
              method: "DELETE",
            }),
          ),
        );

        dispatch(baseApi.util.invalidateTags(["Selection"]));
        return { data: null };
      },
    }),
  }),
});

export const {
  useGetSelectionQuery,
  useAddCourseMutation,
  useRemoveCourseMutation,
  useResetSelectionMutation,
} = selectionApi;
