import React from 'react'
import s from './FishBiteDraw.module.css'
import Image from 'next/image'

interface FishBiteDrawProps{
  biteValue:number
}

const FishBiteDraw:React.FC<FishBiteDrawProps> = ({biteValue}) =>{

  const shadedFishesQuantityArr = Array(biteValue).fill(null);
  const transparentFishesQuantityArr = Array(5-biteValue).fill(null);
  return (
    <div className={s.fishBite}>
      {
        shadedFishesQuantityArr.map(item=>{
          return(
            <Image src='/images/opaque_fish.png' alt='bite img' height={25} width={25}/>
          )
        })
      }
      {
        transparentFishesQuantityArr.map(item=>{
          return(
            <Image src='/images/transparent_fish.png' alt='bite img' height={25} width={25}/>
          )
        })
      }
    </div>
  )
}

export default FishBiteDraw;
