import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", // Базовый URL
  }),
  endpoints: (builder) => ({
    getRegions: builder.query<any[], void>({  // Запрос для получения регионов
      query: () => "regions",  // Эндпоинт: /regions
    }),
  }),
});

export const { useGetRegionsQuery } = api;