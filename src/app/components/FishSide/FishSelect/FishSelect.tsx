"use client"
import React,{ChangeEvent,useState,useEffect} from 'react'
import s from './FishSelect.module.css'
import { setIsFishSelected,setSelectedFishData } from '@/store/fishDataSlice'
import { useGetAllFishesQuery,useGetFishByIdQuery } from '@/services/fishApi'
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "@/store/store"; 

export default function FishSelect() {
  const[selectedFishId,setSelectedFishId] = useState<number|null>(null);
  const isCitySelected = useSelector((state:RootState)=>state.citySelection.selectedCityData);
  const dispatch = useDispatch();
  const {data:fishes} = useGetAllFishesQuery();
  const { data: fishData } = useGetFishByIdQuery(selectedFishId ?? 0, { 
    skip: selectedFishId===null, 
  });
  const selectedFishData = useSelector((state:RootState)=>state.fishData.selectedFishData);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);
  
  useEffect(()=>{
    if (fishData){
      dispatch(setSelectedFishData(fishData));
      localStorage.setItem('selectedFishData',JSON.stringify(fishData));
    }
  },[fishData,dispatch]);

  const fishSelectHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    const fishId = +e.target.value;
    setSelectedFishId(fishId);
    dispatch(setIsFishSelected(true));
  }

  return (
    <div className={s.fishSelect}>
      <select name="" id="" disabled={!isCitySelected} onChange={fishSelectHandler} value={selectedFishData?.id ?? ""}>
        <option value="" disabled className={s.defaultOption}>
          {currentLanguage==='ru'?'Выберите рыбу':'Оберіть рибу'}
        </option>
        {fishes?.map(fish=>{
          return(
            <option value={fish.id} key={fish.id}>{currentLanguage==='ru'?fish.name.ru:fish.name.ua}</option>
          )
        })}
      </select>
    </div>
  )
}
