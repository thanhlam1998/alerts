import { AlertApis } from "apis";
import { IGetOpenAlerts } from "apis/alert";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import { IAlertItemByCIF } from "interfaces/alertsQueue";
import { isEmpty } from "lodash";
import { IAlertCategoriesData } from "pages/AlertDetails/AlertDetailsView";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
  RANGE_PICKER_FORMAT_DASH,
} from "scripts/constants";
import { emptyFunction, isTimeRangeValueValid, parseTimeRangeValue } from "scripts/helpers";
import OpenAlertsView from "./OpenAlertsView";
import { ISortColumn } from "interfaces/common";
import dayjs from "dayjs";

interface OpenAlertsContainerProps extends IAlertCategoriesData {
  onAlertRowClick: (alert: IAlertItemByCIF) => void;
}

export interface IOpenAlertsQueryParamsState extends ITimeRangeValue {
  openPageNumber: number;
  openPageSize: number;
  openAlertCategories: string[];
}

const OpenAlertsContainer = ({
  onAlertRowClick = emptyFunction,
  isGettingAlertCategories,
  alertCategoriesData,
}: OpenAlertsContainerProps) => {
  const { t } = useTranslation();
  const { alertCIFNumber = "" } = useParams();
  const queryClient = useQueryClient();

  const [alertIdsSelected, setAlertIdsSelected] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState<IOpenAlertsQueryParamsState>({
    openPageNumber: DEFAULT_PAGE_INDEX,
    openPageSize: DEFAULT_PAGE_SIZE,
    openAlertCategories: [],
    from: null,
    to: null,
  });

  const openAlertsRequestParams: IGetOpenAlerts = {
    paging: {
      pageNumber: queryParams.openPageNumber,
      pageSize: queryParams.openPageSize,
    },
  };

  const [sortBy, setSortBy] = useState<ISortColumn[]>([]);
  if (!isEmpty(sortBy)) {
    openAlertsRequestParams.sort = sortBy.filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    !isEmpty(queryParams.openAlertCategories) ||
    isTimeRangeValueValid({
      from: queryParams?.from,
      to: queryParams?.to,
    })
  ) {
    openAlertsRequestParams.searchValues = {};

    if (!isEmpty(queryParams.openAlertCategories)) {
      openAlertsRequestParams.searchValues.categories =
        queryParams.openAlertCategories;
    }

    if (
      isTimeRangeValueValid({
        from: queryParams?.from,
        to: queryParams?.to,
      })
    ) {
      const fromString: any = queryParams.from ? dayjs(queryParams.from * 1000).format(
        RANGE_PICKER_FORMAT_DASH 
      ) : "";
      const toString: any = queryParams.to ? dayjs(queryParams.to * 1000).format(RANGE_PICKER_FORMAT_DASH) : "";
      const parseTimeRangeValues = parseTimeRangeValue({ from: fromString, to: toString });
      openAlertsRequestParams.searchValues.startDateTime = parseTimeRangeValues.from;
      openAlertsRequestParams.searchValues.endDateTime = parseTimeRangeValues.to;
    }
  }

  // Get open alerts
  const {
    isLoading: isGettingOpenAlerts,
    data: openAlertsData,
    refetch: refetchOpenAlerts,
    isRefetching: isRefetchingOpenAlerts,
  } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_OPEN_ALERTS,
      { alertCIFNumber, queryParams, sortBy },
    ],
    () => AlertApis.getOpenAlerts(alertCIFNumber, openAlertsRequestParams),
    { enabled: !!alertCIFNumber }
  );

  const closedAlertsCallback = () => {
    toast.success(t("Close alerts successfully"));
    setAlertIdsSelected([]);
    refetchOpenAlerts();
    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_CLOSED_ALERTS
    );
  };

  // Close alerts
  const { isLoading: isClosingAlerts, mutate: callCloseAlerts } = useMutation(
    AlertApis.closeAlerts,
    {
      onSuccess: closedAlertsCallback,
    }
  );

  const onCloseAlertsButtonClick = () => {
    alertIdsSelected.length > 0 && callCloseAlerts(alertIdsSelected);
  };

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
    <OpenAlertsView
      {...{
        openAlertsData: openAlertsData?.data,
        isGettingOpenAlerts: isGettingOpenAlerts || isRefetchingOpenAlerts,

        onAlertRowClick,

        isClosingAlerts,
        onCloseAlertsButtonClick,
        alertIdsSelected,
        setAlertIdsSelected,

        isGettingAlertCategories,
        alertCategoriesData,

        queryParams,
        setQueryParams,
        onChangeTimeRange,

        onSortChange: setSortBy,
        sortBy
      }}
    />
  );
};

export default OpenAlertsContainer;
