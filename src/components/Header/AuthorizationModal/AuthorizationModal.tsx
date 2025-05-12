import React, { ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { Dispatch, SetStateAction } from "react";
import { useState } from 'react';
import s from './AuthorizationModal.module.css'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetRegionsQuery } from '@/services/regionsApi';
import { useGetCitiesByRegionIdQuery } from '@/services/cityApi';
import { useRegisterMutation,useLoginMutation } from '@/services/userApi';
import { RegisterData,LoginData } from '@/services/userApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setIsUserAuthorized } from '@/store/userSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { setIsUserCitySelectionPermitted } from '@/store/citySelectionSlice';

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

  const [selectedRegionId,setSelectedRegionId] = useState<number|null>(null);
  const [selectedRegionIdError,setSelectedRegionIdError] = useState('');

  const [selectedCityId,setSelectedCityId] = useState<number|null>();
  const [selectedCityIdError,setSelectedCityIdError] = useState('');

  const [isAuthModalIsOpenFromReg,setIsAuthModalIsOpenFromReg] = useState(false);

  const modal = document.getElementById('modal-root');

  const currentTheme = useSelector((state:RootState)=>state.theme.currentTheme);
  const currentLanguage = useSelector((state:RootState)=>state.localization.currentLanguage);

  const {data:regionsData} = useGetRegionsQuery();

  const dispatch = useDispatch();

  const authEmailHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    setAuthEmailInputData(e.target.value);
  }

  const authPasswordHandler = (e:ChangeEvent<HTMLInputElement>) =>{
    setAuthPasswordInputData(e.target.value);
  }

  const regNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setRegNameInputData(e.target.value);
  };

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
    setSelectedCityId(null);
    setSelectedRegionId(null);
    setIsAuthModalIsOpenFromReg(false);
    setLoginErrorText(null);
    setSelectedRegionIdError('');
    setSelectedCityIdError('');
  }

  const nameValidation = (name: string): boolean => {
    const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ0-9\s]{2,}$/;
    return nameRegex.test(name);
  };

  const emailValidation = (email:string):boolean =>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const passwordValidation = (password:string):boolean =>{
    const passwordRegex = /^[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  }

  const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === 'object' &&
      error !== null &&
      'status' in error;
  };

  const [loginErrorText,setLoginErrorText] = useState<string|null>(null);

  const [login] = useLoginMutation();

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginErrorText(null);

    let isFormValid = true;
    let loginData: LoginData = {
      email: '',
      password: ''
    };

    if (!authEmailInputData) {
      setAuthEmailInputError(currentLanguage === 'ru' ? 'Введите Email!' : 'Введіть Email!');
      isFormValid = false;
    } else if (!emailValidation(authEmailInputData)) {
      setAuthEmailInputError(currentLanguage === 'ru' ? 'Введите корректный Email!' : 'Введіть правильний Email!');
      isFormValid = false;
    } else {
      setAuthEmailInputError('');
      loginData.email = authEmailInputData;
    }

    if (!authPasswordInputData) {
      setAuthPasswordInputError(currentLanguage === 'ru' ? 'Введите пароль!' : 'Введіть пароль!');
      isFormValid = false;
    } else {
      setAuthPasswordInputError('');
      loginData.password = authPasswordInputData;
    }

    if (isFormValid) {
      try {
        const { token } = await login(loginData).unwrap();
        localStorage.setItem('token', token);
        dispatch(setIsUserAuthorized());
        dispatch(setIsUserCitySelectionPermitted(true));
        closeModal();
      } catch (err) {
        if (isFetchBaseQueryError(err)) {
          const errorMessage = (err.data as { message?: string })?.message;
          if (errorMessage === 'Пользователь не найден') {
            setLoginErrorText(currentLanguage === 'ru' ? 'Пользователь не найден' : 'Користувача не знайдено');
          }
          if (errorMessage === 'Неверный пароль') {
            setLoginErrorText(currentLanguage === 'ru' ? 'Неверный пароль' : 'Невірний пароль');
          }
        }
      }
    }
  };

  const [register] = useRegisterMutation();

  const handleReg = async (event: React.FormEvent) =>{
    event.preventDefault();
    let isFormValid = true;
    let regData: RegisterData = {
      name: "",  
      email: "",
      password: "",
    };

    if(!regNameInputData){
      setRegNameInputError(currentLanguage==='ru'?'Введите имя!':"Введіть ім'я!");
      isFormValid = false;
    }else if(!nameValidation(regNameInputData)){
      setRegNameInputError(currentLanguage==='ru'?'Введите корректное имя!':"Введіть коректне ім'я!");
      isFormValid = false;
    }else{
      setRegNameInputError('');
      regData.name = regNameInputData;
    }

    if(!regEmailInputData){
      setRegEmailInputError(currentLanguage==='ru'?'Введите Email!':'Введіть Email!');
      isFormValid = false;
    }else if(!emailValidation(regEmailInputData)){
      setRegEmailInputError(currentLanguage==='ru'?'Введите корректный Email!':'Введіть правильний Email!');
      isFormValid = false;
    }else{
      setRegEmailInputError('');
      regData.email = regEmailInputData;
    }

    if(!selectedRegionId){
      setSelectedRegionIdError(currentLanguage==='ru'?'Выберите область!':'Виберіть область!');
      isFormValid = false;
    }else{
      setSelectedRegionIdError('');
      regData.regionId = selectedRegionId;
    }

    if(!selectedCityId){
      setSelectedCityIdError(currentLanguage==='ru'?'Выберите город!':'Виберіть місто!');
      isFormValid = false;
    }else{
      setSelectedCityIdError('');
      regData.cityId = selectedCityId;
    }

    if(!regPasswordInputData){
      setRegPasswordInputError(currentLanguage==='ru'?'Введите пароль':'Введіть пароль');
      isFormValid = false;
    }else if(!passwordValidation(regPasswordInputData)){
      setRegPasswordInputError(currentLanguage==='ru'?'Пароль должен быть минимум 8 символов':'Пароль має бути мінімум 8 символів');
      isFormValid = false;
    }else{
      setRegPasswordInputError('');
      regData.password = regPasswordInputData;
    }

    if (isFormValid) {
      try {
        await register(regData).unwrap();
        setIsAuthModalIsOpenFromReg(true);
        setModalType('auth');
        setRegNameInputData('');
        setRegNameInputError('');
        setRegEmailInputData('');
        setRegEmailInputError('');
        setRegPasswordInputData('');
        setRegPasswordInputError('');
        setSelectedRegionIdError('');
        setSelectedCityIdError('');
        setIsRegPasswordVisible(false);
      } catch (err: any) {
        const message =
          currentLanguage === 'ru'
            ? 'Пользователь с таким email уже существует!'
            : 'Користувач з таким email вже існує!';
        setRegEmailInputError(message);
      }
    }
  }

  const authChangePasswordVisibilityHandler = () =>{
    setIsAuthPasswordVisible(prev=>!prev);
  }

  const regChangePasswordVisibilityHandler = () =>{
    setIsRegPasswordVisible(prev=>!prev);
  }

  const regionSelectHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setSelectedRegionId(+e.target.value);
  }

  const { data: citiesByRegionData } = useGetCitiesByRegionIdQuery(selectedRegionId ?? skipToken);

  const citySelectHandler = (e:ChangeEvent<HTMLSelectElement>) =>{
    setSelectedCityId(+e.target.value);
  }

  const openRegModal = () => {
    setAuthEmailInputData('');
    setAuthEmailInputError('');
    setAuthPasswordInputData('');
    setAuthPasswordInputError('');
    setIsAuthPasswordVisible(false);
    setLoginErrorText(null);
    setModalType('reg');
  }

  const openAuthModal = () => {
    setRegNameInputData('');
    setRegNameInputError('');
    setRegEmailInputData('');
    setRegEmailInputError('');
    setRegPasswordInputData('');
    setRegPasswordInputError('');
    setIsRegPasswordVisible(false);
    setSelectedCityId(null);
    setSelectedRegionId(null);
    setSelectedRegionIdError('');
    setSelectedCityIdError('');
    setModalType('auth');
  }

  if(modal&&isAuthorizationModalOpen){
    return(
      createPortal(
        <div className={s.overlay} onClick={closeModal}>
          <div className={`${s.modal} ${currentTheme==='dark'?s.dark:''}`} onClick={(e)=>e.stopPropagation()}>
            {modalType==='auth'&&<div className={s.authModal}>
              <h2 className={s.modalTitle}>{currentLanguage==='ru'?'Вход':'Вхід'}</h2>
              {
                isAuthModalIsOpenFromReg===true&&
                <div style={{display:'flex',gap:'5px'}}>
                  <Image src={`/images/${currentTheme==='dark'?'accept_icon_dark.png':'accept_icon.png'}`} alt='success-icon' height={20} width={20}/>
                  <p className={s.successLabel}>{currentLanguage==='ru'?'Пользователь зарегистрирован!':'Користувач успішно зареєстрований!'}</p>
                </div>
              }
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
                {
                  loginErrorText&&<p className={`${s.errorMessage} ${s.authPasswordErrorMessage}`}>{loginErrorText}</p>
                }
                <button className={s.mainBtn} type="submit">{currentLanguage==='ru'?'Войти':'Увійти'}</button>
              </form>

              {isAuthModalIsOpenFromReg===false&&<div className={s.bottomBlock}>
                <p>{currentLanguage==='ru'?'Еще нет аккаунта?':'Ще немає облікового запису?'}</p>
                <button onClick={openRegModal}>{currentLanguage==='ru'?'Зарегистрироваться':'Зареєструватись'}</button>
              </div>}
            </div>}
            {
            modalType==='reg'&&<div className={s.regModal}>
              <h2 className={s.modalTitle}>{currentLanguage==='ru'?'Регистрация':'Реєстрація'}</h2>
              <form action="" className={s.regForm} onSubmit={handleReg} noValidate>
                <input type="text" placeholder={currentLanguage==='ru'?'Имя':'Ім’я'} onChange={regNameHandler} className={regNameInputError?s.inputError:s.formInput} onClick={()=>setRegNameInputError('')} value={regNameInputData}/>
                {regNameInputError&&<p className={`${s.regErrorMessage} ${s.regNameErrorMessage}`}>{regNameInputError}</p>}
                <input type="text" placeholder="Email" onChange={regEmailHandler} className={regEmailInputError?s.inputError:s.formInput} onClick={()=>setRegEmailInputError('')}/>
                {regEmailInputError&&<p className={`${s.regErrorMessage} ${s.regEmailErrorMessage}`}>{regEmailInputError}</p>}
                <select name="region-reg" id="region-reg-select" className={s.select} onChange={regionSelectHandler} value={selectedRegionId??""}>
                  <option value={""} disabled className={s.defaultOption}>
                    {currentLanguage==='ru'?'Выберите область':'Оберіть область'}
                  </option>
                  {regionsData&&regionsData.map(region=>{
                    return(
                      <option key={region.id} value={region.id}>{currentLanguage==='ru'?region.name:region.name_uk}</option>
                    )
                  })}
                </select>
                {selectedRegionIdError&&<p className={`${s.regErrorMessage} ${s.regRegionSelectErrorMessage}`}>{selectedRegionIdError}</p>}
                <select name="city-reg" id="city-reg-select" className={s.select} onChange={citySelectHandler} value={selectedCityId??""} disabled={!selectedRegionId}>
                  <option value="" disabled className={s.defaultOption}>
                      {currentLanguage==='ru'?'Выберите нас. пункт':'Оберіть нас. пункт'}
                  </option>
                  {
                    citiesByRegionData?.map(item=>{
                      return(
                        <option value={item.id} key={item.id}>{currentLanguage==='ru'?item.name:item.name_uk}</option>
                      )
                    })
                  }
                </select>
                {!selectedRegionIdError&&selectedCityIdError&&<p className={`${s.regErrorMessage} ${s.regCitySelectErrorMessage}`}>{selectedCityIdError}</p>}
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
                <button onClick={openAuthModal}>{currentLanguage==='ru'?'Войти':'Увійти'}</button>
              </div>
            </div>
            }
          </div>
        </div>,modal
      )
    )
  }
}

export default AuthorizationModal;
