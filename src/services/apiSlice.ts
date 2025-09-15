import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_URL;
import type { CategoryType } from "../model/category.model";

export const apiSlice = createApi({
  reducerPath: "apiSlce",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => `/categories`,
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetCategoriesQuery } = apiSlice;
