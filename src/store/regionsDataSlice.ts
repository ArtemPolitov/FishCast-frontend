import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { regionsApi } from '../services/regionsApi';  

interface GeoDataState {
  regions: any[];  
  selectedRegionData:SelectedRegionData|null,
  isLoading: boolean;  
  error: string | null;
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
  name: 'geoData',  
  initialState,
  reducers: {
    setSelectedRegionData: (state, action: PayloadAction<SelectedRegionData>) => {
      state.selectedRegionData = action.payload;  
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(regionsApi.endpoints.getRegions.matchPending, (state) => {
        state.isLoading = true;  
      })
      .addMatcher(regionsApi.endpoints.getRegions.matchFulfilled, (state, action) => {
        state.isLoading = false;  
        state.regions = action.payload;  
      })
      .addMatcher(regionsApi.endpoints.getRegions.matchRejected, (state, action) => {
        state.isLoading = false;  
        state.error = action.error.message || 'Ошибка при загрузке регионов';  
      });
  },
});

export const { setSelectedRegionData } = geoDataSlice.actions; 

export default geoDataSlice.reducer;
