'use client'
import React from 'react'
import { calculateFishBite,getWaterTemperature,getCurrentHourNum,checkRain } from '@/utils/calculateFishBite'
import { getKyivHour } from '@/app/components/FishSide/FishBite/FishBite'


export default function Sandbox() {

  const kyivHour = getKyivHour(1744686000)
  //console.log(`Киевское время: ${kyivHour}`);
  //console.log(`Температура воды: ${getWaterTemperature(3)}`);
  console.log(`Уровень клева: ${calculateFishBite('catfish',24,730,2,60,true,21)}`);  

  return (
    <div>
      
    </div>
  )
}
