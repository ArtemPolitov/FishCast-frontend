import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = 'e341961d0d0fda13f8601a5248720bd3';

interface CurrentWeatherData {
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
  rain?:{
    "1h":number,
  },
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

interface HourlyForecast4days {
  cod: string; // Код ответа
  message: number; // Сообщение
  cnt: number; // Количество временных точек
  list: {
    dt: number; // Время прогноза, Unix timestamp
    main: {
      temp: number; // Температура (по умолчанию в Кельвинах)
      feels_like: number; // Ощущаемая температура
      temp_min: number; // Минимальная температура
      temp_max: number; // Максимальная температура
      pressure: number; // Давление на уровне моря
      sea_level: number; // Давление на уровне моря
      grnd_level: number; // Давление на уровне земли
      humidity: number; // Влажность (%)
      temp_kf: number; // Внутренний параметр
    };
    weather: {
      id: number; // ID погодных условий
      main: string; // Группа погодных условий (например, дождь, снег и т.д.)
      description: string; // Описание погодных условий
      icon: string; // Иконка погоды
    }[];
    clouds: {
      all: number; // Облачность в %
    };
    wind: {
      speed: number; // Скорость ветра (м/с)
      deg: number; // Направление ветра (в градусах)
      gust: number; // Порывы ветра (м/с)
    };
    visibility: number; // Видимость (в метрах)
    pop: number; // Вероятность осадков (от 0 до 1)
    rain?: {
      '3h': number; // Объем дождя за последние 3 часа (в мм)
    };
    snow?: {
      '3h': number; // Объем снега за последние 3 часа (в мм)
    };
    sys: {
      pod: 'd' | 'n'; // Часть дня (d - день, n - ночь)
    };
    dt_txt: string; // Время прогноза в ISO формате
  }[];
  city: {
    id: number; // ID города
    name: string; // Название города
    coord: {
      lat: number; // Широта города
      lon: number; // Долгота города
    };
    country: string; // Код страны
    population: number; // Население города
    timezone: number; // Часовой пояс города (в секундах от UTC)
    sunrise: number; // Время восхода солнца (Unix timestamp)
    sunset: number; // Время захода солнца (Unix timestamp)
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