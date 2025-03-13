import React from 'react'
import s from './Theme.module.css'
import Image from 'next/image'

export default function Theme() {
  return (
    <div className={s.theme}>
      <Image src='/images/dark-theme.png' alt='Dark theme' width={35} height={35}/>
    </div>
  )
}
