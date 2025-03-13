import React from 'react'
import s from './Authorization.module.css'
import Image from 'next/image'

export default function Authorization() {
  return (
    <div>
      <button className={s.loginButton}>
        <Image src='/images/login-icon-light-theme.png' alt='Login' height={30} width={30}/>
        <p>Войти</p>
      </button>
    </div>
  )
}
