import React from 'react'
import s from './FishBite.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { convertKelvinToCelsius,convertHpaToMmHg } from '../../WeatherSide/WeatherContent/WeatherContent'
import { calculateFishBite,getWaterTemperature,getCurrentHourNum,checkRain } from '@/utils/calculateFishBite'
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi'
import { skipToken } from '@reduxjs/toolkit/query'
import { CurrentWeatherData } from '@/services/weatherApi'
import Image from 'next/image'
import { TimestampForecast } from '@/services/weatherApi'
import { FishGroup } from '@/store/fishDataSlice'

interface FishBiteProps {
  weatherData:CurrentWeatherData|TimestampForecast,
  fishGroup:FishGroup,
  size:string
}

export function getKyivHour(dt: number): number {
  const date = new Date(dt * 1000);

  // Переводим дату в киевское время
  const formatter = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  // Получаем строку типа "13:45"
  const [hourStr, minuteStr] = formatter.format(date).split(':');
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (minute >= 30) {
    hour = (hour + 1) % 24; // если 23:45 → станет 0
  }

  return hour;
}

const FishBite:React.FC<FishBiteProps> = ({weatherData,fishGroup,size}) =>{


  //const selectedFishData = useSelector((state:RootState)=>state.fishData.selectedFishData);

  const fishBiteValue = weatherData&& calculateFishBite(fishGroup,getWaterTemperature(convertKelvinToCelsius(weatherData?.main.temp)),convertHpaToMmHg(weatherData?.main.pressure),weatherData?.wind.speed,weatherData?.clouds.all,checkRain(weatherData),getKyivHour(weatherData.dt));
  const fishBiteValueArr = Array.from({ length: fishBiteValue || 0 });
  const idealBiteDifferenceArr = Array.from({ length: 5 - (fishBiteValue || 0) });

  
  return (
    <div className={s.fishBite}>
      
      {
        fishBiteValueArr.map((item,index)=>{
          return(
            <Image src={'/images/opaque_fish.png'} alt='fish bite' height={26} width={26} key={index} className={s[size]}/>
          )
        })
        
      }
      {
        idealBiteDifferenceArr.map((item,index)=>{
          return(
            <Image src={'/images/transparent_fish.png'} alt='fish bite' height={26} width={26} key={index} className={s[size]}/>
          )
        })
      }
    </div>
  )
}

export default FishBite;
