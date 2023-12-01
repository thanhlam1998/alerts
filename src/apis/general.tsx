import { API_SERVICES } from "scripts/constants";
import baseApi from "./baseApi";

export const getBranches = () => {
  return baseApi(`${API_SERVICES.GENERAL}/branches`, "GET");
};

export const getCaseCategories = () => {
  return baseApi(`${API_SERVICES.GENERAL}/case-categories`, "GET");
};

export const getAlertCategories = () => {
  return baseApi(`${API_SERVICES.GENERAL}/alert-categories`, "GET");
};
