import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_URL;
import type { CategoryType } from "../model/category.model";
import type { ServiceType } from "../model/service.model";
import type { ClientPayload, ClientType } from "../model/client.model";
import type { VisitPayload, VisitType } from "../model/visit.model";
import type { EmployeeType } from "../model/employee.model";

export type ServicePayload = {
  category: string;
  name: string;
  price: number;
  duration: number;
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Categories", "Services", "Clients", "Visits", "Employees"],
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryType[], void>({
      query: () => `/categories`,
      providesTags: ["Categories"],
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
    getVisits: builder.query<VisitType[], { date?: string }>({
      query: ({ date }) => {
        const params = new URLSearchParams();
        if (date) {
          params.append("date", date);
        }

        return {
          url: `/visits?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["Visits"],
    }),
    addVisit: builder.mutation<VisitType, VisitPayload>({
      query: (data) => ({
        url: `/visits`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Visits"],
    }),
    updateVisit: builder.mutation<
      VisitType,
      { id: string; data: VisitPayload }
    >({
      query: ({ id, data }) => ({
        url: `/visits/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Visits"],
    }),
    getEmployees: builder.query<EmployeeType[], void>({
      query: () => `/employees`,
      providesTags: ["Employees"],
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
  useGetVisitsQuery,
  useAddVisitMutation,
  useUpdateVisitMutation,
  useGetEmployeesQuery,
} = apiSlice;
