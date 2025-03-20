import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';  // Импортируем наше API

interface GeoDataState {
  regions: any[];  // Массив с регионами
  isLoading: boolean;  // Статус загрузки
  error: string | null;  // Ошибки
}

const initialState: GeoDataState = {
  regions: [],
  isLoading: false,
  error: null,
};

const geoDataSlice = createSlice({
  name: 'geoData',  // Название слайса
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getRegions.matchPending, (state) => {
        state.isLoading = true;  // Устанавливаем статус загрузки
      })
      .addMatcher(api.endpoints.getRegions.matchFulfilled, (state, action) => {
        state.isLoading = false;  // Статус загрузки завершен
        state.regions = action.payload;  // Сохраняем регионы в стейт
      })
      .addMatcher(api.endpoints.getRegions.matchRejected, (state, action) => {
        state.isLoading = false;  // Статус загрузки завершен
        state.error = action.error.message || 'Ошибка при загрузке регионов';  // Сохраняем ошибку
      });
  },
});

export default geoDataSlice.reducer;
