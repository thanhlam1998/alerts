import { IAmount } from "./common";

export interface IDashboardAlertSummary {
  totalOpenAlerts: number;
  totalCIFInvolved: number;
  totalTransactionAmount: IAmount | null;
}

export interface IDashboardCaseSummary {
  totalApprovedCases: number;
  totalCases: number;
  totalCIFInvolved: number;
  totalTransactionAmount: IAmount | null;
}

export interface IDashboardAlertReason {
  reasonName: string;
  numberOfAlerts: number;
  numberOfCIFs: number;
  totalTransactionAmount: IAmount;
}

export interface IDashboardCaseCategory {
  categoryName: string;
  numberOfCases: number;
  numberOfMainSubjects: number;
  numberOfIncidentalSubjects: number;
  totalTransactionAmount: IAmount;
}

export interface IDashboardAlertTrendSummary {
  timeRange: string;
  data: IDashboardAlertTrend[];
}

export interface IDashboardAlertTrend {
  name: string;
  value: number;
}

export interface IDashboardCaseTrendSummary {
  timeRange: string;
  data: IDashboardCaseTrend[];
}

export interface IDashboardCaseTrend {
  name: string;
  value: number;
}
