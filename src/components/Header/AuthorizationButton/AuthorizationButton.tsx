import React from 'react'
import s from './AuthorizationButton.module.css'
import Image from 'next/image'

interface AuthorizationButtonProps{
  onClick:() => void;
}

const AuthorizationButton:React.FC<AuthorizationButtonProps> = ({onClick}) =>{
  return (
    <div>
      <button className={s.loginButton} onClick={onClick}>
        <div className={s.buttonImage}><Image src='/images/login-icon-light-theme.png' alt='Login' height={30} width={30}/></div>
        <p>Войти</p>
      </button>
    </div>
  )
}
export default AuthorizationButton;
