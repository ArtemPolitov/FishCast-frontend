import { useGetAllFishesQuery } from '@/services/fishApi';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import build from "next/dist/build";

export interface LocationData {
  _id?:number,
  id:number,
  name:{
    ru:string,
    ua:string
  },
  slug:string,
  coordinates:{
    latitude:number,
    longitude:number
  },
  region:{
    ru:string,
    ua:string,
    region_id:number
  },
  reservoir:{
    name:{
      ru:string,
      ua:string
    },
    type:string
  },
  fish_species:number[],
  accessibility:{
    boat:boolean,
    shore:boolean
  },
  description:{
    ru:string,
    ua:string
  },
  image_url:string
}

export const locationsApi = createApi({
  reducerPath: 'locationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/locations"
  }),
  endpoints: (builder) => ({
    getAllLocations: builder.query<LocationData[], void>({
      query: () => ''
    }),
    getLocationById: builder.query<LocationData, string>({
      query: (id) => `/id/${id}`
    }),
    getLocationBySlug: builder.query<LocationData, string>({
      query: (slug) => `/slug/${slug}`
    }),
  })
});

export const { useGetAllLocationsQuery, useGetLocationByIdQuery, useGetLocationBySlugQuery } = locationsApi;