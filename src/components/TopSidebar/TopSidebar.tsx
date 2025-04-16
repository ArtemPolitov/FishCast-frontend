'use client'
import React from 'react'
import s from './TopSidebar.module.css'
import { useGetAllFishesQuery } from '@/services/fishApi'
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { skipToken } from '@reduxjs/toolkit/query';
import { calculateFishBite,getWaterTemperature,checkRain } from '@/utils/calculateFishBite';
import { getKyivHour } from '@/app/components/FishSide/FishBite/FishBite';
import { FishData } from '@/services/fishApi';
import { convertKelvinToCelsius } from '@/app/components/WeatherSide/WeatherContent/WeatherContent';
import { convertHpaToMmHg } from '@/app/components/WeatherSide/WeatherContent/WeatherContent';
import Image from 'next/image';
import FishBite from '@/app/components/FishSide/FishBite/FishBite';
import { FishGroup } from '@/store/fishDataSlice';

export default function TopSidebar() {

  const {data:fishesData} = useGetAllFishesQuery();
  const selectedCityLat = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((state:RootState)=>state.citySelection.selectedCityData?.lon);
  const isCitySelected = useSelector((state:RootState)=>state.citySelection.isCitySelected);
  const {data:currentWeatherData,isLoading:currentWeatherDataIsLoading,error:currentWeatherDataError} = useGetCurrentWeatherDataQuery(
    selectedCityLat&&selectedCityLon?{lat:selectedCityLat,lon:selectedCityLon}:skipToken,
  );

  const getFiveBestBiteFishes = (data:FishData[]) =>{
    interface FishDataWithBite {
      name:string,
      img:string,
      group:FishGroup,
      bite:number
    }
    let fishDataWithBiteArr:FishDataWithBite[] = []
    if(currentWeatherData){
      for (let i = 0; i<data.length; i++){
        fishDataWithBiteArr.push({
          name: data[i].name.ru,
          img: data[i].image_url,
          group:data[i].group,
          bite: calculateFishBite(
            data[i].group,
            getWaterTemperature(convertKelvinToCelsius(currentWeatherData?.main.temp)),
            convertHpaToMmHg(currentWeatherData.main.pressure),
            currentWeatherData.wind.speed,
            currentWeatherData.clouds.all,
            checkRain(currentWeatherData),
            getKyivHour(currentWeatherData.dt)
          )
        });
      }

      let topBiteFishesData:FishDataWithBite[] = fishDataWithBiteArr.sort((a,b)=>b.bite-a.bite).slice(0,5);
      return topBiteFishesData;
    }else return null;
  }

  const bestBiteFishesData = fishesData&&getFiveBestBiteFishes(fishesData);

  

  return (
    <div className={s.topSidebar}>
      <h2 className={s.topSidebarTitle}>Лучший клев</h2>
      <div className={s.fishCards}>
        {isCitySelected&&
          bestBiteFishesData&&bestBiteFishesData.map(item=>{
            return(
              <div className={s.fishCard}>
                <div className={s.imageWrapper}><Image src={item.img} alt='fish img' height={40} width={70} className={s.fishImg}/></div>
                {currentWeatherData&&<FishBite weatherData={currentWeatherData} fishGroup={item.group} size='smallSize'/>}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
