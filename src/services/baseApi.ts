import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Courses", "Selection", "Students", "Advisors", "Submissions", "Settings", "Results"],
  endpoints: () => ({}),
});
