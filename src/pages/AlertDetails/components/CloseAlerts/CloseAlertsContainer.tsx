import { AlertApis } from "apis";
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
import CloseAlertsView from "./CloseAlertsView";
import { IGetClosedAlerts } from "apis/alert";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import { ISortColumn } from "interfaces/common";
import dayjs from "dayjs";

interface ICloseAlertsContainer extends IAlertCategoriesData {
  onAlertRowClick: (alert: IAlertItemByCIF) => void;
}

export interface IClosedAlertsQueryParamsState extends ITimeRangeValue {
  closedPageNumber: number;
  closedPageSize: number;
  closedAlertCategories: string[];
}

const CloseAlertsContainer = ({
  onAlertRowClick = emptyFunction,
  isGettingAlertCategories,
  alertCategoriesData,
}: ICloseAlertsContainer) => {
  const { alertCIFNumber = "" } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [queryParams, setQueryParams] = useState<IClosedAlertsQueryParamsState>(
    {
      closedPageNumber: DEFAULT_PAGE_INDEX,
      closedPageSize: DEFAULT_PAGE_SIZE,
      closedAlertCategories: [],
      from: null,
      to: null,
    }
  );

  const [alertIdsSelected, setAlertIdsSelected] = useState<string[]>([]);

  const closedAlertsRequestParams: IGetClosedAlerts = {
    paging: {
      pageNumber: queryParams.closedPageNumber,
      pageSize: queryParams.closedPageSize,
    },
  };

  const [sortBy, setSortBy] = useState<ISortColumn[]>([]);
  if (!isEmpty(sortBy)) {
    closedAlertsRequestParams.sort = sortBy.filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    !isEmpty(queryParams.closedAlertCategories) ||
    isTimeRangeValueValid({
      from: queryParams?.from,
      to: queryParams?.to,
    })
  ) {
    closedAlertsRequestParams.searchValues = {};

    if (!isEmpty(queryParams.closedAlertCategories)) {
      closedAlertsRequestParams.searchValues.categories =
        queryParams.closedAlertCategories;
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
      closedAlertsRequestParams.searchValues.startDateTime = parseTimeRangeValues.from;
      closedAlertsRequestParams.searchValues.endDateTime = parseTimeRangeValues.to;
    }
  }

  // Get closed alerts
  const {
    isLoading: isGettingClosedAlerts,
    data: closeAlertsData,
    refetch: refetchClosedAlerts,
    isRefetching: isRefetchingClosedAlerts,
  } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_CLOSED_ALERTS,
      { alertCIFNumber, queryParams, sortBy },
    ],
    () => AlertApis.getClosedAlerts(alertCIFNumber, closedAlertsRequestParams),
    { enabled: !!alertCIFNumber }
  );

  const reOpenAlertsCallback = () => {
    toast.success(t("Re-open alerts successfully"));
    setAlertIdsSelected([]);
    refetchClosedAlerts();

    queryClient.invalidateQueries(
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_OPEN_ALERTS
    );
  };

  // Re-open alerts
  const { isLoading: isReOpeningAlerts, mutate: callReOpenAlerts } =
    useMutation(AlertApis.reOpenAlerts, {
      onSuccess: reOpenAlertsCallback,
    });

  const onReOpenAlertsButtonClick = () => {
    alertIdsSelected.length > 0 && callReOpenAlerts(alertIdsSelected);
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
    <CloseAlertsView
      {...{
        onAlertRowClick,

        isGettingClosedAlerts:
          isGettingClosedAlerts || isRefetchingClosedAlerts,
        closeAlertsData: closeAlertsData?.data,

        isReOpeningAlerts,
        onReOpenAlertsButtonClick,
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

export default CloseAlertsContainer;
