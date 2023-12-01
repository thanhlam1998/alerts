import { CaseApis } from "apis";
import { ICaseRelatedAlerts, SortableAlertListByCaseColumns } from "apis/cases";
import { ITimeRangeValue } from "components/RangePicker/RangePicker";
import { CaseDetailActionPrivilegeMap, ICaseCategory } from "interfaces/case";
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
import RelatedAlertsView from "./RelatedAlertsView";
import dayjs from "dayjs";

export interface ICaseRelatedAlertsQueryParamsState extends ITimeRangeValue {
  pageNumber: number;
  pageSize: number;
  startDateTime: null | number;
  endDateTime: null | number;
  categories: string[];
  sort?: ISortColumn<SortableAlertListByCaseColumns>[];
}

interface IRelatedAlertsContainerProps extends IGetAlertCategoriesProps {
  isGettingAlertCategories: boolean;
  alertCategoriesData?: ICaseCategory[];
  isGettingCaseDetails: boolean;
  privilegeMap: CaseDetailActionPrivilegeMap;
}

const RelatedAlertsContainer = ({
  isGettingAlertCategories,
  alertCategoriesData,
  isGettingCaseDetails,
  privilegeMap,
}: IRelatedAlertsContainerProps) => {
  const { caseId = "" } = useParams();

  const [queryParams, setQueryParams] =
    useState<ICaseRelatedAlertsQueryParamsState>({
      pageNumber: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      startDateTime: null,
      endDateTime: null,
      categories: [],
      sort: [],
      from: null,
      to: null,
    });

  const relatedAlertsParams: ICaseRelatedAlerts = {
    paging: {
      pageNumber: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
    },
  };

  if (!isEmpty(queryParams?.sort)) {
    relatedAlertsParams.sort = (queryParams?.sort ?? []).filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    !isEmpty(queryParams?.categories) ||
    isTimeRangeValueValid({
      from: queryParams?.from,
      to: queryParams?.to,
    })
  ) {
    relatedAlertsParams.searchValues = {};

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
      relatedAlertsParams.searchValues.startDateTime = parseTimeRangeValues.from;
      relatedAlertsParams.searchValues.endDateTime = parseTimeRangeValues.to;
    }

    if (!isEmpty(queryParams?.categories)) {
      relatedAlertsParams.searchValues.categories = queryParams?.categories;
    }
  }

  const { isLoading: isGettingRelatedAlerts, data: relatedAlertsData }: any =
    useQuery(
      [
        BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_RELATED_ALERTS,
        caseId,
        queryParams,
      ],
      () => CaseApis.getCaseDetailsRelatedAlerts(caseId, relatedAlertsParams),
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
    <RelatedAlertsView
      {...{
        isGettingAlertCategories,
        alertCategoriesData,

        queryParams,
        setQueryParams,

        relatedAlertsData: relatedAlertsData?.data,
        isGettingRelatedAlerts: isGettingRelatedAlerts || isGettingCaseDetails,
        onChangeTimeRange,

        privilegeMap: privilegeMap,
      }}
    />
  );
};

export default RelatedAlertsContainer;
