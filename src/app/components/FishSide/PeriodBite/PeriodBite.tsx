import React from 'react'
import FishBite from '../FishBite/FishBite'
import { getDayWeatherData,getSecondDayWeatherData,getThirdDayWeatherData,getFourthDayWeatherData,getFifthDayWeatherData } from '../../WeatherSide/WeatherContent/PeriodWeather/PeriodWeather'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { useGetHourlyForecast4daysQuery } from '@/services/weatherApi'
import { skipToken } from '@reduxjs/toolkit/query'
import s from './PeriodBite.module.css'
import { getKyivHour } from '../FishBite/FishBite'

interface PeriodBiteProps {
  bitePeriod:string
}

const PeriodBite:React.FC<PeriodBiteProps> = ({bitePeriod}) =>{

  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);
  const selectedFishData = useSelector((state:RootState)=>state.fishData.selectedFishData);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);

  const {data:hourlyForecast4daysData,isLoading:hourlyForecast4daysIsLoading,error:hourlyForecast4daysError}=useGetHourlyForecast4daysQuery(
      selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
    );
    
  return (
    <div className={s.periodBite}>
      {
        hourlyForecast4daysIsLoading&&<p className={s.label}>{currentLanguage==='ru'?'Загрузка...':'Завантаження...'}</p>
      }
      {
        hourlyForecast4daysError&&<p className={s.label}>{currentLanguage==='ru'?'Ошибка загрузки данных':'Помилка завантаження даних'}</p>
      }
      {
        bitePeriod==='24h'&&hourlyForecast4daysData&&selectedFishData&&
          getDayWeatherData(hourlyForecast4daysData).map(item=>{
            return(
              <div className={s.periodBiteCard} key={item.dt}>
                <p className={s.time}>{getKyivHour(item.dt)<10?`0${getKyivHour(item.dt)}:00`:`${getKyivHour(item.dt)}:00`}</p>
                <FishBite weatherData={item} fishGroup={selectedFishData?.group} size='smallSize'/>
              </div>
            )
          })
      }
      {
        bitePeriod==='secondDay'&&hourlyForecast4daysData&&selectedFishData&&
        getSecondDayWeatherData(hourlyForecast4daysData).map(item=>{
            return(
              <div className={s.periodBiteCard} key={item.dt}>
                <p className={s.time}>{getKyivHour(item.dt)<10?`0${getKyivHour(item.dt)}:00`:`${getKyivHour(item.dt)}:00`}</p>
                <FishBite weatherData={item} fishGroup={selectedFishData?.group} size='smallSize'/>
              </div>
              
            )
          })
      }
      {
        bitePeriod==='thirdDay'&&hourlyForecast4daysData&&selectedFishData&&
        getThirdDayWeatherData(hourlyForecast4daysData).map(item=>{
            return(
              <div className={s.periodBiteCard} key={item.dt}>
                <p className={s.time}>{getKyivHour(item.dt)<10?`0${getKyivHour(item.dt)}:00`:`${getKyivHour(item.dt)}:00`}</p>
                <FishBite weatherData={item} fishGroup={selectedFishData.group} size='smallSize'/>
              </div>
              
            )
          })
      }
      {
        bitePeriod==='fourthDay'&&hourlyForecast4daysData&&selectedFishData&&
        getFourthDayWeatherData(hourlyForecast4daysData).map(item=>{
            return(
              <div className={s.periodBiteCard} key={item.dt}>
                <p className={s.time}>{getKyivHour(item.dt)<10?`0${getKyivHour(item.dt)}:00`:`${getKyivHour(item.dt)}:00`}</p>
                <FishBite weatherData={item} fishGroup={selectedFishData.group} size='smallSize'/>
              </div>
              
            )
          })
      }
      {
        bitePeriod==='fifthDay'&&hourlyForecast4daysData&&selectedFishData&&
        getFifthDayWeatherData(hourlyForecast4daysData).map(item=>{
            return(
              <div className={s.periodBiteCard} key={item.dt}>
                <p className={s.time}>{getKyivHour(item.dt)<10?`0${getKyivHour(item.dt)}:00`:`${getKyivHour(item.dt)}:00`}</p>
                <FishBite weatherData={item} fishGroup={selectedFishData.group} size='smallSize'/>
              </div>
            )
          })
      }
    </div>
  )
}

export default PeriodBite;
