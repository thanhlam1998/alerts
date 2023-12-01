import { EdgeTypeEnum, VertexTypeEnum } from "scripts/constants";
import { IAmount } from "./common";

export interface IAlertQueueItem {
  cif: string;
  customerName: string;
  branchName: string;
  customerPriority: string;
  aggregatedRiskScore: number;
  totalOpenAlerts: number;
  totalClosedAlerts: number;
  totalTransactionAmount: IAmount | null;
}

export interface IAlertReason {
  name: string;
  value: number;
}
export interface IAlertDetailIdentity {
  name: string;
  value: string | number;
}

export interface IAlertDetail {
  cif: string;
  customerName: string;
  phoneNumbers: string[];
  aggregatedRiskScore: number;
  customerPriority: string;
  totalOpenAlerts: number;
  inflowSummary: {
    frequency: number;
    amount: IAmount | null;
    parities: number; // UI show as Total CIF'S involved
  };
  outflowSummary: {
    frequency: number;
    amount: IAmount | null;
    parities: number; // UI show as Total CIF'S involved
  };
  alertReasons: IAlertReason[];
  identities: IAlertDetailIdentity[];
}

export interface IAlertCategory {
  name: string;
}

export interface IAlertItemByCIF {
  alertId: string;
  description: string;
  timestamp: number;
  riskScore: number;
  transactionCount: number;
  transactionAmount: IAmount;
  transactionCIFPairs: number;
  category: IAlertCategory;
  caseIds: string[];
}

export interface IVertex<T_Attr = any> {
  vId?: string;
  vType?: VertexTypeEnum;
  attributes?: T_Attr;
}

export interface IEdge<T_Attr = object> {
  toType?: EdgeTypeEnum;
  toId?: string;
  fromType?: EdgeTypeEnum;
  fromId?: string;
  directed?: boolean;
  eType?: string;
  attributes?: T_Attr;
}

export interface IAlertTransactionSummary {
  timeRange: string;
  data: IAlertTransactionSummaryItem[];
}

export interface IAlertTransactionSummaryItem {
  name: string;
  value: number;
}
