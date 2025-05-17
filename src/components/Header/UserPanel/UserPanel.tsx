import React from 'react';
import s from './UserPanel.module.css';
import { Dispatch, SetStateAction } from "react";
import { createPortal } from 'react-dom';
import { useGetUserDataQuery } from '@/services/userApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetCityByIdQuery } from '@/services/cityApi';
import { useGetRegionByIdQuery } from '@/services/regionsApi';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { LocationData } from '@/services/locationsApi';
import { useGetAllLocationsQuery } from '@/services/locationsApi';
import { UserData } from '@/services/userApi';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useRemoveLocationFromFavoritesMutation } from '@/services/userApi';
import { userLogout } from '@/store/userSlice';
import { useEffect,useState } from 'react';

interface UserPanelProps {
  isUserPanelOpen:boolean,
  setIsUserPanelOpen:Dispatch<SetStateAction<boolean>>,
}

const UserPanel: React.FC<UserPanelProps> = ({ isUserPanelOpen, setIsUserPanelOpen }) => {
  const [modal, setModal] = useState<HTMLElement | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useDispatch();
  const currentLanguage = useSelector((state: RootState) => state.localization.currentLanguage);
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  useEffect(() => {
    setModal(document.getElementById('modal-root'));
    setToken(localStorage.getItem('token'));
  }, []);

  const { data: userData, refetch: refetchUserData } = useGetUserDataQuery(
    token ? { token } : skipToken
  );

  const pathname = usePathname();

  const userRegionId = userData?.regionId;
  const {data:regionData} = useGetRegionByIdQuery(
    userRegionId??skipToken
  );

  const userCityId = userData?.cityId;
  const {data:cityData} = useGetCityByIdQuery(
    userCityId??skipToken
  )

  const [isUserPanelClosing,setIsUserPanelClosing] = useState(false);
  const [settingOverlayPermitted,setSettingOverlayPermitted] = useState(false);

  useEffect(()=>{
    if(isUserPanelOpen){
      const timer = setTimeout(()=>{
        setSettingOverlayPermitted(true);
      },200);
      setSettingOverlayPermitted(false);
      return()=>clearTimeout(timer);
    };

  },[isUserPanelOpen]);

  useEffect(()=>{
    if(isUserPanelClosing){
      const timer = setTimeout(()=>{
        setIsUserPanelClosing(false);
        setIsUserPanelOpen(false);
      },300);

      return()=>clearTimeout(timer);
    }
  },[isUserPanelClosing]);

  useEffect(() => {
    if (isUserPanelOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`; 
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isUserPanelOpen]);

  const userPanelClose = () =>{
    setIsUserPanelClosing(true)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        userPanelClose(); 
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const logoutButtonHandler = () => {
    localStorage.removeItem('token');
    dispatch(userLogout());
    userPanelClose();
  };

  const {data:locationsData} = useGetAllLocationsQuery();

  const getFavoriteLocationsData = (locationsData:LocationData[],userData:UserData):LocationData[] => {
    const favoriteLocationsData = locationsData.filter(item=>{
      return(
        userData.favoriteLocations.includes(item._id)
      )
    });
    return favoriteLocationsData;
  }

  const [removeLocation] = useRemoveLocationFromFavoritesMutation();

  const deleteFavoriteHandler = async (locationId:string,token:string) => {
    await removeLocation ({locationId:locationId,token});
    await refetchUserData();
  }


  if(modal&&isUserPanelOpen){
    return (
      createPortal(
        <div className={`${s.overlay} ${settingOverlayPermitted?s.enter:''} ${isUserPanelClosing?s.exit:''}`} onClick={userPanelClose}>
          <div className={`${s.userPanel} ${currentTheme==='dark'?s.dark:''} ${s.enter} ${isUserPanelClosing?s.exit:''}`} onClick={(e)=>e.stopPropagation()}>
            <Image src={`/images/close_icon${currentTheme==='dark'?'_dark':''}.png`} alt='close-icon' width={30} height={30} className={s.closeIcon} onClick={userPanelClose}/> 
            <div className={s.userInfo}>
              <div className={s.item} style={{gap:'4px'}}>
                <Image src={`/images/${currentTheme==='dark'?'login-icon-dark-theme':'login-icon-light-theme'}.png`} alt='user-icon' height={40} width={40} className={s.itemIcon}/>
                <p>{userData?.name}</p></div>
              <div className={s.item} style={{gap:'8px'}}>
                <Image src={`/images/email_icon${currentTheme==='dark'?'_dark':''}.png`} alt='user-icon' height={40} width={40} className={s.itemIcon}/>
                <p>{userData?.email}</p>
              </div>
              {userRegionId&&userCityId&&
                <div style={{display:'flex',alignItems:'center', gap:'5px'}} className={s.item}>
                  <Image src={`/images/position_icon${currentTheme==='dark'?'_dark':''}.png`} alt='user-icon' height={40} width={40} className={s.itemIcon}/>
                  <p> {currentLanguage==='ru'?`${cityData?.name}, ${regionData?.name}`:`${cityData?.name_uk}, ${regionData?.name_uk}`}</p>
                </div>
              }
            </div>
            <div className={`${s.favoriteLocations} ${currentTheme==='dark'?s.dark:''}`}>
              <div style={{display:'flex',gap:'7px', alignItems:'center'}}>
                <Image src={`/images/filled_love_icon${currentTheme==='dark'?'_dark':''}.png`} alt='user-icon' height={40} width={40} className={s.itemIcon}/>
                <p className={s.favoriteLocationsTitle}>{currentLanguage==='ru'?'Избранные локации':'Обрані локації'}</p>
              </div>
              
              {
               userData&&userData?.favoriteLocations.length>0?
                locationsData&&userData&&getFavoriteLocationsData(locationsData,userData).map(location=>{
                  const isActive = pathname === `/location/${location.slug}`;
                  return(
                    <div className={s.locationRow} key={location._id}>
                      <Link key={location._id} href={`/location/${location.slug}`} passHref>
                        <div className={`${s.locationCard} ${isActive?s.locationCardActive:''} ${currentTheme==='dark'?s.dark:''}`} key={location._id} onClick={userPanelClose}>
                          <div className={s.imageAndText}>
                            <div className={s.imgWrapper}><Image src={location.image_url} alt={'location img'} height={50} width={50}   className={s.locationImg}/></div>
                            <p className={s.locationInfo}>{`${currentLanguage==='ru'?location.name.ru:location.name.ua}`}</p>
                          </div>
                        </div>
                      </Link>
                      {token&&<div className={s.deleteIcon} onClick={()=>deleteFavoriteHandler(location._id,token)}>
                        <Image src={`/images/remove_icon${currentTheme==='dark'?'_dark':''}.png`} alt='remove-icon' height={22} width={22} className={s.deleteIconImg}/>
                      </div>}
                    </div>
                  )
                })
                :
                <p className={s.noFavoritesLabel}>{currentLanguage==='ru'?'Еще нет избранных локаций':'Ще немає обраних локацій'}</p>
              }
            </div>
            <button className={s.logoutButton} onClick={logoutButtonHandler}>{currentLanguage==='ru'?'Выйти':'Вийти'}</button>
          </div>
        </div>,modal
      )
    )
  }else return null;

}

export default UserPanel;
