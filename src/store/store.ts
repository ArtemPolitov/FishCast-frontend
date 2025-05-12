import { configureStore } from '@reduxjs/toolkit';
import citySelectionReducer from './citySelectionSlice';
import geoDataReducer from './regionsDataSlice';
import { regionsApi } from '../services/regionsApi';
import { cityApi } from '@/services/cityApi';
import { fishApi } from '@/services/fishApi';
import { weatherApi } from '@/services/weatherApi';
import {locationsApi} from '@/services/locationsApi';
import fishDataReducer from './fishDataSlice';
import themeReducer from './themeSlice';
import localizationReducer from './localizationSlice';
import userReducer from './userSlice';
import { userApi } from '@/services/userApi';

export const store = configureStore({
  reducer: {
    'citySelection':citySelectionReducer,
    'geoData':geoDataReducer,
    'fishData':fishDataReducer,
    'theme':themeReducer,
    'localization':localizationReducer,
    'user':userReducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [fishApi.reducerPath]: fishApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [userApi.reducerPath]:userApi.reducer,
  }, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(regionsApi.middleware).concat(cityApi.middleware).concat(fishApi.middleware).concat(weatherApi.middleware).concat(locationsApi.middleware).concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;