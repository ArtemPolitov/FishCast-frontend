import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface City {
  _id: string;
  name: string;
  lat: number;
  lon: number;
  region_id: number;
  name_uk: string;
  name_en: string;
  id: number;
}

export const cityApi = createApi({
  reducerPath:'cityApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'http://localhost:5000/api/cities',
  }),
  endpoints:(builder)=>({
    getAllCities: builder.query<City[], void>({
      query: () => '', 
    }),
    getCityById: builder.query<City, number>({  
      query: (id) => `/${id}`,  
    }),
    getCitiesByRegionId: builder.query<City[],number>({
      query: (id) => `/by-region/${id}`
    })
  })
}); 

export const {useGetCityByIdQuery,useGetAllCitiesQuery,useGetCitiesByRegionIdQuery} = cityApi;