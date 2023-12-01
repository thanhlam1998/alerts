import { IPaging, ISortColumn } from "interfaces/common";
import {
  API_SERVICES,
  AlertTransactionSummaryBreakdownEnum,
  AlertTransactionSummaryCalculationTypeEnum,
  AlertTransactionSummaryTimeRangeEnum,
  HTTP_METHODS,
} from "scripts/constants";
import baseApi from "./baseApi";

export type SortableAlertQueueItemColumns =
  | "customerPriority"
  | "aggregatedRiskScore"
  | "totalOpenAlerts"
  | "totalClosedAlerts"
  | "totalTransactionAmount"
  | "lastAlertDateTime";
export interface IGetAlertsQueueParams {
  paging: IPaging;
  searchValues?: {
    customerName?: string;
    branchIds?: string[];
  };
  sort?: ISortColumn[];
}

export const getAlertsQueue = (data: IGetAlertsQueueParams) => {
  return baseApi(API_SERVICES.ALERTS, HTTP_METHODS.POST, data);
};

export const getAlertDetails = (alertCIFNumber: string) => {
  return baseApi(`${API_SERVICES.ALERTS}/${alertCIFNumber}`, HTTP_METHODS.GET);
};

export interface IGetOpenAlerts {
  paging: IPaging;
  searchValues?: {
    categories?: string[];
    startDateTime?: number;
    endDateTime?: number;
  };
  sort?: {};
}

export const getOpenAlerts = (alertCIFNumber: string, data: IGetOpenAlerts) => {
  return baseApi(`${API_SERVICES.ALERTS}/${alertCIFNumber}/open-alerts`, HTTP_METHODS.POST, data);
};

export interface IGetClosedAlerts {
  paging: IPaging;
  searchValues?: {
    categories?: string[];
    startDateTime?: number;
    endDateTime?: number;
  };
  sort?: any;
}
export const getClosedAlerts = (alertCIFNumber: string, data: IGetClosedAlerts) => {
  return baseApi(`${API_SERVICES.ALERTS}/${alertCIFNumber}/closed-alerts`, HTTP_METHODS.POST, data);
};

export const getSummaryOfTransactions = (
  alertCIFNumber: string,
  {
    timeRange,
    breakdown,
    calculationType,
  }: {
    timeRange: AlertTransactionSummaryTimeRangeEnum;
    breakdown: AlertTransactionSummaryBreakdownEnum;
    calculationType: AlertTransactionSummaryCalculationTypeEnum;
  }
) => {
  return baseApi(`${API_SERVICES.ALERTS}/${alertCIFNumber}/transaction-summary`, HTTP_METHODS.POST, {
    timeRange,
    breakdown,
    calculationType,
  });
};

export const getNetworkConnectionGraph = (alertCIFNumber: string) => {
  return baseApi(`${API_SERVICES.ALERTS}/${alertCIFNumber}/network-connection-graph`, HTTP_METHODS.GET);
};

export const closeAlerts = (alertIds: string[]) => {
  return baseApi(`${API_SERVICES.ALERTS}/close`, HTTP_METHODS.PUT, {
    alertIds,
  });
};

export const reOpenAlerts = (alertIds: string[]) => {
  return baseApi(`${API_SERVICES.ALERTS}/re-open`, HTTP_METHODS.PUT, {
    alertIds,
  });
};

export interface IAssignAlertToCase {
  alertIds: string[];
  caseId: string;
}

export const assignAlertToCase = ({ alertIds, caseId }: IAssignAlertToCase) => {
  return baseApi(`${API_SERVICES.ALERTS}/assign`, HTTP_METHODS.PUT, {
    alertIds,
    caseId,
  });
};

export const getAlertQueue = () => {
  return baseApi(`${API_SERVICES.ALERTS}/queue`, HTTP_METHODS.GET);
};
