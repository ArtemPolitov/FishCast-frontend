import { SelectedFishData } from '@/store/fishDataSlice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { regionsApi } from '../services/regionsApi';  // Импортируем наше API

interface GeoDataState {
  regions: any[];  // Массив с регионами
  selectedRegionData:SelectedRegionData|null,
  isLoading: boolean;  // Статус загрузки
  error: string | null;  // Ошибки
}

export interface SelectedRegionData {
  _id:string,
  name:string,
  id:number,
  name_uk:string,
  name_en:string,
}

const initialState: GeoDataState = {
  regions: [],
  selectedRegionData: null,
  isLoading: false,
  error: null,
};

const geoDataSlice = createSlice({
  name: 'geoData',  // Название слайса
  initialState,
  reducers: {
    setSelectedRegionData: (state, action: PayloadAction<SelectedRegionData>) => {
      state.selectedRegionData = action.payload;  // Сохраняем выбранный регион
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(regionsApi.endpoints.getRegions.matchPending, (state) => {
        state.isLoading = true;  // Устанавливаем статус загрузки
      })
      .addMatcher(regionsApi.endpoints.getRegions.matchFulfilled, (state, action) => {
        state.isLoading = false;  // Статус загрузки завершен
        state.regions = action.payload;  // Сохраняем регионы в стейт
      })
      .addMatcher(regionsApi.endpoints.getRegions.matchRejected, (state, action) => {
        state.isLoading = false;  // Статус загрузки завершен
        state.error = action.error.message || 'Ошибка при загрузке регионов';  // Сохраняем ошибку
      });
  },
});

export const { setSelectedRegionData } = geoDataSlice.actions; 

export default geoDataSlice.reducer;
