import React from 'react'
import s from './PeriodWeather.module.css'
import {useGetHourlyForecast4daysQuery} from '@/services/weatherApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { skipToken } from '@reduxjs/toolkit/query'
import PeriodWeatherItem from './PeriodWeatherItem/PeriodWeatherItem'
import { HourlyForecast4days } from '@/services/weatherApi'
import { TimestampForecast } from '@/services/weatherApi'

interface PeriodWeatherProps {
  weatherPeriod:string,
}

export const getDayWeatherData = (forecast4daysData:HourlyForecast4days):TimestampForecast[] =>{
  let dayWeatherData = forecast4daysData?.list.slice(0,8);
  if(dayWeatherData)return dayWeatherData;
  else return [];
}

export const getSecondDayWeatherData = (forecast4daysData:HourlyForecast4days):TimestampForecast[]|[] =>{
  const currentDayNumber = new Date().getDate();
  let secondDayNumber = (currentDayNumber+1)<10?`0${currentDayNumber+1}`:(currentDayNumber+1).toString();
  if(forecast4daysData){
    let secondDayWeatherData = forecast4daysData.list.filter(item=>{
      return(
        item.dt_txt.slice(8,10) === secondDayNumber
      )
    });
    return secondDayWeatherData;
  }else return [];
}

export const getThirdDayWeatherData = (forecast4daysData:HourlyForecast4days):TimestampForecast[]|[] =>{
  const currentDayNumber = new Date().getDate();
  let thirdDayNumber = (currentDayNumber+2)<10?`0${currentDayNumber+2}`:(currentDayNumber+2).toString();
  if(forecast4daysData){
    let thirdDayWeatherData = forecast4daysData.list.filter(item=>{
      return(
        item.dt_txt.slice(8,10) === thirdDayNumber
      )
    });
    return thirdDayWeatherData;
  }else return [];
}

export const getFourthDayWeatherData = (forecast4daysData:HourlyForecast4days):TimestampForecast[]|[] =>{
  const currentDayNumber = new Date().getDate();
  let fourthDayNumber = (currentDayNumber+3)<10?`0${currentDayNumber+3}`:(currentDayNumber+3).toString();
  if(forecast4daysData){
    let fourthDayWeatherData = forecast4daysData.list.filter(item=>{
      return(
        item.dt_txt.slice(8,10) === fourthDayNumber
      )
    });
    return fourthDayWeatherData;
  }else return [];
}

export const getFifthDayWeatherData = (forecast4daysData:HourlyForecast4days):TimestampForecast[]|[] =>{
  const currentDayNumber = new Date().getDate();
  let fifthDayNumber = (currentDayNumber+4)<10?`0${currentDayNumber+4}`:(currentDayNumber+4).toString();
  if(forecast4daysData){
    let fifthDayWeatherData = forecast4daysData.list.filter(item=>{
      return(
        item.dt_txt.slice(8,10) === fifthDayNumber
      )
    });
    return fifthDayWeatherData;
  }else return [];
}

const PeriodWeather:React.FC<PeriodWeatherProps> = ({weatherPeriod}) => {

  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);

  const {data:hourlyForecast4daysData,isLoading:hourlyForecast4daysIsLoading,error:hourlyForecast4daysError}=useGetHourlyForecast4daysQuery(
    selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
  );

  return (
    <div className={s.periodWeather}>
      {hourlyForecast4daysIsLoading&&<p className={s.loadingLabel}>Загрузка...</p>}
      {weatherPeriod==='24h'&&hourlyForecast4daysData&&
        getDayWeatherData(hourlyForecast4daysData).map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}
      {weatherPeriod==='secondDay'&&hourlyForecast4daysData&&
        getSecondDayWeatherData(hourlyForecast4daysData).map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}
      {weatherPeriod==='thirdDay'&&hourlyForecast4daysData&&
        getThirdDayWeatherData(hourlyForecast4daysData).map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}  
      {weatherPeriod==='fourthDay'&&hourlyForecast4daysData&&
        getFourthDayWeatherData(hourlyForecast4daysData).map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}
      {weatherPeriod==='fifthDay'&&hourlyForecast4daysData&&
        getFifthDayWeatherData(hourlyForecast4daysData).map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}        
      
    </div>
  )
}

export default PeriodWeather;
