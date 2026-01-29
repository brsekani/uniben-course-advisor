import { API_BASE_URL, baseApi } from "./baseApi";

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
        const userId = localStorage.getItem("userId");
        const res = await fetch(`${API_BASE_URL}/selections`);
        const data = await res.json();

        await Promise.all(
          data
            .filter(
              (item: any) =>
                !item.studentId ||
                String(item.studentId) === String(userId),
            )
            .map((item: any) =>
              fetch(`${API_BASE_URL}/selections/${item.id}`, {
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
