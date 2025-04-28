import React from 'react'
import s from './Location.module.css'
import { LocationData } from '@/services/locationsApi'
import Image from 'next/image'

interface LocationProps {
  locationData:LocationData;
}

const Location:React.FC<LocationProps> = ({locationData}) =>{
  return (
    <div className={s.location}>
      <div className={s.imgWrapper}><Image src={locationData.image_url} alt='location img'/></div>
      <div className={s.locationDescription}>{locationData.description.ru}</div>
    </div>
  )
}

export default Location;
