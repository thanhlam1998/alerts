import { DashboardApis } from "apis";
import { IDashboardAlertReasons } from "apis/dashboard";
import useSearchParams from "hooks/useSearchParams";
import { useQuery } from "react-query";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES } from "scripts/constants";
import { isTimeRangeValueValid, parseTimeRangeValue } from "scripts/helpers";
import AlertReasonsView from "./AlertReasonsView";

const AlertReasonsContainer = () => {
  const QUERY_DATA = useSearchParams();

  const URLQueryParams = parseTimeRangeValue(QUERY_DATA);

  const alertsReasonParams: IDashboardAlertReasons = {};

  if (
    isTimeRangeValueValid({
      from: URLQueryParams?.from,
      to: URLQueryParams?.to,
    })
  ) {
    alertsReasonParams.startDateTime = URLQueryParams?.from;
    alertsReasonParams.endDateTime = URLQueryParams?.to;
  }

  const { isLoading: isGettingAlertReasons, data: alertReasonsData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.DASHBOARD
        .GET_ALERT_DASHBOARD_ALERT_REASONS,
      alertsReasonParams,
    ],
    () => DashboardApis.getDashboardAlertReasons(alertsReasonParams)
  );

  return (
    <AlertReasonsView
      {...{
        isGettingAlertReasons,
        alertReasonsData: alertReasonsData?.data ?? [],
      }}
    />
  );
};

export default AlertReasonsContainer;
