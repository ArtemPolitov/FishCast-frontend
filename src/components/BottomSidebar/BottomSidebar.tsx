'use client'
import React from 'react'
import s from './BottomSidebar.module.css'
import { useGetAllLocationsQuery,useGetLocationByIdQuery } from '@/services/locationsApi'
import { useSelector } from 'react-redux'
import { RootState, store } from '@/store/store'
import { LocationData } from '@/services/locationsApi'
import Location from './Location/Location'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

interface NearestLocationData {
  _id?:number,
  id:number,
  name:{
    ru:string,
    ua:string
  },
  slug:string,
  coordinates:{
    latitude:number,
    longitude:number
  },
  region:{
    ru:string,
    ua:string,
    region_id:number
  },
  reservoir:{
    name:{
      ru:string,
      ua:string
    },
    type:string
  },
  fish_species:number[],
  accessibility:{
    boat:boolean,
    shore:boolean
  },
  description:{
    ru:string,
    ua:string
  },
  image_url:string,
  distance:number
}

export function getDistanceKm(lat1:number, lon1:number, lat2:number, lon2:number):number {
  const R = 6371; // Радиус Земли в километрах
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export const getNearestLocationsData = (cityLat:number,cityLon:number,locationsData:LocationData[]):NearestLocationData[]|null =>{
  const locationsDataWithDistance = locationsData.map(location=>{
    return {
      ...location,
      distance:Math.round(getDistanceKm(cityLat,cityLon,location.coordinates.latitude,location.coordinates.longitude))
    }
  });
  
  const nearestLocationsData = locationsDataWithDistance?.filter(location=>{
    return location.distance<60;
  })
  return nearestLocationsData?nearestLocationsData:null;
}

export default function BottomSidebar() {
  const isCitySelected = useSelector((store:RootState)=>store.citySelection.isCitySelected);
  const selectedCityLat = useSelector((store:RootState)=>store.citySelection.selectedCityData?.lat);
  const selectedCityLon = useSelector((store:RootState)=>store.citySelection.selectedCityData?.lon);
  const {data:allLocationsData,isLoading:allLocationsDataIsLoading,error:allLocationsDataIsError} = useGetAllLocationsQuery();
  const pathname = usePathname();
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);

  return (
    <div className={s.bottomSidebar}>
      <h2 className={s.bottomSidebarTitle}>Локации поблизости</h2>
      <div className={`${s.nearestLocations} ${currentTheme==='dark'?s.dark:''}`}>
        {selectedCityLat&&selectedCityLon&&allLocationsData&&isCitySelected&&
          getNearestLocationsData(selectedCityLat,selectedCityLon,allLocationsData)?.map(location=>{
            const isActive = pathname === `/location/${location.slug}`;
            return(
              <Link key={location._id} href={`/location/${location.slug}`} passHref>
                <div className={`${s.locationCard} ${isActive?s.locationCardActive:''}`} key={location._id}>
                  <div className={s.imgWrapper}><Image src={location.image_url} alt={'location img'} height={50} width={50} className=  {s.locationImg}/></div>
                  <p className={s.locationInfo}>{`${location.name.ru}, ${location.distance} км`}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
      <div className={s.emptyBlock}></div>
    </div>
  )
}
