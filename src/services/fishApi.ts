import { FishGroup } from '@/store/fishDataSlice';
import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//type FishGroup = 'peaceful'|'predatory'|'catfish'|'carp'|'northern'
export interface FishData {
  _id?:number,
  id:number,
  name:{
    en:string,
    ru:string,
    ua:string
  },
  description: {
    ru:string,
    ua:string,
  },
  preferred_weather: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  best_fishing_season: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  preferred_bait: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  optimal_water_temperature: number[],
  optimal_pressure: number[],
  image_url: string,
  group:FishGroup
}

export interface FishDataWithBite {
  _id?:number,
  id:number,
  name:{
    en:string,
    ru:string,
    ua:string
  },
  description: {
    ru:string,
    ua:string,
  },
  preferred_weather: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  best_fishing_season: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  preferred_bait: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  optimal_water_temperature: number[],
  optimal_pressure: number[],
  image_url: string,
  group:FishGroup,
  fishBite:number
}

export const fishApi = createApi({
  reducerPath:'fishApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'http://localhost:5000/api/fishes'
  }),
  endpoints:(builder)=>({
    getAllFishes:builder.query<FishData[],void>({
      query:()=>'',
    }),
    getFishById:builder.query<FishData,number>({
      query:(id)=>`/${id}`,
    })
  })
});

export const {useGetAllFishesQuery, useGetFishByIdQuery} = fishApi;