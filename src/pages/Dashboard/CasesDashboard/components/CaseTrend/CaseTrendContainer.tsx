import { DashboardApis } from "apis";
import { IDashboardCaseTrend } from "apis/dashboard";
import dayjs from "dayjs";
import useSearchParams from "hooks/useSearchParams";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DashboardCaseTrendBreakdownEnum,
  DashboardCaseTrendCalculationTypeEnum,
  DashboardCaseTrendTimeRangeEnum,
  RANGE_PICKER_FORMAT_DASH,
} from "scripts/constants";
import CaseTrendView from "./CaseTrendView";
import moment from "moment";

export interface ICaseTrendContainerQueryParams {
  timeRange: DashboardCaseTrendTimeRangeEnum;
  breakdown: DashboardCaseTrendBreakdownEnum;
  calculationType: DashboardCaseTrendCalculationTypeEnum;
}

const CaseTrendContainer = () => {
  const QUERY_DATA = useSearchParams();

  const { from, to }: any = QUERY_DATA;

  const [queryParams, setQueryParams] =
    useState<ICaseTrendContainerQueryParams>({
      timeRange: DashboardCaseTrendTimeRangeEnum.DAILY,
      breakdown: DashboardCaseTrendBreakdownEnum.TOTAL_AMOUNT,
      calculationType: DashboardCaseTrendCalculationTypeEnum.CASE_STATUS,
    });

  const dashboardCaseSummaryParams: IDashboardCaseTrend = {
    timeRange: queryParams.timeRange,
    breakdown: queryParams.breakdown,
    calculationType: queryParams.calculationType,
  };

  if (!isEmpty(from) && !isEmpty(to)) {
    dashboardCaseSummaryParams.startDateTime = moment.utc(from, RANGE_PICKER_FORMAT_DASH).unix();
    dashboardCaseSummaryParams.endDateTime = moment.utc(to, RANGE_PICKER_FORMAT_DASH).unix();
  }
  
  const { isLoading: isGettingCaseTrend, data: caseTrendData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.DASHBOARD.GET_ALERT_DASHBOARD_CASE_TREND,
      dashboardCaseSummaryParams,
    ],
    () => DashboardApis.getDashboardCaseTrend(dashboardCaseSummaryParams),
    {
      enabled:
        !!dashboardCaseSummaryParams.startDateTime && !!dashboardCaseSummaryParams.endDateTime,
    }
  );
  
  return (
    <CaseTrendView
      {...{
        queryParams,
        setQueryParams,

        isGettingCaseTrend,
        caseTrendData: caseTrendData?.data,
      }}
    />
  );
};

export default CaseTrendContainer;
