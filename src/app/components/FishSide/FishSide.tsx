"use client"
import React from 'react'
import s from './FishSide.module.css'
import FishSelect from './FishSelect/FishSelect'
import { useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; 
import Image from 'next/image'
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi'
import { skipToken } from '@reduxjs/toolkit/query'
import FishBite from './FishBite/FishBite'
import PeriodBite from './PeriodBite/PeriodBite'
import { getFourNextDaysRu,getFourNextDaysUa } from '../WeatherSide/WeatherContent/WeatherContent'
import { motion } from 'framer-motion'; 


export default function FishSide() {
  const [bitePeriod,setBitePeriod] = useState('24h');
  const isCitySelected = useSelector((state:RootState)=>state.citySelection.selectedCityData);
  const isFishSelected = useSelector((state:RootState)=>state.fishData.isFishSelected);
  const selectedFishData = useSelector((state:RootState)=>state.fishData.selectedFishData);
  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);

  const {data:currentWeatherData,isLoading:currentWeatherDataIsLoading} = useGetCurrentWeatherDataQuery(selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,);

  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);
  
  const fourNextDaysRu:string[] = getFourNextDaysRu();
  const fourNextDaysUa:string[] = getFourNextDaysUa();

  const dayBiteHandler = () =>{
    setBitePeriod('24h');
  }

  const secondDayBiteHandler = () =>{
    setBitePeriod('secondDay');
  }

  const thirdDayBiteHandler = () =>{
    setBitePeriod('thirdDay');
  }

  const fourthDayBiteHandler = () =>{
    setBitePeriod('fourthDay');
  }

  const fifthDayBiteHandler = () =>{
    setBitePeriod('fifthDay');
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={s.fishSide}
    >
      
        <div className={s.sidebar}>
          <FishSelect/>
        </div>
          {!isCitySelected&&!isFishSelected&&<p className={s.chooseLabel}>{currentLanguage==='ru'?'Выберите населеный   пункт':'Виберіть населений пункт'}</p>}
          {isCitySelected&&!isFishSelected&&<p className={s.chooseLabel}>{currentLanguage==='ru'?'Выберите рыбу':'Оберіть   рибу'}</p>}
          {!isCitySelected&&isFishSelected&&<p className={s.chooseLabel}>{currentLanguage==='ru'?'Выберите населеный  пункт':'Виберіть населений пункт'}</p>}
          {selectedFishData&&isCitySelected&&isFishSelected&&
            <div className={`${s.content} ${currentTheme==='dark'?s.dark:''}`}>
              <div className={s.fishInfo}>
                <Image src={selectedFishData?.image_url} alt='fish img' width={200} height={200} className={s.fishImg}/>
                <p className={s.fishDescr}>{currentLanguage==='ru'?selectedFishData.description.ru:selectedFishData.  description.ua}</p>
              </div>
              <div className={s.currentBite}>
                    <p className={s.biteLabel}>{currentLanguage==='ru'?'Текущий клев:':'Поточний кльов:'}</p>
                    {currentWeatherData&&<FishBite weatherData={currentWeatherData} fishGroup={selectedFishData.group}  size='normalSize'/>}
              </div>
              <div className={s.periodBiteBlock}>
                <div className={s.periodBiteButtons}>
                  <button className={`${s.periodBiteButton} ${bitePeriod==='24h'?s.activeButton:''}`} onClick={dayBiteHandler}  >24 ч</button>
                  <button className={`${s.periodBiteButton} ${bitePeriod==='secondDay'?s.activeButton:''}`} onClick=  {secondDayBiteHandler}>{currentLanguage==='ru'?fourNextDaysRu[0]:fourNextDaysUa[0]}</button>
                  <button className={`${s.periodBiteButton} ${bitePeriod==='thirdDay'?s.activeButton:''}`} onClick= {thirdDayBiteHandler}>{currentLanguage==='ru'?fourNextDaysRu[1]:fourNextDaysUa[1]}</ button>
                  <button className={`${s.periodBiteButton} ${bitePeriod==='fourthDay'?s.activeButton:''}`} onClick=  {fourthDayBiteHandler}>{currentLanguage==='ru'?fourNextDaysRu[2]:fourNextDaysUa[2]} </button>
                  <button className={`${s.periodBiteButton} ${bitePeriod==='fifthDay'?s.activeButton:''}`} onClick= {fifthDayBiteHandler}>{currentLanguage==='ru'?fourNextDaysRu[3]:fourNextDaysUa[3]}</ button>
                </div>
                <PeriodBite bitePeriod={bitePeriod}/>
              </div>
            </div>
          }
      
    </motion.div>
  )
}
