import { CaseApis } from "apis";
import { ICaseRemovedSubjects } from "apis/cases";
import { IBranch, ISortColumn } from "interfaces/common";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  BRI_USE_QUERY_REQUEST_KEY_NAMES,
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from "scripts/constants";
import RemovedSubjectsView from "./RemovedSubjectsView";
import { CaseDetailActionPrivilegeMap } from "interfaces/case";

export type SortableCaseRemovedSubjectColumns = 
  "totalTransactions" |
  "totalTransactionAmount"
;
export interface ICaseRemovedSubjectsQueryParamsState {
  pageNumber: number;
  pageSize: number;
  searchKeyword: string;
  branchIds: string[];
  sort?: ISortColumn<SortableCaseRemovedSubjectColumns>[];
}

const RemovedSubjectsContainer = ({
  isGettingCaseDetails,
  privilegeMap = {},
}: {
  isGettingCaseDetails: boolean;
  privilegeMap: CaseDetailActionPrivilegeMap;
}) => {
  const { caseId = "" } = useParams();

  const [queryParams, setQueryParams] =
    useState<ICaseRemovedSubjectsQueryParamsState>({
      pageNumber: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchKeyword: "",
      branchIds: [],
      sort: [],
    });

  const caseRemovedSubjectParams: ICaseRemovedSubjects = {
    paging: {
      pageNumber: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
    },
  };

  if (!isEmpty(queryParams?.sort)) {
    caseRemovedSubjectParams.sort = (queryParams?.sort ?? []).filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    !isEmpty(queryParams?.searchKeyword) ||
    !isEmpty(queryParams?.branchIds)
  ) {
    caseRemovedSubjectParams.searchValues = {};

    if (!isEmpty(queryParams?.searchKeyword)) {
      caseRemovedSubjectParams.searchValues.searchKeyword =
        queryParams?.searchKeyword;
    }

    if (!isEmpty(queryParams?.branchIds)) {
      caseRemovedSubjectParams.searchValues.branchIds = queryParams?.branchIds;
    }
  }

  const {
    isLoading: isGettingRemovedSubjects,
    data: removedSubjectsData,
  }: any = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_REMOVED_SUBJECTS,
      caseId,
      queryParams,
    ],
    () =>
      CaseApis.getCaseDetailsRemovedSubjects(caseId, caseRemovedSubjectParams),
    { enabled: !!caseId && !isGettingCaseDetails }
  );

  return (
    <RemovedSubjectsView
      {...{
        queryParams,
        setQueryParams,
        removedSubjectsData: removedSubjectsData?.data,
        isGettingRemovedSubjects:
          isGettingRemovedSubjects || isGettingCaseDetails,
        privilegeMap: privilegeMap,
      }}
    />
  );
};

export default RemovedSubjectsContainer;
