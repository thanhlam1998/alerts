import { DashboardApis } from "apis";
import { IDashboardCaseCategories } from "apis/dashboard";
import dayjs from "dayjs";
import useSearchParams from "hooks/useSearchParams";
import { isEmpty } from "lodash";
import { useQuery } from "react-query";
import { BRI_USE_QUERY_REQUEST_KEY_NAMES, RANGE_PICKER_FORMAT_DASH } from "scripts/constants";
import CaseCategoriesView from "./CaseCategoriesView";
import moment from "moment";

const CaseCategoriesContainer = () => {
  const QUERY_DATA = useSearchParams();

  const { from, to }: any = QUERY_DATA;

  const caseCategoriesParams: IDashboardCaseCategories = {};

  if (!isEmpty(from) && !isEmpty(to)) {
    caseCategoriesParams.startDateTime = moment.utc(from, RANGE_PICKER_FORMAT_DASH).unix();
    caseCategoriesParams.endDateTime = moment.utc(to, RANGE_PICKER_FORMAT_DASH).unix();
  }

  const { isLoading: isGettingCaseCategories, data: caseCategoriesData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.DASHBOARD.GET_CASE_DASHBOARD_CASE_CATEGORIES,
      caseCategoriesParams,
    ],
    () => DashboardApis.getDashboardCaseCategories(caseCategoriesParams),
    {
      enabled: !!caseCategoriesParams?.startDateTime && !!caseCategoriesParams?.endDateTime,
    }
  );

  return (
    <CaseCategoriesView
      {...{
        isGettingCaseCategories,
        caseCategoriesData: caseCategoriesData?.data ?? [],
      }}
    />
  );
};

export default CaseCategoriesContainer;
