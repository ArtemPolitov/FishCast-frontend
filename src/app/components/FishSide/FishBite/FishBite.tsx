import React from 'react'
import s from './FishBite.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { convertKelvinToCelsius,convertHpaToMmHg } from '../../WeatherSide/WeatherContent/WeatherContent'
import { calculateFishBite,getWaterTemperature,checkRain } from '@/utils/calculateFishBite'
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

  // Перевод в киевское время
  const formatter = new Intl.DateTimeFormat('uk-UA', {
    timeZone: 'Europe/Kyiv',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  const [hourStr, minuteStr] = formatter.format(date).split(':');
  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (minute >= 30) {
    hour = (hour + 1) % 24; 
  }

  return hour;
}

const FishBite:React.FC<FishBiteProps> = ({weatherData,fishGroup,size}) =>{
  const fishBiteValue = weatherData&& calculateFishBite(fishGroup,getWaterTemperature(convertKelvinToCelsius(weatherData?.main.temp)),convertHpaToMmHg(weatherData?.main.pressure),weatherData?.wind.speed,weatherData?.clouds.all,checkRain(weatherData),getKyivHour(weatherData.dt));
  const fishBiteValueArr = Array.from({ length: fishBiteValue || 0 });
  const idealBiteDifferenceArr = Array.from({ length: 5 - (fishBiteValue || 0) });
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);

  return (
    <div className={s.fishBite}>
      {
        fishBiteValueArr.map((item,index)=>{
          return(
            currentTheme==='light'?
            <Image src={'/images/opaque_fish.png'} alt='fish bite' height={26} width={26} key={index} className={s[size]}/>:
            <Image src={'/images/opaque_fish_dark.png'} alt='fish bite' height={26} width={26} key={index} className={s[size]}/>
          )
        })  
      }
      {
        idealBiteDifferenceArr.map((item,index)=>{
          return(
            currentTheme==='light'?
            <Image src={'/images/transparent_fish.png'} alt='fish bite' height={26} width={26} key={index} className={s[size]}/>:
            <Image src={'/images/transparent_fish_dark.png'} alt='fish bite' height={26} width={26} key={index} className={s[size]}/>
          )
        })
      }
    </div>
  )
}

export default FishBite;
