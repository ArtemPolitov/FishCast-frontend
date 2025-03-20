import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface СitySelectionState{
  isCitySelected:boolean,
  selectedCityData: SelectedCityData | null;
}

interface SelectedCityData{
  name:string,
  name_uk:string,
  name_en:string,
  lon:number,
  lat:number,
  region_id:number,
  id: number,
  _id:string,
}

const initialState:СitySelectionState  = {
  isCitySelected:false,
  selectedCityData: null,
}

const citySelectionSlice = createSlice({
  name: "citySelection",
  initialState,
  reducers: {
    setIsCitySelected:(state,action:PayloadAction<boolean>)=>{
      state.isCitySelected=action.payload;
    },
    setSelectedCityData:(state,action:PayloadAction<SelectedCityData>)=>{
      state.selectedCityData=action.payload;
    }
  },
});

export const {setIsCitySelected,setSelectedCityData} = citySelectionSlice.actions
export default citySelectionSlice.reducer;
