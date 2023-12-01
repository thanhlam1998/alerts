import { CaseApis } from "apis";
import { ICaseUnassignedAlerts, SortableAlertListByCaseColumns } from "apis/cases";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import { IGetAlertCategoriesProps, ISortColumn } from "interfaces/common";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  RANGE_PICKER_FORMAT_DASH,
} from "scripts/constants";
import { isTimeRangeValueValid, parseTimeRangeValue } from "scripts/helpers";
import UnassignedAlertsView from "./UnassignedAlertsView";
import { CaseDetailActionPrivilegeMap } from "interfaces/case";
import dayjs from "dayjs";

export interface ICaseUnassignedAlertsQueryParamsState extends ITimeRangeValue {
  pageNumber: number;
  pageSize: number;
  startDateTime: null | number;
  endDateTime: null | number;
  categories: string[];
  sort?: ISortColumn<SortableAlertListByCaseColumns>[];
}

interface IUnassignedAlertsContainerProps extends IGetAlertCategoriesProps {
  isGettingCaseDetails: boolean;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const UnassignedAlertsContainer = ({
  isGettingAlertCategories,
  alertCategoriesData,
  isGettingCaseDetails,
  privilegeMap = {},
}: IUnassignedAlertsContainerProps) => {
  const { caseId = "" } = useParams();

  const [queryParams, setQueryParams] =
    useState<ICaseUnassignedAlertsQueryParamsState>({
      pageNumber: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      startDateTime: null,
      endDateTime: null,
      categories: [],
      sort: [],
      from: null,
      to: null,
    });

  const unassignedAlertsParams: ICaseUnassignedAlerts = {
    paging: {
      pageNumber: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
    },
  };

  if (!isEmpty(queryParams?.sort)) {
    unassignedAlertsParams.sort = (queryParams?.sort ?? []).filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    !isEmpty(queryParams?.categories) ||
    isTimeRangeValueValid({
      from: queryParams?.from,
      to: queryParams?.to,
    })
  ) {
    unassignedAlertsParams.searchValues = {};

    if (!isEmpty(queryParams?.categories)) {
      unassignedAlertsParams.searchValues.categories = queryParams?.categories;
    }

    if (
      isTimeRangeValueValid({
        from: queryParams?.from,
        to: queryParams?.to,
      })
    ) {
      const fromString: any = queryParams.from ? dayjs(queryParams.from * 1000).format(
        RANGE_PICKER_FORMAT_DASH,
      ) : "";
      const toString: any = queryParams.to ? dayjs(queryParams.to * 1000).format(RANGE_PICKER_FORMAT_DASH) : "";
      const parseTimeRangeValues = parseTimeRangeValue({ from: fromString, to: toString });
      unassignedAlertsParams.searchValues.startDateTime = parseTimeRangeValues.from;
      unassignedAlertsParams.searchValues.endDateTime = parseTimeRangeValues?.to;
    }
  }

  const {
    isLoading: isGettingUnassignedAlerts,
    data: unassignedAlertsData,
  }: any = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_UNASSIGNED_ALERTS,
      caseId,
      queryParams,
    ],
    () =>
      CaseApis.getCaseDetailsUnassignedAlerts(caseId, unassignedAlertsParams),
    { enabled: !!caseId }
  );

  const onChangeTimeRange = ({ from, to }: ITimeRangeValue) => {
    if (from !== null && to !== null) {
      setQueryParams({
        ...queryParams,
        from,
        to,
      });
    }
  };

  return (
    <UnassignedAlertsView
      {...{
        isGettingAlertCategories,
        alertCategoriesData,

        queryParams,
        setQueryParams,

        unassignedAlertsData: unassignedAlertsData?.data,
        isGettingUnassignedAlerts:
          isGettingUnassignedAlerts || isGettingCaseDetails,
        onChangeTimeRange,
        privilegeMap: privilegeMap,
      }}
    />
  );
};

export default UnassignedAlertsContainer;
