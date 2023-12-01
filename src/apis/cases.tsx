import { IPaging, ISortColumn } from "interfaces/common";
import { SortableCaseIncidentalSubjectColumns } from "pages/CaseDetails/components/IncidentalSubjects/IncidentalSubjectsContainer";
import { SortableCaseRemovedSubjectColumns } from "pages/CaseDetails/components/RemovedSubjects/RemovedSubjectsContainer";
import {
  API_SERVICES,
  CASE_PRIORITIES,
  DECISION_ENUM,
  HTTP_METHODS,
} from "scripts/constants";
import baseApi from "./baseApi";

export interface ICreateCaseFromAlerts {
  alertIds: string[];
  makerEmail: string;
  priority: CASE_PRIORITIES;
  categories: string[];
  description?: string;
}

export const createCaseFromAlerts = (data: ICreateCaseFromAlerts) => {
  return baseApi(`${API_SERVICES.CASES}/new-case`, HTTP_METHODS.POST, data);
};

export type SortableCaseQueueItemColumns =
  | "createdDateTime"
  | "closedDateTime"
  | "totalAlert"
  | "totalIncidentalSubjects"
  | "totalTransaction"
  | "aggregatedRiskScore";
export interface IGetCasesQueueQuery {
  sort?: ISortColumn<SortableCaseQueueItemColumns>[] | undefined;
  paging: IPaging;
  searchValues?: {
    searchKeyword?: string;
    priorities?: string[];
    categories?: string[];
    approvalStatuses?: string[];
  };
}
export const getOpenCasesQueue = (data: IGetCasesQueueQuery) => {
  return baseApi(`${API_SERVICES.CASES}/open-cases`, HTTP_METHODS.POST, data);
};

export const getClosedCasesQueue = (data: IGetCasesQueueQuery) => {
  return baseApi(`${API_SERVICES.CASES}/closed-cases`, HTTP_METHODS.POST, data);
};

export const getCaseDetails = (caseId: string) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}`, HTTP_METHODS.GET);
};

export const getCaseDetailsMainSubject = (caseId: string) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/main-subject`,
    HTTP_METHODS.GET
  );
};

export interface ICaseIncidentalSubjects {
  sort?: ISortColumn<SortableCaseIncidentalSubjectColumns>[] | undefined;
  paging: IPaging;
  searchValues?: {
    searchKeyword?: string;
    startDateTime?: number;
    endDateTime?: number;
    accountNumbers?: string[];
    branchIds?: string[];
  };
}

export const getCaseDetailsIncidentalSubjects = (
  caseId: string,
  data: ICaseIncidentalSubjects
) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/incidental-subjects`,
    HTTP_METHODS.POST,
    data
  );
};

export interface ICaseRemovedSubjects {
  sort?: ISortColumn<SortableCaseRemovedSubjectColumns>[] | undefined;
  paging: IPaging;
  searchValues?: {
    searchKeyword?: string;
    startDateTime?: number;
    endDateTime?: number;
    accountNumbers?: string[];
    branchIds?: string[];
  };
}

export const getCaseDetailsRemovedSubjects = (
  caseId: string,
  data: ICaseRemovedSubjects
) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/removed-subjects`,
    HTTP_METHODS.POST,
    data
  );
};

export type SortableAlertListByCaseColumns =
  | "alertDateTime"
  | "riskScore"
  | "totalTransactions"
  | "totalTransactionAmount"
  | "totalTransactionCIFs";

export interface ICaseRelatedAlertsSearchValues {
  startDateTime?: number;
  endDateTime?: number;
  categories?: string[];
}

export interface ICaseRelatedAlerts {
  sort?: ISortColumn<SortableAlertListByCaseColumns>[] | undefined;
  paging: IPaging;
  searchValues?: ICaseRelatedAlertsSearchValues;
}

export const getCaseDetailsRelatedAlerts = (
  caseId: string,
  data: ICaseRelatedAlerts
) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/related-alerts`,
    HTTP_METHODS.POST,
    data
  );
};

export interface ICaseUnassignedAlerts extends ICaseRelatedAlerts {}

export const getCaseDetailsUnassignedAlerts = (
  caseId: string,
  data: ICaseUnassignedAlerts
) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/unassigned-alerts`,
    HTTP_METHODS.POST,
    data
  );
};

export interface IUpdateCaseData {
  priority: CASE_PRIORITIES;
  categories: string[];
  description?: string;
  decision: DECISION_ENUM;
  goamlReportNumber: string;
  ukerComment?: string;
  fiuRefNumber?: string;
}

export const updateCase = ({
  caseId,
  data,
}: {
  caseId: string;
  data: IUpdateCaseData;
}) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}`, HTTP_METHODS.PUT, data);
};

export interface IDetachAlertFromCase {
  caseId: string;
  alertId: string;
}
export const detachAlertFromCase = ({
  caseId,
  alertId,
}: IDetachAlertFromCase) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/detach-alert`,
    HTTP_METHODS.PUT,
    {
      alertId,
    }
  );
};

export interface IRemoveIncidentalSubject {
  caseId: string;
  cif: string;
  idType: string;
}
export const removeIncidentalSubject = ({
  caseId,
  cif,
  idType,
}: IRemoveIncidentalSubject) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/remove-incidental-subject`,
    HTTP_METHODS.PUT,
    {
      cif,
      idType,
    }
  );
};

export interface ISubmitCase {
  priority: CASE_PRIORITIES;
  categories: string[];
  description?: string;
  decision: DECISION_ENUM;
  checkerEmail: string;
  signerEmail: string;
}

export const submitCase = ({
  caseId,
  data,
}: {
  caseId: string;
  data: ISubmitCase;
}) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/submit`,
    HTTP_METHODS.PUT,
    data
  );
};

export const rejectCase = (caseId: string) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}/reject`, HTTP_METHODS.PUT);
};

export const approveCase = (caseId: string) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}/approve`, HTTP_METHODS.PUT);
};

export const reOpenCase = (caseId: string) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}/re-open`, HTTP_METHODS.PUT);
};

export const changeCasePriority = (
  caseId: string,
  priority: CASE_PRIORITIES
) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/change-priority`,
    HTTP_METHODS.PUT,
    { priority }
  );
};

export const addIncidentalSubject = (
  caseId: string,
  cif?: string,
  idType?: string
) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/add-incidental-subject`,
    HTTP_METHODS.PUT,
    { cif, idType }
  );
};

export const getActiveCases = (cif: string) => {
  return baseApi(`${API_SERVICES.CASES}/active-cases/${cif}`, HTTP_METHODS.GET);
};

export const createAdhocCase = (caseId: string) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/create-adhoc-case`,
    HTTP_METHODS.POST
  );
};

export interface IAddMakerToCase {
  caseId: string;
  makerId: string;
}

export const addMakerToCase = ({ caseId, makerId }: IAddMakerToCase) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/add-maker`,
    HTTP_METHODS.POST,
    {
      makerId,
    }
  );
};

export interface IRemoveMakerFromCase {
  caseId: string;
  makerId: string;
}

export const removeMakerFromCase = ({
  caseId,
  makerId,
}: IRemoveMakerFromCase) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/remove-maker`,
    HTTP_METHODS.PUT,
    {
      makerId,
    }
  );
};

export const getIdentitiesByCIF = (cif: string) => {
  return baseApi(`${API_SERVICES.CASES}/identities/${cif}`, HTTP_METHODS.GET);
};

export const exportCaseDetailByXML = (caseId: string) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}/export-xml`, "POST");
};

export const exportCaseDetailByCSV = (caseId: string) => {
  return baseApi(`${API_SERVICES.CASES}/${caseId}/export-csv`, "POST");
};

export const getNetworkConnectionGraph = (caseId: string) => {
  return baseApi(
    `${API_SERVICES.CASES}/${caseId}/network-connection-graph`,
    HTTP_METHODS.GET
  );
};
