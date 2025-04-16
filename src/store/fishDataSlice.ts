import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface FishDataState {
 isFishSelected:boolean,
 selectedFishData:SelectedFishData|null
}

export type FishGroup = 'peaceful' | 'predatory' | 'bleak' | 'bream' | 'pike' | 'rudd' | 'silver carp' | 'tench' | 'zander' | 'carp' | 'northern' | 'catfish' | 'goby' | 'saberfish' | 'ide';

export interface SelectedFishData {
  _id?:number,
  id:number,
  name:{
    en:string,
    ru:string,
    ua:string
  },
  description: {
    ru:string,
    ua:string,
  },
  preferred_weather: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  best_fishing_season: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  preferred_bait: {
    en: string[],
    ru: string[],
    ua: string[],
  },
  optimal_water_temperature: number[],
  optimal_pressure: number[],
  image_url: string,
  group:FishGroup
}

const initialState:FishDataState = {
  isFishSelected:false,
  selectedFishData:null
}

const fishDataSlice = createSlice({
  name:"fishData",
  initialState,
  reducers:{
    setIsFishSelected:(state,action:PayloadAction<boolean>)=>{
      state.isFishSelected = action.payload;
    },
    setSelectedFishData:(state,action:PayloadAction<SelectedFishData>)=>{
      state.selectedFishData = action.payload;
    }
  }
});

export const {setIsFishSelected,setSelectedFishData} = fishDataSlice.actions;
export default fishDataSlice.reducer;