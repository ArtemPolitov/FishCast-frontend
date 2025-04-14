import React from 'react'
import { TimestampForecast } from '@/services/weatherApi'
import s from './PeriodWeatherItem.module.css'
import Image from 'next/image'
import { convertKelvinToCelsius } from '../../WeatherContent'
import { getKyivHour } from '@/app/components/FishSide/FishBite/FishBite'

interface PeriodWeatherItemProps {
  periodWeatherItemData:TimestampForecast;
}

const PeriodWeatherItem:React.FC<PeriodWeatherItemProps> = ({periodWeatherItemData}) => {
  return (
    <div className={s.periodWeatherItem}>
      <p className={s.time}>{getKyivHour(periodWeatherItemData.dt)<10?`0${getKyivHour(periodWeatherItemData.dt)}:00`:`${getKyivHour(periodWeatherItemData.dt)}:00`}</p>
      <div className={s.weatherIconContainer}><Image src={`https://openweathermap.org/img/wn/${periodWeatherItemData.weather[0].icon}@2x.png`} alt={'weather icon'} height={30} width={30} className={s.weatherIcon}/></div>
      <p className={s.temperature}>{`${convertKelvinToCelsius(periodWeatherItemData.main.temp)}°C`}</p>
      <div className={s.wind}>
        <Image src={'/images/wind_icon.png'} alt='wind icon' height={30} width={30} className={s.windIcon}/>
        <p className={s.windSpeed}>{`${Math.round(periodWeatherItemData.wind.speed)}м/с`}</p>
      </div>
    </div>
  )
}

export default PeriodWeatherItem;
