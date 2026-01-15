/** @format */

//Third party npm
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_details: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user_details = action.payload;
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },

    resetUserDetails: (state) => {
      state.user_details = null;
      state.token = null;
    },

   
  },
});

// Export actions and reducer
export const {
  setUserDetails,
  setToken,
  resetUserDetails,
  
} = userSlice.actions;
export default userSlice.reducer;
