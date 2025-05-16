import React, { useEffect } from 'react';
import s from './AuthorizationButton.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetUserDataQuery } from '@/services/userApi';
import { useGetCityByIdQuery } from '@/services/cityApi';
import { useGetRegionByIdQuery } from '@/services/regionsApi';
import { setIsCitySelected, setSelectedCityData } from '@/store/citySelectionSlice';
import { setSelectedRegionData } from '@/store/regionsDataSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { setIsUserCitySelectionPermitted } from '@/store/citySelectionSlice';


interface AuthorizationButtonProps {
  onClick: () => void;
}

const AuthorizationButton: React.FC<AuthorizationButtonProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);
  const currentLanguage = useSelector((state: RootState) => state.localization.currentLanguage);
  const isUserAuthorized = useSelector((state: RootState) => state.user.isUserAuthorized);
  //const isUserCitySelectionPermitted = useSelector((state:RootState)=>state.citySelection.isUserCitySelectionPermitted);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data: userData, refetch: refetchUserData } = useGetUserDataQuery(token ? { token } : skipToken);
  const { data: userCityData } = useGetCityByIdQuery(userData?.cityId ?? skipToken);
  const { data: userRegionData } = useGetRegionByIdQuery(userData?.regionId ?? skipToken);

  useEffect(() => {
    if(isUserAuthorized){
      dispatch(setIsCitySelected(true));
      userCityData&&dispatch(setSelectedCityData(userCityData));
      localStorage.setItem('selectedCityData', JSON.stringify(userCityData));
      userRegionData&&dispatch(setSelectedRegionData(userRegionData));
      localStorage.setItem('selectedRegionData', JSON.stringify(userRegionData));
      dispatch(setIsUserCitySelectionPermitted(false));
    }
    
  }, [
    userCityData,
    userRegionData,
  ]);

  return (
    <div>
      <button className={s.loginButton} onClick={onClick}>
        <div className={s.buttonImage}>
          <Image
            src={
              currentTheme === 'light'
                ? '/images/login-icon-light-theme.png'
                : '/images/login-icon-dark-theme.png'
            }
            alt="Login"
            height={30}
            width={30}
          />
        </div>
        <p>
          {isUserAuthorized
            ? userData?.name
            : currentLanguage === 'ru'
              ? 'Войти'
              : 'Увійти'}
        </p>
      </button>
    </div>
  );
};

export default AuthorizationButton;
