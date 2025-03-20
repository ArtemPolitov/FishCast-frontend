import { configureStore } from '@reduxjs/toolkit';
import citySelectionReducer from './citySelectionSlice';
import geoDataReducer from './regionsDataSlice';
import { regionsApi } from '../services/regionsApi'; // Импортируем созданный API
import { cityApi } from '@/services/cityApi';

export const store = configureStore({
  reducer: {
    'citySelection':citySelectionReducer,
    'geoData':geoDataReducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(regionsApi.middleware).concat(cityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;