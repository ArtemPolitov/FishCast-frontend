import React from 'react'
import s from './Theme.module.css'
import Image from 'next/image'
import { useSelector,useDispatch } from 'react-redux'
import { RootState } from '@/store/store'
import { setTheme } from '@/store/themeSlice'
import { useEffect,useRef } from 'react'

export default function Theme() {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const themeToggle = () =>{
    currentTheme==='light'?dispatch(setTheme('dark')):dispatch(setTheme('light'));
  };
  const bodyRef = useRef(document.body);

  useEffect(()=>{
    if(currentTheme==='dark'){
      bodyRef.current.classList.add('darkTheme');
      localStorage.setItem('theme','dark');
    }if(currentTheme==='light'){
      bodyRef.current.classList.remove('darkTheme');
      localStorage.setItem('theme','light');
    }
  },[currentTheme]);

  return (
    <div className={s.theme} onClick={themeToggle}>
      {currentTheme==='light'?<Image src='/images/dark-theme.png' alt='Dark theme' width={30} height={30}/>:<Image src='/images/light-theme.png' alt='Light theme' width={30} height={30}/>}
    </div>
  )
}
