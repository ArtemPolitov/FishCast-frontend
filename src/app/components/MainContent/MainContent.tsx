'use client';

import React from 'react'
import s from './MainContent.module.css'
import { useSelector } from 'react-redux';
import type { RootState, AppDispatch} from '../../../store/store';

export default function MainContent() {
  const isCitySelected = useSelector((state: RootState) => state.citySelection.isCitySelected);

  return (
    <div className={s.mainContent}>
      {!isCitySelected ? (
        <p className={s.chooseCity}>Укажите Ваше местоположение</p>
      ) : (
        <div>
          {/* Ваш основной контент */}
        </div>
      )}
    </div>
  );
}

