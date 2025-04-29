import React from 'react'
import s from './Language.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

export default function Language() {
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);

  return (
    <div className={`${s.language} ${currentTheme==='dark'?s.dark:''}`}>
      <p>RU</p>
      <span></span>
      <p>UA</p>
    </div>
  )
}
