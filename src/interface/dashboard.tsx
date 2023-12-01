import { IAmount, IReasonProps } from "./alerts";

export interface IAlertTopReason {
  numOfAlerts: number;
  numOfEntities: number;
  reason: IReasonProps;
  totalAmount: IAmount;
}

export interface IDashboardClosedCase {
  indicator: string;
  numOfCases: number;
  numOfMainSubjects: IReasonProps;
  numOfIncidentalSubjects: IAmount;
}

export interface ITransactionStatistic {
  currency: string;
  data: ITransactionStatisticData[];
}

export interface ITransactionStatisticData {
  year: number;
  quarter: number;
  data: ITransactionStatisticDataDetail[];
}

export interface ITransactionStatisticDataDetail {
  name: "Count" | "Value";
  inflow: number;
  outflow: number;
  domestic: number;
}

export interface IForeignCountryInvolvedData {
  currency: string;
  data: IForeignCountryInvolvedDetail[];
}

export interface IForeignCountryInvolvedDetail {
  countryName: string;
  receivedValue: number;
  transferValue: number;
}

export interface ICaseStatistic {
  year: string;
  quarter: Quarter;
  data: ICaseStatisticData[];
}

export interface ICaseStatisticData {
  name: string;
  value: number;
}

export enum Quarter {
  Q1 = "Q1",
  Q2 = "Q2",
  Q3 = "Q3",
  Q4 = "Q4",
}

export interface ITransactionValueByLocationData {
  region?: string;
  province?: string;
  data: ITransactionValueByLocationDataItem[];
}

export interface ITransactionValueByLocationDataItem {
  name: "Count" | "Value";
  value: number;
}

export interface ITransactionValueByLocationStatistic {
  currency: string;
  data: ITransactionValueByLocationData[];
}
