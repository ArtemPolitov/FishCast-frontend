import { configureStore } from '@reduxjs/toolkit';
import citySelectionReducer from './citySelectionSlice';
import geoDataReducer from './geoDataSlice';
import { api } from '../services/api'; // Импортируем созданный API

export const store = configureStore({
  reducer: {
    'citySelection':citySelectionReducer,
    'geoData':geoDataReducer,
    [api.reducerPath]: api.reducer, // Добавляем редюсер для RTK Query
  }, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Добавляем middleware для RTK Query
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;