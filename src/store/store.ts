import { configureStore } from '@reduxjs/toolkit';
import citySelectionReducer from './citySelectionSlice';
import geoDataReducer from './regionsDataSlice';
import { regionsApi } from '../services/regionsApi'; // Импортируем созданный API
import { cityApi } from '@/services/cityApi';
import { fishApi } from '@/services/fishApi';
import { weatherApi } from '@/services/weatherApi';
import fishDataReducer from './fishDataSlice';

export const store = configureStore({
  reducer: {
    'citySelection':citySelectionReducer,
    'geoData':geoDataReducer,
    'fishData':fishDataReducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [fishApi.reducerPath]: fishApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(regionsApi.middleware).concat(cityApi.middleware).concat(fishApi.middleware).concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;