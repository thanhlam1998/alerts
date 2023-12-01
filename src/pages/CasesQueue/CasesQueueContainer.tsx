import { CaseApis, GeneralApis } from "apis";
import { IGetCasesQueueQuery, SortableCaseQueueItemColumns } from "apis/cases";
import useOnChangeFilter from "hooks/useOnChangeFilter";
import useSearchParams from "hooks/useSearchParams";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  CASES_QUEUE_QUERY_PARAM_NAMES,
  CASE_STATUS_FOR_TAB_ENUM,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "scripts/constants";
import CasesQueueView from "./CasesQueueView";
import { ISortColumn } from "interfaces/common";

const CasesQueueContainer = () => {
  const QUERY_DATA = useSearchParams();
  const onChangeFilter = useOnChangeFilter();

  const {
    [CASES_QUEUE_QUERY_PARAM_NAMES.STATUS]:
      tabSelected = CASE_STATUS_FOR_TAB_ENUM.OPEN,

    [CASES_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]:
      pageNumber = DEFAULT_PAGE_INDEX,
    [CASES_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: pageSize = DEFAULT_PAGE_SIZE,

    [CASES_QUEUE_QUERY_PARAM_NAMES.KEYWORD]: keyword = "",
    [CASES_QUEUE_QUERY_PARAM_NAMES.PRIORITIES]: priorities = [],
    [CASES_QUEUE_QUERY_PARAM_NAMES.CATEGORIES]: categories = [],
    [CASES_QUEUE_QUERY_PARAM_NAMES.APPROVAL_STATUSES]: approvalStatuses = [],
  } = QUERY_DATA;

  const isOpenCasesQueueTab = tabSelected === CASE_STATUS_FOR_TAB_ENUM.OPEN;

  const [sortBy, setSortBy] = useState<ISortColumn<SortableCaseQueueItemColumns>[]>([]);

  const casesQueueRequestParams: IGetCasesQueueQuery = {
    paging: {
      pageNumber: +pageNumber,
      pageSize: +pageSize,
    },
  };

  if (!isEmpty(sortBy)) {
    casesQueueRequestParams.sort = sortBy.filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    `${keyword ?? ""}`?.length >= 3 ||
    !isEmpty(priorities) ||
    !isEmpty(categories) ||
    !isEmpty(approvalStatuses)
  ) {
    casesQueueRequestParams.searchValues = {};

    if (`${keyword ?? ""}`?.length >= 3) {
      casesQueueRequestParams.searchValues.searchKeyword = keyword;
    }

    if (!isEmpty(priorities)) {
      casesQueueRequestParams.searchValues.priorities = priorities;
    }

    if (!isEmpty(categories)) {
      casesQueueRequestParams.searchValues.categories = categories;
    }

    if (!isEmpty(approvalStatuses)) {
      casesQueueRequestParams.searchValues.approvalStatuses = approvalStatuses;
    }
  }

  const { isLoading: isGettingCasesQueue, data: casesQueueData } = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASES_QUEUE,
      {
        tabSelected,
        pageNumber,
        pageSize,
        sortBy,
        keyword,
        priorities,
        categories,
        approvalStatuses,
      },
    ],
    () =>
      isOpenCasesQueueTab
        ? CaseApis.getOpenCasesQueue(casesQueueRequestParams)
        : CaseApis.getClosedCasesQueue(casesQueueRequestParams)
  );

  const { isLoading: isGettingCaseCategories, data: caseCategoriesData }: any =
    useQuery(
      [BRI_USE_QUERY_REQUEST_KEY_NAMES.GENERAL.GET_CASE_CATEGORIES],
      GeneralApis.getCaseCategories
    );

  const onPageChange = (pageNumber?: number, pageSize?: number) => {
    onChangeFilter({
      ...QUERY_DATA,
      [CASES_QUEUE_QUERY_PARAM_NAMES.PAGE_NUMBER]: pageNumber,
      [CASES_QUEUE_QUERY_PARAM_NAMES.PAGE_SIZE]: pageSize,
    });
  };

  return (
    <CasesQueueView
      {...{
        isGettingCaseCategories,
        caseCategoriesData: caseCategoriesData?.data ?? [],

        prioritiesSelected: priorities,
        categoriesSelected: categories,
        approvalStatusesSelected: approvalStatuses,

        isGettingCasesQueue,
        casesQueueData: casesQueueData?.data ?? [],

        setSortBy,
        sortBy,
        onPageChange,
        pageNumber: +pageNumber,
        pageSize: +pageSize,
        isOpenCasesQueueTab,
      }}
    />
  );
};

export default CasesQueueContainer;
