'use client';
import { notFound } from 'next/navigation';
import { useGetLocationBySlugQuery } from '@/services/locationsApi';
import s from './location.module.css';
import Image from 'next/image';
import { useGetAllFishesQuery } from '@/services/fishApi';
import { getKyivHour } from '@/app/components/FishSide/FishBite/FishBite';
import { FishData } from '@/services/fishApi';
import { LocationData } from '@/services/locationsApi';
import { useGetCurrentWeatherDataQuery } from '@/services/weatherApi';
import FishBiteDraw from './FishBiteDraw/FishBiteDraw';
import { skipToken } from '@reduxjs/toolkit/query';
import { convertKelvinToCelsius, convertHpaToMmHg } from '@/app/components/WeatherSide/WeatherContent/WeatherContent';
import { calculateFishBite, checkRain } from '@/utils/calculateFishBite';
import { CurrentWeatherData } from '@/services/weatherApi';
import { FishDataWithBite } from '@/services/fishApi';
import Link from 'next/link';
import MapFrame from './MapFrame/MapFrame';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetUserDataQuery } from '@/services/userApi';
import { useState, useEffect } from 'react';
import { useAddLocationToFavoritesMutation, useRemoveLocationFromFavoritesMutation } from '@/services/userApi';
import { motion } from 'framer-motion'; 

interface LocationPageProps {
  params: {
    slug: string;
  };
}

export default function LocationPage({ params }: LocationPageProps) {
  const { slug } = params;
  const { data: locationData, isLoading: locationDataIsLoading, isError: locationDataError } = useGetLocationBySlugQuery(slug);
  const { data: allFishesData } = useGetAllFishesQuery();
  const locationLat = locationData?.coordinates.latitude;
  const locationLon = locationData?.coordinates.longitude;
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const currentLanguage = useSelector((state: RootState) => state.localization.currentLanguage);
  const { data: currentWeatherData} = useGetCurrentWeatherDataQuery(
    locationLat && locationLon
      ? { lat: locationLat, lon: locationLon }
      : skipToken
  );
  const token = localStorage.getItem('token');
  const { data: userData, refetch: refetchUserData } = useGetUserDataQuery(
    token ? { token } : skipToken
  );

  const [isLocationInFavorite, setIsLocationInFavorite] = useState<boolean>(false);

  useEffect(()=>{
    if(locationData?._id&&(userData?.favoriteLocations.includes(locationData?._id))){
      setIsLocationInFavorite(true);
    }else{
      setIsLocationInFavorite(false);
    }
  },[slug,userData,locationData])

  const isUserAuthorized = useSelector((state: RootState) => state.user.isUserAuthorized);

  const getLocationFishesDataWithBite = (
    allFishesData: FishData[],
    locationData: LocationData,
    currentWeatherData: CurrentWeatherData
  ): FishDataWithBite[] => {
    const locationFishesData = allFishesData.filter(fishData => {
      return locationData.fish_species.includes(fishData.id);
    });
    const locationFishesDataWithBite = locationFishesData.map(fishData => ({
      ...fishData,
      fishBite: calculateFishBite(
        fishData.group,
        convertKelvinToCelsius(currentWeatherData?.main.temp),
        convertHpaToMmHg(currentWeatherData?.main.pressure),
        currentWeatherData?.wind.speed,
        currentWeatherData?.clouds.all,
        checkRain(currentWeatherData),
        getKyivHour(currentWeatherData?.dt)
      )
    }));
    return locationFishesDataWithBite.sort((a, b) => {
      return b.fishBite - a.fishBite;
    });
  };

  const [addToFavorite] = useAddLocationToFavoritesMutation();
  const [removeFromFavorite] = useRemoveLocationFromFavoritesMutation();

  const favoriteHandler = async () => {
    try {
      if (locationData?._id && token) {
        if (!isLocationInFavorite) {
          await addToFavorite({ locationId: locationData._id, token });
        } else {
          await removeFromFavorite({ locationId: locationData._id, token });
        }
        await refetchUserData(); // обновление userData
      }
    } catch (error) {
      console.error(error)
    }
  };

  if (locationDataIsLoading) {
    return <div>Загрузка...</div>;
  }

  if (locationDataError || !locationData) {
    notFound();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={`${s.locationPage} ${currentTheme === 'dark' ? s.dark : ''}`}
    >
      <div className={s.locationInfo}>
        <div className={s.locationInfoContent}>
          <Link href='/' className={s.backButton}>
            {currentTheme === 'light' ? (
              <Image src='/images/arrow_back_icon.png' alt='back img' height={25} width={25} />
            ) : (
              <Image src='/images/arrow_back_icon_dark.png' alt='back img' height={25} width={25} />
            )}
            <p>{currentLanguage === 'ru' ? 'На главную' : 'На головну'}</p>
          </Link>
          {isUserAuthorized && (
            <div className={s.favorite} onClick={favoriteHandler}>
              {isLocationInFavorite ? (
                <Image
                  src={`/images/filled_love_icon${currentTheme === 'dark' ? '_dark' : ''}.png`}
                  alt='favorite-icon'
                  height={45}
                  width={45}
                />
              ) : (
                <Image
                  src={`/images/empty_love_icon${currentTheme === 'dark' ? '_dark' : ''}.png`}
                  alt='favorite-icon'
                  height={45}
                  width={45}
                />
              )}
            </div>
          )}
          <div className={s.imgWrapper}>
            <Image src={locationData.image_url} alt='location img' height={350} width={350} className={s.locationImg} />
          </div>
          <div className={s.locationText}>
            <h3>{currentLanguage === 'ru' ? locationData.name.ru : locationData.name.ua}</h3>
            <p className={s.locationDescr}>{currentLanguage === 'ru' ? locationData.description.ru : locationData.description.ua}</p>
          </div>
          <div className={s.map}>
            <MapFrame lat={locationData.coordinates.latitude} lon={locationData.coordinates.longitude} />
          </div>
        </div>
        <div className={s.emptyBlock}></div>
      </div>
      <div className={s.fishBite}>
        <h3>{currentLanguage === 'ru' ? 'Клев на локации' : 'Кльов на локації'}</h3>
        <div className={s.fishCards}>
          {allFishesData &&
            currentWeatherData &&
            getLocationFishesDataWithBite(allFishesData, locationData, currentWeatherData).map(fishData => {
              return (
                <div className={s.fishCard} key={fishData.id}>
                  <div className={s.fishImgWrapper}>
                    <Image src={fishData.image_url} alt='fish img' width={50} height={50} className={s.fishImg} />
                  </div>
                  <FishBiteDraw biteValue={fishData.fishBite} />
                </div>
              );
            })}
        </div>
      </div>
    </motion.div>
  );
}
