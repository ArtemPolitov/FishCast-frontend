'use client';

import { notFound } from 'next/navigation'; 
import { useGetLocationBySlugQuery } from '@/services/locationsApi';
import s from './location.module.css';
import Image from 'next/image';
import { useGetAllFishesQuery } from '@/services/fishApi';
import FishBite, { getKyivHour } from '@/app/components/FishSide/FishBite/FishBite';
import { FishData } from '@/services/fishApi';
import { LocationData } from '@/services/locationsApi';
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi';
import FishBiteDraw from './FishBiteDraw/FishBiteDraw';
import { skipToken } from '@reduxjs/toolkit/query';
import { convertKelvinToCelsius,convertHpaToMmHg } from '@/app/components/WeatherSide/WeatherContent/WeatherContent';
import { calculateFishBite,getWaterTemperature,getCurrentHourNum,checkRain } from '@/utils/calculateFishBite';
import { CurrentWeatherData } from '@/services/weatherApi';
import { FishDataWithBite } from '@/services/fishApi';
import Link from 'next/link';
import MapFrame from './MapFrame/MapFrame';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface LocationPageProps {
  params: {
    slug: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const { slug } = params;
  const { data: locationData, isLoading:locationDataIsLoading, isError:locationDataError } = useGetLocationBySlugQuery(slug);
  const {data:allFishesData, isLoading:allFishesDataIsLoading, isError:allFishesDataIsError} = useGetAllFishesQuery();
  const locationLat = locationData?.coordinates.latitude;
  const locationLon = locationData?.coordinates.longitude;
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const { data: currentWeatherData, isLoading: currentWeatherIsLoading, isError: currentWeatherIsError }=useGetCurrentWeatherDataQuery(
    locationLat && locationLon
    ? { lat: locationLat, lon: locationLon }
    : skipToken
  );

  if (locationDataIsLoading) {
    return <div>Загрузка...</div>; 
  }

  if (locationDataError || !locationData) {
    notFound();
  }

  const getLocationFishesDataWithBite = (allFishesData:FishData[],locationData:LocationData,currentWeatherData:CurrentWeatherData):FishDataWithBite[] =>{
    const locationFishesData = allFishesData.filter(fishData=>{
      return locationData.fish_species.includes(fishData.id);
    });
    const locationFishesDataWithBite = locationFishesData.map(fishData=>({
        ...fishData,
        fishBite:calculateFishBite(fishData.group,convertKelvinToCelsius(currentWeatherData?.main.temp),convertHpaToMmHg(currentWeatherData?.main.pressure),currentWeatherData?.wind.speed,currentWeatherData?.clouds.all,checkRain(currentWeatherData),getKyivHour(currentWeatherData?.dt))
      
    }));
    return locationFishesDataWithBite.sort((a, b)=>{
      return b.fishBite-a.fishBite;
    });
  }

  return (
    <div className={`${s.locationPage} ${currentTheme==='dark'?s.dark:''}`}>
      <div className={s.locationInfo}>
        <div className={s.locationInfoContent}>
          <Link href='/' className={s.backButton}>
            {
              currentTheme==='light'?
              <Image src='/images/arrow_back_icon.png' alt='back img' height={25} width={25}/>:
              <Image src='/images/arrow_back_icon_dark.png' alt='back img' height={25} width={25}/>
            }
            <p>На главную</p>
          </Link>
          <div className={s.imgWrapper}><Image src={locationData.image_url} alt='location img' height={350} width={350} className={s. locationImg}/></div>
          <div className={s.locationText}>
            <h3>{locationData.name.ru}</h3>
            <p className={s.locationDescr}>{locationData.description.ru}</p>
          </div>
          <div className={s.map}>
            <MapFrame lat={locationData.coordinates.latitude} lon={locationData.coordinates.longitude}/>
          </div>
        </div>
        <div className={s.emptyBlock}></div>
      </div>
      <div className={s.fishBite}>
        <h3>Клев на локации</h3>
        <div className={s.fishCards}>
          {allFishesData&&currentWeatherData&&
            getLocationFishesDataWithBite(allFishesData,locationData,currentWeatherData).map(fishData=>{
              return(
                <div className={s.fishCard}>
                  <div className={s.fishImgWrapper}><Image src={fishData.image_url} alt='fish img' width={50} height={50} className={s. fishImg}/></div>
                  {/*<p className={s.fishName}>{fishData.name.ru}</p>*/}
                  <FishBiteDraw biteValue={fishData.fishBite}/>
                </div>
              )
            })
          }
        </div>
      </div>
      
    </div>
  );
}