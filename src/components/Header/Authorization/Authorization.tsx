import React from 'react'
import s from './Authorization.module.css'
import Image from 'next/image'

export default function Authorization() {
  return (
    <div>
      <button className={s.loginButton}>
        <div className={s.buttonImage}><Image src='/images/login-icon-light-theme.png' alt='Login' height={30} width={30}/></div>
        <p>Войти</p>
      </button>
    </div>
  )
}
