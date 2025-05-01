import React from 'react'
import s from './Language.module.css'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setLanguage } from '@/store/localizationSlice'

export default function Language() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);
  const handleClickRu = () =>{
    if(currentLanguage==='ua'){
      dispatch(setLanguage('ru'));
      localStorage.setItem('language','ru');
    }
  }

  const handleClickUa = () =>{
    if(currentLanguage==='ru'){
      dispatch(setLanguage('ua'));
      localStorage.setItem('language','ua');
    }
  }

  return (
    <div className={`${s.language} ${currentTheme==='dark'?s.dark:''}`}>
      <p className={currentLanguage==='ua'?s.active:''} onClick={handleClickUa}>UA</p>
      <span></span>
      <p className={currentLanguage==='ru'?s.active:''} onClick={handleClickRu}>RU</p>
    </div>
  )
}
