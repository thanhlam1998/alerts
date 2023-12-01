import { API_SERVICES, HTTP_METHODS } from "scripts/constants";
import baseApi from "./baseApi";
import { ITimeRange } from "interfaces/common";
import { IAlertTrendContainerQueryParams } from "pages/Dashboard/AlertsDashboard/components/AlertTrend/AlertTrendContainer";
import { ICaseTrendContainerQueryParams } from "pages/Dashboard/CasesDashboard/components/CaseTrend/CaseTrendContainer";

export interface IDashboardAlertSummary extends ITimeRange {}
export const getDashboardAlertSummary = (data?: IDashboardAlertSummary) => {
  return baseApi(
    `${API_SERVICES.DASHBOARD}/alert-summary`,
    HTTP_METHODS.POST,
    data
  );
};

export interface IDashboardAlertReasons extends ITimeRange {}
export const getDashboardAlertReasons = (data?: IDashboardAlertReasons) => {
  return baseApi(
    `${API_SERVICES.DASHBOARD}/alert-reasons`,
    HTTP_METHODS.POST,
    data
  );
};

export interface IDashboardCaseSummary extends ITimeRange {}
export const getDashboardCaseSummary = (data: IDashboardAlertSummary) => {
  return baseApi(
    `${API_SERVICES.DASHBOARD}/case-summary`,
    HTTP_METHODS.POST,
    data
  );
};

export interface IDashboardCaseCategories extends ITimeRange {}
export const getDashboardCaseCategories = (data?: IDashboardCaseCategories) => {
  return baseApi(
    `${API_SERVICES.DASHBOARD}/case-categories`,
    HTTP_METHODS.POST,
    data
  );
};

export interface IDashboardAlertTrend
  extends ITimeRange,
    IAlertTrendContainerQueryParams {}
export const getDashboardAlertTrend = (data: IDashboardAlertTrend) => {
  return baseApi(
    `${API_SERVICES.DASHBOARD}/alert-trend`,
    HTTP_METHODS.POST,
    data
  );
};

export interface IDashboardCaseTrend
  extends ITimeRange,
    ICaseTrendContainerQueryParams {}
export const getDashboardCaseTrend = (data: IDashboardCaseTrend) => {
  return baseApi(
    `${API_SERVICES.DASHBOARD}/case-trend`,
    HTTP_METHODS.POST,
    data
  );
};
