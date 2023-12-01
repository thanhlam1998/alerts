import { API_SERVICES } from "scripts/constants";
import baseApi from "./baseApi";

export const callLogIn = (payload: any = {}) => {
  return baseApi(`${API_SERVICES.AUTH}/login`, "POST", payload);
};

export const callLogout = () => {
  return baseApi(`${API_SERVICES.AUTH}/logout`, "GET");
};

export const callForgotPassword = (payload: any = {}) => {
  return baseApi(`${API_SERVICES.AUTH}/forgot-password`, "POST", payload);
};

export const callResetPassword = (payload: any = {}) => {
  return baseApi(
    `${API_SERVICES.AUTH}/verify-forgot-password`,
    "POST",
    payload
  );
};
