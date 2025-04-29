"use client";

import React from 'react'
import s from './Header.module.css'
import Link from 'next/link'
import Image from "next/image";
import Menu from './Menu/Menu';
import Theme from './Theme/Theme';
import Language from './Language/Language';
import AuthorizationButton from './AuthorizationButton/AuthorizationButton';
import MobileMenu from './MobileMenu/MobileMenu';
import AuthorizationModal from './AuthorizationModal/AuthorizationModal';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function Header() {
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
  const [isAuthorizationModalOpen,setIsAuthorizationModalOpen] = useState(false);
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);

  const burgerHandler = (e:React.MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  }

  const authorizationHandler = () =>{
    setIsAuthorizationModalOpen(prev=>!prev);
  }

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.logo}>
          {
            currentTheme==='light'?
            <Image src="/logo_light_theme.png" alt="FishCast Logo" width={320} height={57} priority/>:
            <Image src="/logo_dark_theme.png" alt="FishCast Logo" width={320} height={57} priority/>
          }
        </div>
        <div className={s.rightBlock}>
          <Theme/>
          <Language/>
          <AuthorizationButton onClick={authorizationHandler}/>
        </div>
      </div>
      <div className={s.mobileHeaderContent}>
        <div className={`${s.burger} ${isMobileMenuOpen?s.active:''}`} onClick={burgerHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={s.logo}><Image src="/logo_light_theme.png" alt="FishCast Logo" width={250} height={57} priority/></div>
        <AuthorizationButton onClick={authorizationHandler}/>
      </div>
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
      <AuthorizationModal isAuthorizationModalOpen={isAuthorizationModalOpen} setIsAuthorizationModalOpen={setIsAuthorizationModalOpen}/>
    </header>
  )
}
