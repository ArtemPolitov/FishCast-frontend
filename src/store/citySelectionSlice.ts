import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface citySelectionState{
  isCitySelected:boolean,
}

const initialState:citySelectionState = {
  isCitySelected:false,
}

const citySelectionSlice = createSlice({
  name: "citySelection",
  initialState,
  reducers: {
    setIsCitySelected:(state,action:PayloadAction<boolean>)=>{
      state.isCitySelected=action.payload;
    }
  },
});

export const {setIsCitySelected} = citySelectionSlice.actions
export default citySelectionSlice.reducer;
