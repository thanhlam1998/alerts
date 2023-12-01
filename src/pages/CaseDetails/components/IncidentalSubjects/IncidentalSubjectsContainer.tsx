import { CaseApis } from "apis";
import { ICaseIncidentalSubjects } from "apis/cases";
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
import IncidentalSubjectsView from "./IncidentalSubjectsView";
import { CaseDetailActionPrivilegeMap } from "interfaces/case";

export type SortableCaseIncidentalSubjectColumns = 
  "totalTransactions" |
  "totalTransactionAmount"
;

export interface ICaseIncidentalSubjectsQueryParamsState {
  pageNumber: number;
  pageSize: number;
  searchKeyword: string;
  branchIds: string[];
  sort?: ISortColumn<SortableCaseIncidentalSubjectColumns>[]; 
}

const IncidentalSubjectsContainer = ({
  isGettingCaseDetails,
  privilegeMap = {}
}: {
  isGettingCaseDetails: boolean;
  privilegeMap: CaseDetailActionPrivilegeMap;
}) => {
  const { caseId = "" } = useParams();

  const [queryParams, setQueryParams] =
    useState<ICaseIncidentalSubjectsQueryParamsState>({
      pageNumber: DEFAULT_PAGE_INDEX,
      pageSize: DEFAULT_PAGE_SIZE,
      searchKeyword: "",
      branchIds: [],
      sort: [],
    });

  const caseIncidentalSubjectParams: ICaseIncidentalSubjects = {
    paging: {
      pageNumber: queryParams.pageNumber,
      pageSize: queryParams.pageSize,
    },
  };

  if (!isEmpty(queryParams?.sort)) {
    caseIncidentalSubjectParams.sort = (queryParams?.sort ?? []).filter(sortItem => sortItem.sortOrder !== null && sortItem.sortOrder !== undefined);
  }

  if (
    !isEmpty(queryParams?.searchKeyword) ||
    !isEmpty(queryParams?.branchIds)
  ) {
    caseIncidentalSubjectParams.searchValues = {};

    if (!isEmpty(queryParams?.searchKeyword)) {
      caseIncidentalSubjectParams.searchValues.searchKeyword =
        queryParams?.searchKeyword;
    }

    if (!isEmpty(queryParams?.branchIds)) {
      caseIncidentalSubjectParams.searchValues.branchIds =
        queryParams?.branchIds;
    }
  }

  const {
    isLoading: isGettingIncidentalSubjects,
    data: incidentalSubjectsData,
  }: any = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.CASE.GET_CASE_DETAILS_INCIDENTAL_SUBJECTS,
      caseId,
      queryParams,
    ],
    () =>
      CaseApis.getCaseDetailsIncidentalSubjects(
        caseId,
        caseIncidentalSubjectParams
      ),
    { enabled: !!caseId && !isGettingCaseDetails }
  );

  return (
    <IncidentalSubjectsView
      {...{
        queryParams,
        setQueryParams,
        incidentalSubjectsData: incidentalSubjectsData?.data,
        isGettingIncidentalSubjects:
          isGettingIncidentalSubjects || isGettingCaseDetails,
        privilegeMap: privilegeMap,
      }}
    />
  );
};

export default IncidentalSubjectsContainer;
