import React from 'react'
import s from './PeriodWeather.module.css'
import {useGetHourlyForecast4daysQuery} from '@/services/weatherApi'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { skipToken } from '@reduxjs/toolkit/query'
import PeriodWeatherItem from './PeriodWeatherItem/PeriodWeatherItem'

interface PeriodWeatherProps {
  weatherPeriod:string,
}

export interface PeriodWeatherItemData {
  dt:number,
  main:{
    temp:number,
    feels_like:number,
    temp_min:number,
    temp_max:number,
    pressure:number,
    sea_level:number,
    grnd_level:number,
    humidity:number,
    temp_kf:number
  },
  weather:{
    id:number,
    main:string,
    description:string,
    icon:string
  }[],
  clouds:{
    all:number
  },
  wind:{
    speed:number,
    deg:number,
    gust:number
  },
  visibility:number,
  pop:number,
  sys:{
    pod:string
  },
  dt_txt:string
}

const PeriodWeather:React.FC<PeriodWeatherProps> = ({weatherPeriod}) => {

  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);

  const {data:hourlyForecast4daysData,isLoading:hourlyForecast4daysIsLoading,error:hourlyForecast4daysError}=useGetHourlyForecast4daysQuery(
    selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
  );

  const currentDayNumber = new Date().getDate();

  const getDayWeatherData = ():PeriodWeatherItemData[] =>{
    let dayWeatherData = hourlyForecast4daysData?.list.slice(0,8);
    if(dayWeatherData)return dayWeatherData;
    else return [];
  }

  const getSecondDayWeatherData = ():PeriodWeatherItemData[]|[] =>{
    let secondDayNumber = (currentDayNumber+1)<10?`0${currentDayNumber+1}`:(currentDayNumber+1).toString();
    if(hourlyForecast4daysData){
      let secondDayWeatherData = hourlyForecast4daysData.list.filter(item=>{
        return(
          item.dt_txt.slice(8,10) === secondDayNumber
        )
      });
      return secondDayWeatherData;
    }else return [];
  }

  const getThirdDayWeatherData = ():PeriodWeatherItemData[]|[] =>{
    let thirdDayNumber = (currentDayNumber+2)<10?`0${currentDayNumber+2}`:(currentDayNumber+2).toString();
    if(hourlyForecast4daysData){
      let thirdDayWeatherData = hourlyForecast4daysData.list.filter(item=>{
        return(
          item.dt_txt.slice(8,10) === thirdDayNumber
        )
      });
      return thirdDayWeatherData;
    }else return [];
  }

  const getFourthDayWeatherData = ():PeriodWeatherItemData[]|[] =>{
    let fourthDayNumber = (currentDayNumber+3)<10?`0${currentDayNumber+3}`:(currentDayNumber+3).toString();
    if(hourlyForecast4daysData){
      let fourthDayWeatherData = hourlyForecast4daysData.list.filter(item=>{
        return(
          item.dt_txt.slice(8,10) === fourthDayNumber
        )
      });
      return fourthDayWeatherData;
    }else return [];
  }

  const getFifthDayWeatherData = ():PeriodWeatherItemData[]|[] =>{
    let fifthDayNumber = (currentDayNumber+4)<10?`0${currentDayNumber+4}`:(currentDayNumber+4).toString();
    if(hourlyForecast4daysData){
      let fifthDayWeatherData = hourlyForecast4daysData.list.filter(item=>{
        return(
          item.dt_txt.slice(8,10) === fifthDayNumber
        )
      });
      return fifthDayWeatherData;
    }else return [];
  }

  return (
    <div className={s.periodWeather}>
      {hourlyForecast4daysIsLoading&&<p className={s.loadingLabel}>Загрузка...</p>}
      {weatherPeriod==='24h'&&
        getDayWeatherData().map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}
      {weatherPeriod==='secondDay'&&
        getSecondDayWeatherData().map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}
      {weatherPeriod==='thirdDay'&&
        getThirdDayWeatherData().map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}  
      {weatherPeriod==='fourthDay'&&
        getFourthDayWeatherData().map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}
      {weatherPeriod==='fifthDay'&&
        getFifthDayWeatherData().map(weatherItem=>{
          return(
            <PeriodWeatherItem key={weatherItem.dt} periodWeatherItemData={weatherItem}/>
          )
      })}        
      
    </div>
  )
}

export default PeriodWeather;
