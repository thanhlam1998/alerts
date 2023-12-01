import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  notification: {
    message: "",
  },
  currentLanguage: "en",
};

export const appSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hideNotification: (state) => {
      state.notification.message = "";
    },
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    changeLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const { hideNotification, showNotification, changeLanguage } =
  appSlice.actions;

export default appSlice.reducer;
