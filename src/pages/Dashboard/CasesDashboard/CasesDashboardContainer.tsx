import { DashboardApis } from "apis";
import { IDashboardCaseSummary } from "apis/dashboard";
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
import CasesDashboardView from "./CasesDashboardView";

const CasesDashboardContainer = () => {
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const URLQueryParams = parseTimeRangeValue(QUERY_DATA);

  const casesSummaryParams: IDashboardCaseSummary = {};

  if (
    isTimeRangeValueValid({
      from: URLQueryParams?.from,
      to: URLQueryParams?.to,
    })
  ) {
    casesSummaryParams.startDateTime = URLQueryParams?.from;
    casesSummaryParams.endDateTime = URLQueryParams?.to;
  }

  const { isLoading: isGettingCasesSummary, data: casesSummaryData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.DASHBOARD.GET_CASE_DASHBOARD_SUMMARY,
      casesSummaryParams,
    ],
    () => DashboardApis.getDashboardCaseSummary(casesSummaryParams)
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
    <CasesDashboardView
      {...{
        isGettingCasesSummary,
        casesSummaryData: casesSummaryData?.data,

        timeRangeValue: { from: URLQueryParams?.from, to: URLQueryParams?.to },
        onChangeTimeRange,
      }}
    />
  );
};

export default CasesDashboardContainer;
