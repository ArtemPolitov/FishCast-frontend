'use client'
import React from 'react'
import { useSelector } from 'react-redux'
import s from './WeatherSide.module.css'
import RegionSelect from './RegionSelect/RegionSelect'
import CitySelect from './CitySelect/CitySelect'
import { useState } from 'react'
import type { RootState, AppDispatch} from '../../../store/store';
import WeatherContent from './WeatherContent/WeatherContent'


export default function WeatherSide() {
  const [selectedRegionId,setSelectedRegionId] = useState<number|null>(null);
  const isCitySelected = useSelector((state: RootState) => state.citySelection.isCitySelected);

  return (
    <div className={s.weatherSide}>
      <div className={s.selects}>
        <RegionSelect setSelectedRegionId={setSelectedRegionId}/>
        <CitySelect selectedRegionId={selectedRegionId}/>
      </div>
        {!isCitySelected ? (
          <p className={s.chooseCityLabel}>Укажите Ваше местоположение</p>
        ) : (
          <WeatherContent/>
        )}
    </div>
  )
}
