import { DashboardApis } from "apis";
import { IDashboardAlertTrend } from "apis/dashboard";
import useSearchParams from "hooks/useSearchParams";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DashboardAlertTrendBreakdownEnum,
  DashboardAlertTrendCalculationTypeEnum,
  DashboardAlertTrendTimeRangeEnum,
} from "scripts/constants";
import { isTimeRangeValueValid, parseTimeRangeValue } from "scripts/helpers";
import AlertTrendView from "./AlertTrendView";

export interface IAlertTrendContainerQueryParams {
  timeRange: DashboardAlertTrendTimeRangeEnum;
  breakdown: DashboardAlertTrendBreakdownEnum;
  calculationType: DashboardAlertTrendCalculationTypeEnum;
}

const AlertTrendContainer = () => {
  const QUERY_DATA = useSearchParams();

  const URLQueryParams = parseTimeRangeValue(QUERY_DATA);

  const [queryParams, setQueryParams] =
    useState<IAlertTrendContainerQueryParams>({
      timeRange: DashboardAlertTrendTimeRangeEnum.MONTHLY,
      breakdown: DashboardAlertTrendBreakdownEnum.TOTAL_AMOUNT,
      calculationType: DashboardAlertTrendCalculationTypeEnum.ALERT_STATUS,
    }); 

  const dashboardAlertSummaryParams: IDashboardAlertTrend = {
    timeRange: queryParams.timeRange,
    breakdown: queryParams.breakdown,
    calculationType: queryParams.calculationType,
  };

  if (
    isTimeRangeValueValid({
      from: URLQueryParams?.from,
      to: URLQueryParams?.to,
    })
  ) {
    dashboardAlertSummaryParams.startDateTime = URLQueryParams?.from;
    dashboardAlertSummaryParams.endDateTime = URLQueryParams?.to;
  }

  const { isLoading: isGettingAlertTrend, data: alertTrendData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.DASHBOARD.GET_ALERT_DASHBOARD_ALERT_TREND,
      dashboardAlertSummaryParams,
    ],
    () => DashboardApis.getDashboardAlertTrend(dashboardAlertSummaryParams)
  );

  return (
    <AlertTrendView
      {...{
        queryParams,
        setQueryParams,

        isGettingAlertTrend,
        alertTrendData: alertTrendData?.data,
      }}
    />
  );
};

export default AlertTrendContainer;
