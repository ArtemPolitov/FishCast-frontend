import React from 'react'
import s from './AuthorizationButton.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface AuthorizationButtonProps{
  onClick:() => void;
}

const AuthorizationButton:React.FC<AuthorizationButtonProps> = ({onClick}) =>{
  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);

  return (
    <div>
      <button className={s.loginButton} onClick={onClick}>
        <div className={s.buttonImage}>
          {
            currentTheme==='light'?
            <Image src='/images/login-icon-light-theme.png' alt='Login' height={30} width={30}/>:
            <Image src='/images/login-icon-dark-theme.png' alt='Login' height={30} width={30}/>
          }
        </div>
        <p>Войти</p>
      </button>
    </div>
  )
}
export default AuthorizationButton;
