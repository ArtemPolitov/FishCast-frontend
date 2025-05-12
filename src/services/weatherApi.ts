import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = 'e341961d0d0fda13f8601a5248720bd3';

interface RainData {
  '1h'?: number;
  '3h'?: number;
};

export interface CurrentWeatherData {
  coord:{
    lon:number,
    lat:number
  },
  weather:{
    id:number,
    main:string,
    description:string,
    icon:string
  }[],
  base:string,
  main:{
    temp:number,
    feels_like:number,
    temp_min:number,
    temp_max:number,
    pressure:number,
    humidity:number,
    sea_level:number,
    grnd_level:number,
  },
  visibility:number,
  wind:{
    speed:number,
    deg:number,
    gust?:number
  },
  rain?:RainData,
  snow?:{
    "1h":number,
  }
  clouds:{
    all:number,
  },
  dt:number,
  sys:{
    type:number,
    id:number,
    country:string,
    sunrise:number,
    sunset:number
  },
  timezone:number,
  id:number,
  name:string,
  cod:number
}

export interface TimestampForecast {
  dt: number; 
  main: {
    temp: number; 
    feels_like: number;
    temp_min: number;
    temp_max: number; 
    pressure: number; 
    sea_level: number; 
    grnd_level: number;
    humidity: number; 
    temp_kf: number; 
  };
  weather: {
    id: number; 
    main: string; 
    description: string; 
    icon: string; 
  }[];
  clouds: {
    all: number; 
  };
  wind: {
    speed: number;
    deg: number; 
    gust: number; 
  };
  visibility: number; 
  pop: number; 
  rain?:RainData,
  snow?: {
    '3h': number; 
  };
  sys: {
    pod: 'd' | 'n'; 
  };
  dt_txt: string; 
}

export interface HourlyForecast4days {
  cod: string; 
  message: number; 
  cnt: number; 
  list: TimestampForecast[];
  city: {
    id: number; 
    name: string; 
    coord: {
      lat: number; 
      lon: number; 
    };
    country: string; 
    population: number; 
    timezone: number; 
    sunrise: number; 
    sunset: number; 
  };
}

export const weatherApi = createApi({
  reducerPath:'weatherApi',
  baseQuery:fetchBaseQuery({
    baseUrl:'https://api.openweathermap.org/data/2.5/'
  }),
  endpoints:(builder)=>({
    getCurrentWeatherData:builder.query<CurrentWeatherData,{lat:number,lon:number}>({
      query: ({ lat, lon })=> `weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
    }),
    getHourlyForecast4days:builder.query<HourlyForecast4days,{lat:number,lon:number}>({
      query: ({lat,lon}) => `forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`
    })
  })
});

export const {useGetCurrentWeatherDataQuery,useGetHourlyForecast4daysQuery} = weatherApi;