import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface СitySelectionState{
  isCitySelected:boolean,
  selectedCityData: SelectedCityData | null,
  isCityManuallySelected: boolean, 
  isUserCitySelectionPermitted:boolean
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

const initialState: СitySelectionState = {
  isCitySelected: false,
  selectedCityData: null,
  isCityManuallySelected: false,
  isUserCitySelectionPermitted:false
};

const citySelectionSlice = createSlice({
  name: "citySelection",
  initialState,
  reducers: {
    setIsCitySelected:(state,action:PayloadAction<boolean>)=>{
      state.isCitySelected=action.payload;
    },
    setSelectedCityData:(state,action:PayloadAction<SelectedCityData|null>)=>{
      state.selectedCityData=action.payload;
    },
    setIsCityManuallySelected: (state, action: PayloadAction<boolean>) => {
      state.isCityManuallySelected = action.payload;
    },
    setIsUserCitySelectionPermitted: (state,action: PayloadAction<boolean>)=>{
      state.isUserCitySelectionPermitted = action.payload;
    }
  },
});

export const {setIsCitySelected,setSelectedCityData,setIsCityManuallySelected,setIsUserCitySelectionPermitted} = citySelectionSlice.actions;
export default citySelectionSlice.reducer;
