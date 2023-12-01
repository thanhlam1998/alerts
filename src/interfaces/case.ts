import { EdgeTypeEnum, VertexTypeEnum } from "scripts/constants";
import {
  CASE_APPROVAL_STATUS_ENUM,
  CASE_PRIORITIES,
  DECISION_ENUM,
} from "scripts/constants";
import { IAlertCategory } from "./alertsQueue";
import { IAmount, IBranch } from "./common";

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

export interface ICaseCategory {
  id: string;
  name: string;
}

export interface ICaseQueueResult {
  total: number;
  cases: ICaseQueueItem[];
}

export interface ICaseQueueItem {
  caseId: string;
  createdDateTime: number | null;
  closedDateTime: number | null;
  mainSubject: ICaseQueueItemMainSubject | null;
  priority: CASE_PRIORITIES | null;
  categories: ICaseCategory[];
  totalAlerts: number;
  totalIncidentalSubjects: number;
  totalTransactions: number;
  aggregatedRiskScore: number;
  approvalStatus: CASE_APPROVAL_STATUS_ENUM | null;
}

export interface ICaseQueueItemMainSubject {
  cif: string;
  customerName: string;
}

export interface ICaseDetail {
  caseId: string;
  approvalStatus: CASE_APPROVAL_STATUS_ENUM | null;
  priority: CASE_PRIORITIES | null;
  mainSubject: ISubject | null;
  totalAlerts: number;
  totalIncidentalSubjects: number;
  totalTransactions: number;
  aggregatedRiskScore: number;
  categories: ICaseCategory[];
  decision: DECISION_ENUM;
  goamlReportNumber: string;
  description: string;
  createdDateTime: number | null;
  closedDateTime: number | null;
  ukerComment: string | null;
  fiuRefNumber: string | null;
  adhocCaseProcessing: boolean;
  adhocCaseId: string;
  makers: IUserListItem[];
  checkers: IUserListItem | null;
  signers: IUserListItem | null;
}

export interface IUserListItem {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  languageCode?: string;
  timezone?: string;
  role?: string;
  profilePictureUrl: string | null;
  password?: string;
  lastUpdatedOn: number | null;
}

export interface ISubject {
  cif: string;
  customerName: string;
}

export interface ICaseSubjectIdentity {
  name: string;
  value: string | number;
}

export interface ICaseSubjectFlowSummary {
  frequency: number;
  amount: IAmount | null;
  recipients: number;
}

export interface ICaseSubjectAccount {
  accountNumber: string;
  accountName: string;
  branchName: string;
  openDateTime: number | null;
}

export interface ICaseMainSubject {
  identities: ICaseSubjectIdentity[];
  totalTransactionFrequency: number;
  totalTransactionAmount: IAmount | null;
  inflowSummary: ICaseSubjectFlowSummary;
  outflowSummary: ICaseSubjectFlowSummary;
  accounts: ICaseSubjectAccount[];
}

export interface ICaseIncidentalSubjectResult {
  total: number;
  subjects: ICaseIncidentalSubject[];
  branches: IBranch[];
}

export interface ICaseIncidentalSubject {
  cif: string;
  customerName: string;
  timestamp: number | null;
  accountNumber: string;
  branchName: string;
  totalTransactions: number;
  totalTransactionAmount: IAmount | null;
  identities: ICaseIncidentalIdentity[];
  idType: string;
}

export interface ICaseRemovedSubjectResult {
  total: number;
  subjects: ICaseRemovedSubject[];
  branches: IBranch[];
}

export interface ICaseRemovedSubject {
  cif: string;
  customerName: string;
  timestamp: number | null;
  accountNumber: string;
  branchName: string;
  totalTransactions: number;
  totalTransactionAmount: IAmount | null;
  idType: string;
}

export interface IAlertByCase {
  alertId: string;
  description: string;
  alertDateTime: number | null;
  riskScore: number;
  totalTransactions: number;
  totalTransactionAmount: IAmount | null;
  totalTransactionCIFs: number;
  category: IAlertCategory | null;
}

export interface IAlertListByCaseResult {
  total: number;
  alerts: IAlertByCase[];
}

export interface ICaseIncidentalIdentity {
  name: string;
  value: string | number;
}

export enum CaseDetailActionEnum {
  REJECT = "REJECT",
  APPROVE = "APPROVE",
  SUBMIT = "SUBMIT",
  REOPEN = "RE-OPEN",
  CREATE_ADHOC_CASE = "CREATE_ADHOC_CASE",
  EDIT_CASE_INFO = "EDIT_CASE_INFO",
  CHANGE_PRIORITY = "CHANGE_PRIORITY",
  SEARCH_MAKER = "SEARCH_MAKER",
  ADD_MAKER = "ADD_MAKER",
  REMOVE_MAKER = "REMOVE_MAKER",
  REMOVE_SUBJECT_FROM_INCIDENTAL_SUBJECT = "REMOVE_SUBJECT_FROM_INCIDENTAL_SUBJECT",
  ADD_SUBJECT_TO_INCIDENTAL_SUBJECT = "ADD_SUBJECT_TO_INCIDENTAL_SUBJECT",
  REMOVE_ALERT_FROM_CASE = "REMOVE_ALERT_FROM_CASE",
  ADD_ALERT_TO_CASE = "ADD_ALERT_TO_CASE",
}

export type CaseDetailActionPrivilegeMap = {
  [CaseDetailActionEnum.APPROVE]?: boolean;
  [CaseDetailActionEnum.REJECT]?: boolean;
  [CaseDetailActionEnum.SUBMIT]?: boolean;
  [CaseDetailActionEnum.REOPEN]?: boolean;
  [CaseDetailActionEnum.CREATE_ADHOC_CASE]?: boolean;
  [CaseDetailActionEnum.EDIT_CASE_INFO]?: boolean;
  [CaseDetailActionEnum.CHANGE_PRIORITY]?: boolean;
  [CaseDetailActionEnum.SEARCH_MAKER]?: boolean;
  [CaseDetailActionEnum.ADD_MAKER]?: boolean;
  [CaseDetailActionEnum.REMOVE_MAKER]?: boolean;
  [CaseDetailActionEnum.REMOVE_SUBJECT_FROM_INCIDENTAL_SUBJECT]?: boolean;
  [CaseDetailActionEnum.ADD_SUBJECT_TO_INCIDENTAL_SUBJECT]?: boolean;
  [CaseDetailActionEnum.REMOVE_ALERT_FROM_CASE]?: boolean;
  [CaseDetailActionEnum.ADD_ALERT_TO_CASE]?: boolean;
}
