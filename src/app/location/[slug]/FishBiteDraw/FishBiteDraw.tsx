import React from 'react'
import s from './FishBiteDraw.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface FishBiteDrawProps{
  biteValue:number
}

const FishBiteDraw:React.FC<FishBiteDrawProps> = ({biteValue}) =>{
  const shadedFishesQuantityArr = Array(biteValue).fill(null);
  const transparentFishesQuantityArr = Array(5-biteValue).fill(null);
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);

  return (
    <div className={s.fishBite}>
      {
        shadedFishesQuantityArr.map(item=>{
          return(
            currentTheme==='light'?
            <Image src='/images/opaque_fish.png' alt='bite img' height={25} width={25} className={s.biteImg}/>:
            <Image src='/images/opaque_fish_dark.png' alt='bite img' height={25} width={25} className={s.biteImg}/>
          )
        })
      }
      {
        transparentFishesQuantityArr.map(item=>{
          return(
            currentTheme==='light'?
            <Image src='/images/transparent_fish.png' alt='bite img' height={25} width={25} className={s.biteImg}/>:
            <Image src='/images/transparent_fish_dark.png' alt='bite img' height={25} width={25} className={s.biteImg}/>
          )
        })
      }
    </div>
  )
}

export default FishBiteDraw;
