import { DashboardApis } from "apis";
import { IDashboardAlertSummary } from "apis/dashboard";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import dayjs from "dayjs";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { useQuery } from "react-query";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  RANGE_PICKER_FORMAT_DASH,
} from "scripts/constants";
import { isTimeRangeValueValid, parseTimeRangeValue } from "scripts/helpers";
import AlertsDashboardView from "./AlertsDashboardView";

const AlertsDashboardContainer = () => {
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const URLQueryParams = parseTimeRangeValue(QUERY_DATA);

  const alertsSummaryParams: IDashboardAlertSummary = {};

  if (
    isTimeRangeValueValid({
      from: URLQueryParams?.from,
      to: URLQueryParams?.to,
    })
  ) {
    alertsSummaryParams.startDateTime = URLQueryParams?.from;
    alertsSummaryParams.endDateTime = URLQueryParams?.to;
  }

  const { isLoading: isGettingAlertsSummary, data: alertsSummaryData } =
    useQuery(
      [
        BRI_USE_QUERY_REQUEST_KEY_NAMES.DASHBOARD.GET_ALERT_DASHBOARD_SUMMARY,
        alertsSummaryParams,
      ],
      () => DashboardApis.getDashboardAlertSummary(alertsSummaryParams),
      {
        enabled: isTimeRangeValueValid({
          from: URLQueryParams?.from,
          to: URLQueryParams?.to,
        }),
      }
    );

  const onChangeTimeRange = ({ from, to }: ITimeRangeValue) => {
    if (from !== null && to !== null) {
      const fromString: any = dayjs(from * 1000).format(
        RANGE_PICKER_FORMAT_DASH
      );
      const toString: any = dayjs(to * 1000).format(RANGE_PICKER_FORMAT_DASH);

      onChangeFilter({
        ...QUERY_DATA,
        from: fromString,
        to: toString,
      });
    }
  };

  return (
    <AlertsDashboardView
      {...{
        isGettingAlertsSummary,
        alertsSummaryData: alertsSummaryData?.data,

        timeRangeValue: { from: URLQueryParams?.from, to: URLQueryParams?.to },
        onChangeTimeRange,
      }}
    />
  );
};

export default AlertsDashboardContainer;
