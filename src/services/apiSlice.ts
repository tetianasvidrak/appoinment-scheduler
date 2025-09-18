import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_URL;
import type { CategoryType } from "../model/category.model";
import type { ServiceType } from "../model/service.model";
import type { ClientPayload, ClientType } from "../model/client.model";

export type ServicePayload = {
  categoryId: string;
  name: string;
  price: number;
  duration: number;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Category", "Services", "Clients"],
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
    getClients: builder.query<ClientType[], void>({
      query: () => `/clients`,
      providesTags: ["Clients"],
    }),
    addClient: builder.mutation<ClientType, ClientPayload>({
      query: (data) => ({
        url: `/clients`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation<
      ClientType,
      { id: string; data: ClientPayload }
    >({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation<ClientType, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetServicesQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetClientsQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = apiSlice;
