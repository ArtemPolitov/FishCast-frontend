import React from 'react'
import Link from 'next/link'
import s from './Menu.module.css'

export default function Menu() {
  return (
    <nav>
      <div className={s.menu}>
        <Link href="/">Главная</Link>
        <Link href="/locations">Локации</Link>
        <Link href="/contacts">Рыбы</Link>
      </div>
    </nav>
  )
}
