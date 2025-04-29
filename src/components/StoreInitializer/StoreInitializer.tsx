'use client'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedRegionData } from '@/store/regionsDataSlice';
import { setIsCitySelected,setSelectedCityData } from '@/store/citySelectionSlice';
import { setIsFishSelected,setSelectedFishData } from '@/store/fishDataSlice';
import { setTheme } from '@/store/themeSlice';

import { useEffect } from 'react';

export default function StoreInitializer() {
  const dispatch = useDispatch();
  
  useEffect(()=>{
    const selectedRegionDataLS = localStorage.getItem('selectedRegionData');
    const selectedCityDataLS = localStorage.getItem('selectedCityData');
    const selectedFishDataLS = localStorage.getItem('selectedFishData');
    const currentThemeLS = localStorage.getItem('theme');
    if (selectedRegionDataLS){
      dispatch(setSelectedRegionData(JSON.parse(selectedRegionDataLS)));
    }
    if(selectedCityDataLS){
      dispatch(setIsCitySelected(true));
      dispatch(setSelectedCityData(JSON.parse(selectedCityDataLS)));
    }
    if(selectedFishDataLS){
      dispatch(setIsFishSelected(true));
      dispatch(setSelectedFishData(JSON.parse(selectedFishDataLS)));
    }
    if (currentThemeLS === 'dark') {
      dispatch(setTheme(currentThemeLS));
    }
  },[])
  return null; 
}
