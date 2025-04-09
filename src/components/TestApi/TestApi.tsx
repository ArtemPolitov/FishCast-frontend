'use client'

import React from 'react'
import { useSelector } from 'react-redux'
import {useGetCurrentWeatherDataQuery,useGetHourlyForecast4daysQuery} from '@/services/weatherApi'
import { skipToken } from '@reduxjs/toolkit/query';

export default function TestApi() {

  const lat = 48.425185243894205;
  const lon = 35.07917404157999;

  const { data: currentWeatherData, isLoading:currentWeatherDataIsLoading, error:currentWeatherDataError } = useGetCurrentWeatherDataQuery(
    lat && lon ? { lat, lon } : skipToken
  )

  const { data: hourlyForecast4daysData, isLoading:hourlyForecast4daysDataIsLoading, error:hourlyForecast4daysDataError } = useGetHourlyForecast4daysQuery(
    lat && lon ? { lat, lon } : skipToken
  )


  //console.log(`RTKQuery "GetCurrentWeather" test. isLoading: ${currentWeatherDataIsLoading}`);
  //console.log(`RTKQuery "GetCurrentWeather" test. error: ${currentWeatherDataError}`);
  //console.log(`RTKQuery "GetCurrentWeather" test. currentWeatherData: ${currentWeatherData}`);

  console.log(`RTKQuery "GetHourlyForecast4days" test. isLoading: ${hourlyForecast4daysDataIsLoading}`);
  //console.log(`RTKQuery "GetHourlyForecast4days" test. error: ${hourlyForecast4daysDataError}`);
  //console.log(`RTKQuery "GetHourlyForecast4days" test. currentWeatherData: ${hourlyForecast4daysData}`);



  return (
    <div>
    </div>
  )
}
