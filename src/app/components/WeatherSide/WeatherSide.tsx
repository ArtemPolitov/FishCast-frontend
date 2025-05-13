'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import s from './WeatherSide.module.css'
import RegionSelect from './RegionSelect/RegionSelect'
import CitySelect from './CitySelect/CitySelect'
import type { RootState } from '../../../store/store';
import WeatherContent from './WeatherContent/WeatherContent'
import { motion } from 'framer-motion'; 


export default function WeatherSide() {
  const selectedRegionId = useSelector((state:RootState)=>state.geoData.selectedRegionData?.id);
  const isCitySelected = useSelector((state: RootState) => state.citySelection.isCitySelected);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={s.weatherSide}
    >
      
        <div className={s.selects}>
          <RegionSelect/>
          <CitySelect selectedRegionId={selectedRegionId}/>
        </div>
          {!isCitySelected ? (
            <p className={s.chooseCityLabel}>{currentLanguage==='ru'?'Укажите Ваше местоположение':'Вкажіть Ваше  місцезнаходження'}</p>
          ) : (
            <WeatherContent/>
          )}
     
    </motion.div>
  )
}
