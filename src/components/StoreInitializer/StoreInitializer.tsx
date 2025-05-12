'use client'
import { useDispatch } from 'react-redux'
import { setSelectedRegionData } from '@/store/regionsDataSlice';
import { setIsCitySelected,setSelectedCityData } from '@/store/citySelectionSlice';
import { setIsFishSelected,setSelectedFishData } from '@/store/fishDataSlice';
import { setTheme } from '@/store/themeSlice';
import { setIsUserAuthorized } from '@/store/userSlice';
import { useGetUserDataQuery } from '@/services/userApi';
import { useEffect,useState } from 'react';
import { setLanguage } from '@/store/localizationSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGetCityByIdQuery } from '@/services/cityApi';
import { useGetRegionByIdQuery } from '@/services/regionsApi';

export default function StoreInitializer() {
  
  const dispatch = useDispatch();

  const [tokenLS,setTokenLS] = useState<string|null>(null); 

  const {data:userData} = useGetUserDataQuery(
    tokenLS ? { token:tokenLS } : skipToken
  );

  const {data:userCityData} = useGetCityByIdQuery(
    userData?.cityId??skipToken
  )

  const {data:userRegionData} = useGetRegionByIdQuery(
    userData?.regionId??skipToken
  )
  
  useEffect(() => {
    setTokenLS(localStorage.getItem('token'));
  }, []);

useEffect(() => {
  const selectedRegionDataLS = localStorage.getItem('selectedRegionData');
  const selectedCityDataLS = localStorage.getItem('selectedCityData');
  const selectedFishDataLS = localStorage.getItem('selectedFishData');
  const currentThemeLS = localStorage.getItem('theme');
  const currentLanguageLS = localStorage.getItem('language');

  if (selectedRegionDataLS && selectedRegionDataLS !== 'undefined') {
    dispatch(setSelectedRegionData(JSON.parse(selectedRegionDataLS)));
  }
  if (selectedCityDataLS && selectedCityDataLS !== 'undefined') {
    dispatch(setIsCitySelected(true));
    dispatch(setSelectedCityData(JSON.parse(selectedCityDataLS)));
  }
  if (selectedFishDataLS && selectedFishDataLS !== 'undefined') {
    dispatch(setIsFishSelected(true));
    dispatch(setSelectedFishData(JSON.parse(selectedFishDataLS)));
  }
  if (currentThemeLS === 'dark') {
    dispatch(setTheme(currentThemeLS));
  }
  if (currentLanguageLS === 'ru') {
    dispatch(setLanguage('ru'));
  }

}, [dispatch]);
  
  useEffect(() => {
    if (tokenLS && userData) {
      dispatch(setIsUserAuthorized());
    }
  }, [dispatch, tokenLS, userData, userRegionData, userCityData]);
  return null; 
}
