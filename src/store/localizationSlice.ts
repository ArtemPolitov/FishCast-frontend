import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface LocalizationState {
  currentLanguage:string
}

const initialState:LocalizationState = {
  currentLanguage:'ua'
}

const localizationSlice = createSlice({
  name:"localization",
  initialState,
  reducers:{
    setLanguage:(state,action:PayloadAction<string>)=>{
      state.currentLanguage = action.payload;
    }
  }
});

export const {setLanguage} = localizationSlice.actions;
export default localizationSlice.reducer;