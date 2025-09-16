import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_URL;
import type { CategoryType } from "../model/category.model";
import type { ServiceType } from "../model/service.model";

export type ServicePayload = {
  categoryId: string;
  name: string;
  price: number;
  duration: number;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Category", "Services"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => `/categories`,
      providesTags: ["Category"],
    }),
    getServices: builder.query<ServiceType[], void>({
      query: () => `/services`,
      providesTags: ["Services"],
    }),
    addService: builder.mutation<ServiceType, ServicePayload>({
      query: (data) => ({
        url: `/services`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    updateService: builder.mutation<
      ServiceType,
      { id: string; data: ServicePayload }
    >({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Services"],
    }),
    deleteService: builder.mutation<ServiceType, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = apiSlice;
