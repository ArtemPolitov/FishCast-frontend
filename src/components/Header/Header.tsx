import React from 'react'
import s from './Header.module.css'
import Link from 'next/link'
import Image from "next/image";
import Theme from './Theme/Theme';
import Language from './Language/Language';
import Authorization from './Authorization/Authorization';

export default function Header() {
  return (
    <header className={s.header}>
      <div className={s.logo}><Image src="/logo_light_theme.png" alt="FishCast Logo" width={320} height={57}/></div>
      <nav>
        <div className={s.menu}>
          <Link href="/">Главная</Link>
          <Link href="/locations">Рыболовные места</Link>
          <Link href="/contacts">Справочник рыб</Link>
        </div>
      </nav>
      <div className={s.rightBlock}>
        <Theme/>
        <Language/>
        <Authorization/>
      </div>
    </header>
  )
}
