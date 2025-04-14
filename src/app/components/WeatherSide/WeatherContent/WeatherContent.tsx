import React from 'react'
import s from './WeatherContent.module.css'
import PeriodWeather from './PeriodWeather/PeriodWeather'
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi'
import { useState } from 'react'
import { skipToken } from '@reduxjs/toolkit/query'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { weather_names,weather_descriptions } from './translations'


export const convertKelvinToCelsius = (tempKelvin:number):number =>{
  const tempCelsius = tempKelvin-273;
  return Math.round(tempCelsius);
}

export const convertHpaToMmHg = (pressureHpa:number):number =>{
  const pressureMmHg = pressureHpa/1.33322;
  return Math.round(pressureMmHg);
}

export const getFourNextDays = (): string[] => {
  const weekDays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const fourNextDays: string[] = [];

  for (let i = 1; i < 5; i++) {
    const utcDate = new Date();
    utcDate.setUTCDate(utcDate.getUTCDate() + i);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Kyiv',
    };
    const dateInKyiv = new Date(utcDate.toLocaleString('en-US', options));
    const day = weekDays[dateInKyiv.getDay()];
    fourNextDays.push(`${day} ${dateInKyiv.getDate()}`);
  }

  return fourNextDays;
}

export default function WeatherContent() {
  const [weatherPeriod,setWeatherPeriod] = useState('24h');

  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);


  const {data:currentWeatherData,isLoading:currentWeatherDataIsLoading,error:currentWeatherDataError} = useGetCurrentWeatherDataQuery(
    selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
  );

  const getWindDirection  = (windDegree:number,currentLanguage:string):string|null =>{
    interface WindDirection {
      ru:null|string,
      ua:null|string
    }

    let windDirection:WindDirection = {
      ru:null,
      ua:null
    };

    if(windDegree>=0&&windDegree<=45){
      windDirection.ru = "северный";
      windDirection.ua = "північний";
    }else if(windDegree>=45&&windDegree<=90){
      windDirection.ru = "северо-восточный";
      windDirection.ua = "північно-східний";
    }else if(windDegree>=90&&windDegree<=135){
      windDirection.ru = "восточный";
      windDirection.ua = "східний";
    }else if(windDegree>=135&&windDegree<=180){
      windDirection.ru = "юго-восточный";
      windDirection.ua = "південно-східний";
    }else if(windDegree>=180&&windDegree<=225){
      windDirection.ru = "южный";
      windDirection.ua = "південний";
    }else if(windDegree>=225&&windDegree<=270){
      windDirection.ru = "юго-западный";
      windDirection.ua = "південно-західний";
    }else if(windDegree>=270&&windDegree<=315){
      windDirection.ru = "западный";
      windDirection.ua = "західний";
    }else if(windDegree>=315&&windDegree<=360){
      windDirection.ru = "северо-западный";
      windDirection.ua = "північно-західний";
    }

    return currentLanguage==="ru"?windDirection.ru:windDirection.ua;
  }

  const fourNextDays:string[] = getFourNextDays();

  const dayWeatherHandler = () =>{
    setWeatherPeriod('24h');
  }

  const secondDayWeatherHandler = () =>{
    setWeatherPeriod('secondDay');
  }

  const thirdDayWeatherHandler = () =>{
    setWeatherPeriod('thirdDay');
  }

  const fourthDayWeatherHandler = () =>{
    setWeatherPeriod('fourthDay');
  }

  const fifthDayWeatherHandler = () =>{
    setWeatherPeriod('fifthDay');
  }

  return (
    <div className={s.weatherContent}>
      <div className={s.currentWeather}>
        {currentWeatherDataIsLoading&&
          <p className={s.currentWeatherLoading}>Загрузка...</p>
        }
        {currentWeatherData&&
          <div className={s.currentWeatherContent}>
            <div className={s.leftColumn}>
              <div className={s.iconTempRow}>
                <Image src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt='weather_img'width=   {100} height={100} className={s.currentWeatherImg}/>
                <p className={s.currentTemperature}>{`${convertKelvinToCelsius(currentWeatherData.main.temp)}°C`}</p>
              </div>
              <p className={s.weatherTitle}>{weather_names[`${currentWeatherData.weather[0].main as keyof typeof weather_names}`].ru}</p>
              {weather_descriptions[`${currentWeatherData.weather[0].description as keyof typeof weather_descriptions}`]&&<p className={s.weatherDescription}>{weather_descriptions[`${currentWeatherData.weather[0].description as keyof typeof weather_descriptions}`].ru}</p>}
            </div>
            <div className={s.rightColumn}>
              <div className={s.rightColumnItem}>
                <Image src={`/images/temperature_feels_like_icon.png`} alt='feels like' height={50} width={50} className={s.rightColumnIcon}/>
                <p>{`${convertKelvinToCelsius(currentWeatherData.main.feels_like)}°C`}</p>
              </div>
              <div className={s.rightColumnItem}>
                <Image src={`/images/pressure_icon.png`} alt='pressure' height={50} width={50} className={s.rightColumnIcon}/>
                <p>{`${convertHpaToMmHg(currentWeatherData.main.pressure)} мм рт. ст.`}</p>
              </div>
              <div className={s.rightColumnItem}>
                <Image src={`/images/wind_icon.png`} alt='wind' height={50} width={50} className={s.rightColumnIcon}/>
                <p>{`${Math.round(currentWeatherData.wind.speed)} м/с, ${getWindDirection(currentWeatherData.wind.deg,"ru")}`}</p>
              </div>
              <div className={s.rightColumnItem}>
                <Image src={`/images/cloudiness_icon.png`} alt='cloudiness' height={50} width={50} className={s.rightColumnIcon}/>
                <p>{`${currentWeatherData.clouds.all}%`}</p>
              </div>
              <div className={s.rightColumnItem}>
                <Image src={`/images/humidity_icon.png`} alt='humidity' height={50} width={50} className={s.rightColumnIcon}/>
                <p>{`${currentWeatherData.main.humidity}%`}</p>
              </div>
            </div>
          </div>
        }
      </div>
      <div className={s.periodWeatherBlock}>
        <div className={s.periodWeatherButtons}>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='24h'?s.activeButton:''}`} onClick={dayWeatherHandler}>24 ч</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='secondDay'?s.activeButton:''}`} onClick={secondDayWeatherHandler}>{fourNextDays[0]}</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='thirdDay'?s.activeButton:''}`} onClick={thirdDayWeatherHandler}>{fourNextDays[1]}</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='fourthDay'?s.activeButton:''}`} onClick={fourthDayWeatherHandler}>{fourNextDays[2]}</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='fifthDay'?s.activeButton:''}`} onClick={fifthDayWeatherHandler}>{fourNextDays[3]}</button>
        </div>
        <PeriodWeather weatherPeriod={weatherPeriod}/>
      </div>
    </div>
  )
}


