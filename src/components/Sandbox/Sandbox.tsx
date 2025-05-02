'use client'
import React from 'react'
import { calculateFishBite,getWaterTemperature,getCurrentHourNum,checkRain } from '@/utils/calculateFishBite'
import { getKyivHour } from '@/app/components/FishSide/FishBite/FishBite'
import { useGetAllFishesQuery } from '@/services/fishApi'
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { skipToken } from '@reduxjs/toolkit/query';
import { convertKelvinToCelsius } from '@/app/components/WeatherSide/WeatherContent/WeatherContent'
import { convertHpaToMmHg } from '@/app/components/WeatherSide/WeatherContent/WeatherContent'
import { getDistanceKm } from '../BottomSidebar/BottomSidebar'


export default function Sandbox() {
  const {data:fishesData} = useGetAllFishesQuery();
  const selectedCityLat = 48.4647;
  const selectedCityLon = 35.0462;
  const {data:currentWeatherData,isLoading:currentWeatherDataIsLoading,error:currentWeatherDataError} =useGetCurrentWeatherDataQuery(
    selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
  );

  //console.log(`Тест функции измеряющшей дистанцию между координатами: ${Math.round(getDistanceKm(48.4647, 35.0462, 48.468706, 35.//058357))}`);

  //const kyivHour = getKyivHour(1744686000)
  //currentWeatherData&&console.log(`Температура воды: ${getWaterTemperature(convertKelvinToCelsius(currentWeatherData?.main.temp))}`);
  //currentWeatherData&&console.log(`Давление: ${convertHpaToMmHg(currentWeatherData.main.pressure)}`);
  //currentWeatherData&&console.log(`Скорость ветра: ${currentWeatherData.wind.speed}`);
  //currentWeatherData&&console.log(`Облачность: ${currentWeatherData.clouds.all}`);
  //currentWeatherData&&console.log(`Легкий дождь: ${checkRain(currentWeatherData)}`);
  //currentWeatherData&&console.log(`Киевское время: ${getKyivHour(currentWeatherData.dt)}`);
  
  

  //currentWeatherData&&console.log(`Уровень клева: ${calculateFishBite('bleak',getWaterTemperature(convertKelvinToCelsius//(currentWeatherData?.main.temp)),convertHpaToMmHg(currentWeatherData.main.pressure),currentWeatherData.wind.speed,//currentWeatherData.clouds.all,checkRain(currentWeatherData),getKyivHour(currentWeatherData.dt))}`);

  return (
    <div>
      
    </div>
  )
}
