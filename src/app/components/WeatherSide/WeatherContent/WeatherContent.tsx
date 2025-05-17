import React, { useEffect } from 'react'
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

export const getFourNextDaysRu = (): string[] => {
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const fourNextDaysRu: string[] = [];

  for (let i = 1; i < 5; i++) {
    const utcDate = new Date();
    utcDate.setUTCDate(utcDate.getUTCDate() + i);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Kyiv',
    };
    const dateInKyiv = new Date(utcDate.toLocaleString('en-US', options));
    const day = weekDays[dateInKyiv.getDay()];
    fourNextDaysRu.push(`${day} ${dateInKyiv.getDate()}`);
  }

  return fourNextDaysRu;
}

export const getFourNextDaysUa = (): string[] => {
  const weekDaysUa = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const fourNextDaysUa: string[] = [];

  for (let i = 1; i < 5; i++) {
    const utcDate = new Date();
    utcDate.setUTCDate(utcDate.getUTCDate() + i);

    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Europe/Kyiv',
    };
    const dateInKyiv = new Date(utcDate.toLocaleString('en-US', options));
    const day = weekDaysUa[dateInKyiv.getDay()];
    fourNextDaysUa.push(`${day} ${dateInKyiv.getDate()}`);
  }

  return fourNextDaysUa;
}

export default function WeatherContent() {
  const [weatherPeriod,setWeatherPeriod] = useState('24h');
  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);
  const {data:currentWeatherData,isLoading:currentWeatherDataIsLoading,error:currentWeatherDataError} = useGetCurrentWeatherDataQuery(
    selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
  );

  interface WindDirection {
    ru:null|string,
    ua:null|string
  }

  const getWindDirection  = (windDegree:number):WindDirection =>{
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


    return windDirection;
  }

  const fourNextDaysRu:string[] = getFourNextDaysRu();
  const fourNextDaysUa:string[] = getFourNextDaysUa();

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
  
  const date = new Date();
  const [currentDate,setCurrentDate] = useState<Date>(date);

  useEffect(()=>{
    const interval = setInterval(()=>{
      const date = new Date();
      setCurrentDate(date);
    },1000);
    return() => clearInterval(interval);
  },[]);

  function getCorrectDate (currentDate:Date) {
    const padStart = (value:number):string =>{
      return value<10?`0${value}`:`${value}`;
    }
    const currentDay = padStart(currentDate.getDate());
    const currentMonth = padStart(currentDate.getMonth() + 1);
    const currentYear = currentDate.getFullYear();
    const currentHour = padStart(currentDate.getHours());
    const currentMinutes = padStart(currentDate.getMinutes());
    const currentSeconds = padStart(currentDate.getSeconds());
    const correctDate = `${currentDay}.${currentMonth}.${currentYear} | ${currentHour}:${currentMinutes}:${currentSeconds}`;
    return correctDate;
  }

  return (
    <div className={s.weatherContent}>
      <div className={s.currentWeather}>

        {
          currentWeatherDataError&&
          <p className={s.currentWeatherLoading}>{currentLanguage==='ru'?'Ошибка загрузки данных':'Помилка завантаження даних'}</p>
        }
        {currentWeatherData&&
          <div className={s.currentWeatherContent}>
            <div className={s.leftColumn}>
              <p className={s.dateTime}>{currentDate&&getCorrectDate(currentDate)}</p>
              <div className={s.iconTempRow}>
                <Image src={`https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`} alt='weather_img'width=   {100} height={100} className={s.currentWeatherImg}/>
                <p className={s.currentTemperature}>{`${convertKelvinToCelsius(currentWeatherData.main.temp)}°C`}</p>
              </div>
              <p className={s.weatherTitle}>{currentLanguage==='ru'?weather_names[`${currentWeatherData.weather[0].main as keyof typeof weather_names}`].ru:weather_names[`${currentWeatherData.weather[0].main as keyof typeof weather_names}`].ua}</p>
              {weather_descriptions[`${currentWeatherData.weather[0].description as keyof typeof weather_descriptions}`]&&<p className={s.weatherDescription}>{currentLanguage==='ru'?weather_descriptions[`${currentWeatherData.weather[0].description as keyof typeof weather_descriptions}`].ru:weather_descriptions[`${currentWeatherData.weather[0].description as keyof typeof weather_descriptions}`].ua}</p>}
            </div>
            {
              currentTheme==='light'?
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
                  <p>{`${Math.round(currentWeatherData.wind.speed)} м/с, ${currentLanguage==='ru'?getWindDirection(currentWeatherData.wind.deg).ru:getWindDirection(currentWeatherData.wind.deg).ua}`}</p>
                </div>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/cloudiness_icon.png`} alt='cloudiness' height={50} width={50} className={s.rightColumnIcon}/>
                  <p>{`${currentWeatherData.clouds.all}%`}</p>
                </div>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/humidity_icon.png`} alt='humidity' height={50} width={50} className={s.rightColumnIcon}/>
                  <p>{`${currentWeatherData.main.humidity}%`}</p>
                </div>
              </div>:
              <div className={s.rightColumn}>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/temperature_feels_like_icon_dark.png`} alt='feels like' height={50} width={50} className={s.   rightColumnIcon}/>
                  <p>{`${convertKelvinToCelsius(currentWeatherData.main.feels_like)}°C`}</p>
                </div>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/pressure_icon_dark.png`} alt='pressure' height={50} width={50} className={s.rightColumnIcon}/>
                  <p>{`${convertHpaToMmHg(currentWeatherData.main.pressure)} мм рт. ст.`}</p>
                </div>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/wind_icon_dark.png`} alt='wind' height={50} width={50} className={s.rightColumnIcon}/>
                  <p>{`${Math.round(currentWeatherData.wind.speed)} м/с, ${currentLanguage==='ru'?getWindDirection(currentWeatherData.wind.deg).ru:getWindDirection(currentWeatherData.wind.deg).ua}`}</p>
                </div>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/cloudiness_icon_dark.png`} alt='cloudiness' height={50} width={50} className={s.rightColumnIcon}/>
                  <p>{`${currentWeatherData.clouds.all}%`}</p>
                </div>
                <div className={s.rightColumnItem}>
                  <Image src={`/images/humidity_icon_dark.png`} alt='humidity' height={50} width={50} className={s.rightColumnIcon}/>
                  <p>{`${currentWeatherData.main.humidity}%`}</p>
                </div>
              </div>
            }

          </div>
        }
      </div>
      <div className={`${s.periodWeatherBlock} ${currentTheme==='dark'?s.dark:''}`}>
        <div className={`${s.periodWeatherButtons} ${currentTheme==='dark'?s.dark:''}`}>
          <button className={`${s.periodWeatherButton} ${currentTheme==='dark'?s.darkButton:''} ${weatherPeriod==='24h'?s.activeButton:''}`} onClick={dayWeatherHandler}>24 ч</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='secondDay'?s.activeButton:''}`} onClick={secondDayWeatherHandler}>{currentLanguage==='ru'?fourNextDaysRu[0]:fourNextDaysUa[0]}</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='thirdDay'?s.activeButton:''}`} onClick={thirdDayWeatherHandler}>{currentLanguage==='ru'?fourNextDaysRu[1]:fourNextDaysUa[1]}</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='fourthDay'?s.activeButton:''}`} onClick={fourthDayWeatherHandler}>{currentLanguage==='ru'?fourNextDaysRu[2]:fourNextDaysUa[2]}</button>
          <button className={`${s.periodWeatherButton} ${weatherPeriod==='fifthDay'?s.activeButton:''}`} onClick={fifthDayWeatherHandler}>{currentLanguage==='ru'?fourNextDaysRu[3]:fourNextDaysUa[3]}</button>
        </div>
        <div className={`${s.periodWeatherContent} ${currentTheme==='dark'?s.dark:''}`}>
          <PeriodWeather weatherPeriod={weatherPeriod}/>
        </div>
      </div>
    </div>
  )
}


