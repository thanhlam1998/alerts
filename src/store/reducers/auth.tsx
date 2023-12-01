import { createSlice } from "@reduxjs/toolkit";
import { IAuth, IUser } from "interface/Login";

interface IAuthReducer {
  currentUser: IUser | null;
  currentAuth: IAuth | null;
}

const initialState: IAuthReducer = {
  currentAuth: null,
  currentUser: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    updateAuth: (state, action) => {
      state.currentAuth = { ...state.currentAuth, ...action.payload };
    },
    updateToken: (state, action) => {
      state.currentAuth = {
        refresh_token: state.currentAuth?.refresh_token ?? "",
        access_token: action.payload,
      };
    },
    logout: (state) => {
      state.currentAuth = null;
      state.currentUser = null;
    },
  },
});

export const { updateUserProfile, updateAuth, logout, updateToken } = authSlice.actions;

export default authSlice.reducer;
