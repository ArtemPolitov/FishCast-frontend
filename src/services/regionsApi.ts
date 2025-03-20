import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const regionsApi = createApi({
  reducerPath: "regionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", // Базовый URL
  }),
  endpoints: (builder) => ({
    getRegions: builder.query<any[], void>({  // Запрос для получения регионов
      query: () => "regions",  // Эндпоинт: /regions
    }),
  }),
});

export const { useGetRegionsQuery } = regionsApi;