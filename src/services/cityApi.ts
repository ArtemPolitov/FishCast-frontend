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
    getCityById: builder.query<City, number>({  
      query: (id) => `${id}`,  
    }),
  })
}); 

export const {useGetCityByIdQuery} = cityApi;