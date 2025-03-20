"use client";

import React from 'react'
import s from './TopContent.module.css'
import RegionSelect from './RegionSelect/RegionSelect'
import CitySelect from './CitySelect/CitySelect'
import Search from './Search/Search'
import { useState } from 'react'

export default function TopContent() {
  const [selectedRegionId,setSelectedRegionId] = useState<number|null>(null);
  console.log(selectedRegionId);
  return (
    <div className={s.topContent}>
      <RegionSelect setSelectedRegionId={setSelectedRegionId}/>
      <CitySelect selectedRegionId={selectedRegionId}/>
      <Search/>
    </div>
  )
}
