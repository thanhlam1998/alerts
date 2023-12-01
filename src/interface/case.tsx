import { IAlertPriority, IAmount, IReasonProps } from "./alerts";
import { UserProps } from "./User";

export type ICaseStatus ='ONGOING'|'CLOSED'

export interface ICase {
  caseNumber: string;
  mainSubjectName: string;
  closedDate: number;
  priority: IAlertPriority;
  suspicionScore: number;
  findings: IFinding[];
  assignee: UserProps;
  numOfMainSubjects: number;
  numOfIncidentalSubjects: number;
  numOfNewAlerts: number;
  numOfSTRs: number;
  numOfCTRs: number;
  status: ICaseStatus;
  creationDateTime: number;
  closingInfo: IClosingInfo;
  mainSubjectNumber: string;
}

export interface IAdditionalCaseInfo {
  code: string;
  name: string;
  countries: Country[];
  description: string;
}

export interface ICountry {
  flag: string;
  name: string;
  iso2Code: string;
  iso3Code: string;
}

export interface ISuspectedPredicateCrimes {
  code: string;
  name: string;
  description: string;
  likelihoodEstimation: number;
}


export interface ICaseSubject {
  subjectName: string;
  subjectNumber: string;
  address: string;
  totalAmount: IAmount;
  debitAmount: IAmount;
  creditAmount: IAmount;
  numOfSTRs: number;
  numOfCTRs: number;
}



export interface ILinkedCases {
  caseStatus: ICaseStatus;
  caseNumber: string;
  mainSubject: string;
  entityNumber: string;
  numOfLinkedMainSubjects: number;
  numOfIncidentalSubjects: number;
}

export interface ICaseTransition {
  entityName: string;
  entityNumber: string;
  timeRange: string;
  reasons: IReasonProps[];
  totalAmount: IAmount;
  debitAmount: IAmount;
  creditAmount: IAmount;
  numOfSTRs: number;
  numOfCTRs: number;
}

export interface IFinding {
  code: string;
  name: string;
  description: string;
}

export interface IClosingInfo {
  suspicionScore: number;
  suspectedPredicateCrimes: SuspectedPredicateCrimeClosingInfo[];
  findings: IFinding[];
  additionalCaseInfo: AdditionalCaseInfoClosingInfo[];
  notes: string;
}

export interface SuspectedPredicateCrime extends AdditionalCaseInformation {}

export interface SuspectedPredicateCrimeClosingInfo {
  code: string;
  name: string;
  description: string;
  likelihoodEstimation: number;
}
export interface AdditionalCaseInformation {
  code: string;
  name: string;
  description: string;
}

export interface AdditionalCaseInfoClosingInfo {
  code: string;
  name: string;
  description: string;
  countries?: Country[];
}

export interface Country {
  name: string;
  iso2Code: string;
  iso3Code: string;
  flag: string;
}