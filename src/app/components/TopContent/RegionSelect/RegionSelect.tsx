"use client";
import { ChangeEvent } from 'react';
import React from 'react'
import s from './RegionSelect.module.css'
import { useState,useEffect } from 'react'
import { useGetRegionsQuery } from '../../../../services/api';  // Импортируем хук из API

interface RegionSelectProps{
  setSelectedRegionId:React.Dispatch<React.SetStateAction<number|null>>,
}

const RegionSelect: React.FC<RegionSelectProps> = ({setSelectedRegionId}) => {
  const { data: regions } = useGetRegionsQuery();

  const regionSelectHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setSelectedRegionId(+e.target.value);
  }

  return (
    <div className={s.regionSelect}>
      <select name="" id="" onChange={regionSelectHandler}>
        <option value="" disabled selected className={s.defaultOption}>Выберите область</option>
        {regions&&regions.map(region=>{
          return <option value={region.id}>{region.name}</option>
        })}
      </select>
    </div>
  )
}

export default RegionSelect;
