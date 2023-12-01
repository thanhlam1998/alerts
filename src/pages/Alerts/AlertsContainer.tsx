import { AlertApis, GeneralApis } from "apis";
import { IGetAlertsQueueParams } from "apis/alert";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { isEmpty, isString } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  ALERTS_QUEUE_QUERY_PARAM_NAMES,
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "scripts/constants";
import AlertsView from "./AlertsView";
import { ISortColumn } from "interfaces/common";

const AlertsContainer = () => {
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const {
    [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]:
      pageNumber = DEFAULT_PAGE_INDEX,
    [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: pageSize = DEFAULT_PAGE_SIZE,
    [ALERTS_QUEUE_QUERY_PARAM_NAMES.KEYWORD]: keyword = "",
    [ALERTS_QUEUE_QUERY_PARAM_NAMES.BRANCHES]: branches,
  } = QUERY_DATA;

  const [sortBy, setSortBy] = useState<ISortColumn[]>([]);

  const alertsQueueRequestParams: IGetAlertsQueueParams = {
    paging: {
      pageNumber: +pageNumber,
      pageSize: +pageSize,
    },
  };

  if (!isEmpty(sortBy)) {
    if (sortBy.find((item: any) => item.fieldKey === "totalTransactionAmountAmount")) {
      const amountIndex = sortBy.findIndex((item: any) => item.fieldKey === "totalTransactionAmountAmount");
      sortBy[amountIndex].fieldKey = "totalTransactionAmount";
    }
    alertsQueueRequestParams.sort = sortBy.filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (!isEmpty(keyword) || isString(branches)) {
    alertsQueueRequestParams.searchValues = {};

    if (!isEmpty(keyword)) {
      alertsQueueRequestParams.searchValues.customerName = keyword;
    }

    if (isString(branches)) {
      alertsQueueRequestParams.searchValues.branchIds = [branches];
    }
  }

  const { isLoading: isGettingAlertsQueue, data: alertsQueueData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_ALERTS_QUEUE,
      { pageNumber, pageSize, sortBy, keyword, branches },
    ],
    () => AlertApis.getAlertsQueue(alertsQueueRequestParams)
  );

  const { isLoading: isGettingBranches, data: branchesData } = useQuery(
    [BRI_USE_QUERY_REQUEST_KEY_NAMES.GENERAL.GET_BRANCHES],
    GeneralApis.getBranches
  );

  const onPageChange = (pageNumber?: number, pageSize?: number) => {
    onChangeFilter({
      ...QUERY_DATA,
      [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]: pageNumber,
      [ALERTS_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: pageSize,
    });
  };

  return (
    <AlertsView
      {...{
        loading: isGettingAlertsQueue,
        totalItems: alertsQueueData?.data?.total ?? 0,
        alertsQueueData: alertsQueueData?.data?.alerts ?? [],

        setSortBy,
        sortBy,

        onPageChange,
        pageNumber: +pageNumber,
        pageSize: +pageSize,

        isGettingBranches,
        branchesData: branchesData?.data ?? [],
        branches,
      }}
    />
  );
};

export default AlertsContainer;
