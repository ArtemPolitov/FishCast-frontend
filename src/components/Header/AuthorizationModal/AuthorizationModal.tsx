import React, { ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { Dispatch, SetStateAction } from "react";
import { useState } from 'react';
import s from './AuthorizationModal.module.css'
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface AuthorizationModal{
  isAuthorizationModalOpen:boolean,
  setIsAuthorizationModalOpen:Dispatch<SetStateAction<boolean>>,
}

const AuthorizationModal:React.FC<AuthorizationModal> = ({isAuthorizationModalOpen,setIsAuthorizationModalOpen}) =>{
  const [modalType,setModalType] = useState('auth');

  const [authEmailInputData,setAuthEmailInputData] = useState<string>('');
  const [authEmailInputError,setAuthEmailInputError] = useState('');

  const [authPasswordInputData,setAuthPasswordInputData] = useState('');
  const [authPasswordInputError,setAuthPasswordInputError] = useState('');

  const [regNameInputData,setRegNameInputData] = useState('');
  const [regNameInputError,setRegNameInputError] = useState('');

  const [regEmailInputData,setRegEmailInputData] = useState('');
  const [regEmailInputError,setRegEmailInputError] = useState('');

  const [regPasswordInputData,setRegPasswordInputData] = useState('');
  const [regPasswordInputError,setRegPasswordInputError] = useState('');

  const [isAuthPasswordVisible,setIsAuthPasswordVisible] = useState(false);
  const [isRegPasswordVisible,setIsRegPasswordVisible] = useState(false);

  const modal = document.getElementById('modal-root');

  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);

  const authEmailHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    setAuthEmailInputData(e.target.value);
  }

  const authPasswordHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    setAuthPasswordInputData(e.target.value);
  }

  const regNameHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value.replace(/\d/g, ''); // Убираем цифры
    setRegNameInputData(value);
  }

  const regEmailHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    setRegEmailInputData(e.target.value);
  }

  const regPasswordHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    setRegPasswordInputData(e.target.value);
  }

  const closeModal = () =>{
    setModalType('auth');
    setIsAuthorizationModalOpen(false);
    setAuthEmailInputData('');
    setAuthEmailInputError('');
    setAuthPasswordInputData('');
    setAuthPasswordInputError('');
    setRegNameInputData('');
    setRegNameInputError('');
    setRegEmailInputData('');
    setRegEmailInputError('');
    setRegPasswordInputData('');
    setRegPasswordInputError('');
    setIsAuthPasswordVisible(false);
    setIsRegPasswordVisible(false);
  }

  const nameValidation = (name:string):boolean =>{
    const nameRegex = /^[A-Za-zА-Яа-яёЁ\s]{2,}$/;
    return nameRegex.test(name);
  }

  const emailValidation = (email:string):boolean =>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const passwordValidation = (password:string):boolean =>{
    const passwordRegex = /^[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  const handleAuth = (event: React.FormEvent) =>{
    event.preventDefault();
    let isFormValid = true;

    if(!authEmailInputData){
      setAuthEmailInputError('Введите Email!');
      isFormValid = false;
    }else if(!emailValidation(authEmailInputData)){
      setAuthEmailInputError('Введите корректный Email!');
      isFormValid = false
    }else{
      setAuthEmailInputError('');
    }

    if(!authPasswordInputData){
      setAuthPasswordInputError('Введите пароль!');
      isFormValid = false;
    }else{
      setAuthPasswordInputError('');
    }
    
    return isFormValid; // Если все валидно, отправляем данные
  }

  const handleReg = (event: React.FormEvent) =>{
    event.preventDefault();
    let isFormValid = true;

    if(!regNameInputData){
      setRegNameInputError('Введите имя!');
      isFormValid = false;
    }else if(!nameValidation(regNameInputData)){
      setRegNameInputError('Введите корректное имя!');
      isFormValid = false;
    }else{
      setRegNameInputError('');
    }

    if(!regEmailInputData){
      setRegEmailInputError('Введите Email!');
      isFormValid = false;
    }else if(!emailValidation(regEmailInputData)){
      setRegEmailInputError('Введите корректный Email!');
      isFormValid = false;
    }else{
      setRegEmailInputError('');
    }

    if(!regPasswordInputData){
      setRegPasswordInputError('Введите пароль');
      isFormValid = false;
    }else if(!passwordValidation(regPasswordInputData)){
      setRegPasswordInputError('Пароль должен быть минимум 8 символов');
      isFormValid = false;
    }else{
      setRegPasswordInputError('');
    }

    return isFormValid; // Если все валидно, отправляем данные
  }

  const authChangePasswordVisibilityHandler = () =>{
    setIsAuthPasswordVisible(prev=>!prev);
  }

  const regChangePasswordVisibilityHandler = () =>{
    setIsRegPasswordVisible(prev=>!prev);
  }

  if(modal&&isAuthorizationModalOpen){
    return(
      createPortal(
        <div className={s.overlay} onClick={closeModal}>
          <div className={`${s.modal} ${currentTheme==='dark'?s.dark:''}`} onClick={(e)=>e.stopPropagation()}>
            {modalType==='auth'&&<div className={s.authModal}>
              <h2 className={s.modalTitle}>{currentLanguage==='ru'?'Вход':'Вхід'}</h2>
              <p>{currentLanguage==='ru'?'Авторизуйтесь для доступа к полному функционалу сайта':'Авторизуйтесь для доступу до повного функціоналу сайту'}</p>
              <form action="" className={s.authForm} onSubmit={handleAuth} noValidate>
                <input type="text" placeholder="Email" onChange={authEmailHandler} name='authEmail' className={`${authEmailInputError?s.inputError:s.formInput}`} onClick={()=>setAuthEmailInputError('')}/>
                {authEmailInputError&&<p className={`${s.errorMessage} ${s.authEmailErrorMessage}`}>{authEmailInputError}</p>}
                <div className={s.passwordInputWrapper}>
                  <input type={isAuthPasswordVisible?"text":"password"} placeholder="Пароль" onChange={authPasswordHandler} className={`${authPasswordInputError?s.  inputError:s.formInput}`} onClick={()=>setAuthPasswordInputError('')}/>
                  {
                    currentTheme==='light'?
                    <button className={s.setPasswordVisibility} onClick={authChangePasswordVisibilityHandler} type="button">
                      {isAuthPasswordVisible?<Image src='/images/non_visible.png' alt='Set visibility' width={27} height={20}/>:<Image  src='/images/visible.png' alt='Set visibility' width={27} height={20}/>}
                    </button>:
                    <button className={s.setPasswordVisibility} onClick={authChangePasswordVisibilityHandler} type="button">
                      {isAuthPasswordVisible?<Image src='/images/non_visible_dark.png' alt='Set visibility' width={27} height={20}/>:<Image src='/images/visible_dark.png' alt='Set visibility' width={27} height={20}/>}
                    </button>
                  }
                </div>
                {authPasswordInputError&&<p className={`${s.errorMessage} ${s.authPasswordErrorMessage}`}>{authPasswordInputError}</p>}
                <button className={s.mainBtn} type="submit">{currentLanguage==='ru'?'Войти':'Увійти'}</button>
              </form>
              <div className={s.bottomBlock}>
                <p>{currentLanguage==='ru'?'Еще нет аккаунта?':'Ще немає облікового запису?'}</p>
                <button onClick={()=>setModalType('reg')}>{currentLanguage==='ru'?'Зарегистрироваться':'Зареєструватись'}</button>
              </div>
            </div>}
            {modalType==='reg'&&<div className={s.regModal}>
              <h2 className={s.modalTitle}>{currentLanguage==='ru'?'Регистрация':'Реєстрація'}</h2>
              <form action="" className={s.regForm} onSubmit={handleReg} noValidate>
                <input type="text" placeholder={currentLanguage==='ru'?'Имя':'Ім’я'} onChange={regNameHandler} className={regNameInputError?s.inputError:s.formInput} onClick={()=>setRegNameInputError('')} value={regNameInputData}/>
                {regNameInputError&&<p className={`${s.regErrorMessage} ${s.regNameErrorMessage}`}>{regNameInputError}</p>}
                <input type="text" placeholder="Email" onChange={regEmailHandler} className={regEmailInputError?s.inputError:s.formInput} onClick={()=>setRegEmailInputError('')}/>
                {regEmailInputError&&<p className={`${s.regErrorMessage} ${s.regEmailErrorMessage}`}>{regEmailInputError}</p>}
                <div className={s.passwordInputWrapper}>
                  <input type={isRegPasswordVisible?"text":"password"} placeholder="Пароль" onChange={regPasswordHandler} className={regPasswordInputError?s. inputError:s.formInput} onClick={()=>setRegPasswordInputError('')}/>
                  {
                    currentTheme==='light'?
                    <button className={s.setPasswordVisibility} onClick={regChangePasswordVisibilityHandler} type="button">
                      {isRegPasswordVisible?<Image src='/images/non_visible.png' alt='Set visibility' width={27} height={20}/>:<Image src='/images/visible.png' alt='Set visibility' width={27} height={20}/>}
                    </button>:
                    <button className={s.setPasswordVisibility} onClick={regChangePasswordVisibilityHandler} type="button">
                      {isRegPasswordVisible?<Image src='/images/non_visible_dark.png' alt='Set visibility' width={27} height={20}/>:<Image src='/images/visible_dark.png' alt='Set visibility' width={27} height={20}/>}
                    </button>
                  }
                </div>
                {regPasswordInputError&&<p className={`${s.regErrorMessage} ${s.regPasswordErrorMessage}`}>{regPasswordInputError}</p>}
                <button className={s.mainBtn} type="submit">{currentLanguage==='ru'?'Зарегистрироваться':'Зареєструватись'}</button>
              </form>
              <div className={s.bottomBlock}>
                <p>{currentLanguage==='ru'?'Уже есть аккаунт?':'Вже є обліковий запис?'}</p>
                <button onClick={()=>setModalType('auth')}>{currentLanguage==='ru'?'Войти':'Увійти'}</button>
              </div>
            </div>}
          </div>
        </div>,modal
      )
    )
  }
}

export default AuthorizationModal;
