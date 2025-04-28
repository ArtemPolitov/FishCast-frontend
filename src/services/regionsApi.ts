import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SelectedRegionData } from "@/store/regionsDataSlice";

export const regionsApi = createApi({
  reducerPath: "regionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/", // Базовый URL
  }),
  endpoints: (builder) => ({
    getRegions: builder.query<any[], void>({  // Запрос для получения регионов
      query: () => "regions",  // Эндпоинт: /regions
    }),
    getRegionById: builder.query<SelectedRegionData,number>({
      query:(id)=>`regions/${id}`,
    })
  }),
});

export const { useGetRegionsQuery,useGetRegionByIdQuery } = regionsApi;