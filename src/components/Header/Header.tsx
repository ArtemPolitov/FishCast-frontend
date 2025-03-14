"use client";

import React from 'react'
import s from './Header.module.css'
import Link from 'next/link'
import Image from "next/image";
import Menu from './Menu/Menu';
import Theme from './Theme/Theme';
import Language from './Language/Language';
import Authorization from './Authorization/Authorization';
import MobileMenu from './MobileMenu/MobileMenu';
import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);

  const burgerHandler = (e:React.MouseEvent<HTMLDivElement>) =>{
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  }

  return (
    <header className={s.header}>
      <div className={s.headerContent}>
        <div className={s.logo}><Image src="/logo_light_theme.png" alt="FishCast Logo" width={320} height={57} priority/></div>
        <Menu/> 
        <div className={s.rightBlock}>
          <Theme/>
          <Language/>
          <Authorization/>
        </div>
      </div>
      <div className={s.mobileHeaderContent}>
        <div className={`${s.burger} ${isMobileMenuOpen?s.active:''}`} onClick={burgerHandler}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={s.logo}><Image src="/logo_light_theme.png" alt="FishCast Logo" width={250} height={57} priority/></div>
        <Authorization/>
      </div>
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen}/>
    </header>
  )
}
