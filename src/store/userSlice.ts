import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction }  from "@reduxjs/toolkit";

interface UserState {
  isUserAuthorized: boolean;
  authorizationTrigger: number;
  authorizedUserData: UserData | null;
}

interface UserData {
  name: string;
  email: string;
  favoriteLocations: string[];
  cityId?: number;
  regionId?: number;
}

const initialState: UserState = {
  isUserAuthorized: false,
  authorizationTrigger: 0,
  authorizedUserData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsUserAuthorized: (state) => {
      state.isUserAuthorized = true;
    },
    setAuthorizedUserData: (state, action: PayloadAction<UserData>) => {
      state.authorizedUserData = action.payload;
    },
    userLogout: (state) => {
      state.isUserAuthorized = false;
      state.authorizedUserData = null;
      state.authorizationTrigger = 0; 
      localStorage.removeItem('token');
    },
    triggerAuthorizationUpdate: (state) => {
      state.authorizationTrigger += 1;
    },
  },
});

export const {
  setIsUserAuthorized,
  setAuthorizedUserData,
  userLogout,
  triggerAuthorizationUpdate,
} = userSlice.actions;

export default userSlice.reducer;
