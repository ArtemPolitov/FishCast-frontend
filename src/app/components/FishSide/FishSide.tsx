"use client"
import React from 'react'
import s from './FishSide.module.css'
import FishSelect from './FishSelect/FishSelect'
import { useState } from 'react'
import { useSelector } from "react-redux";
import { RootState } from "@/store/store"; 

export default function FishSide() {
  const[selectedFishId,setSelectedFishId] = useState<number>();
  const isCitySelected = useSelector((state:RootState)=>state.citySelection.selectedCityData);
  const isFishSelected = useSelector((state:RootState)=>state.fishData.isFishSelected);

  return (
    <div className={s.fishSide}>
      <div className={s.sidebar}>
        <FishSelect/>
      </div>
      <div className={s.content}>
        {!isCitySelected&&!isFishSelected&&<p className={s.chooseLabel}>Выберите населеный пункт</p>}
        {isCitySelected&&!isFishSelected&&<p className={s.chooseLabel}>Выберите рыбу</p>}
        {isCitySelected&&isFishSelected&&<p className={s.chooseLabel}>Контент</p>}
      </div>
    </div>
  )
}
