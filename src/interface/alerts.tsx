import { IUser } from "./Login";
import { UserProps } from "./User";
import { SuspectedPredicateCrimeClosingInfo } from "./case";

export type IAlertPriority = "HIGH" | "MEDIUM" | "LOW";
export type IAlertStatus = "OPEN" | "ESCALATED" | "DISMISSED";

// export interface IAlertProps {
//   id: string;
//   status: IAlertStatus;
//   priority: IAlertPriority;
//   accountHolder: string;
//   reason: string;
//   amount: number;
//   createdAt: number;
//   caseConnect: string;
//   caseInvolved: number;
// }

export interface Activity {
  activityType: string;
  userId: string;
  userName: string;
  activityTimestamp: number;
  comment: string;
  attachment: any[];
}

export interface IAmount {
  amount: number;
  currency: string;
}

export interface IFlowAmount {
  total: IAmount;
  totalTransactions: number;
  totalRecipients: number;
}
export interface IAlertProps {
  entityNumber: string;
  status: IAlertStatus; // OPEN, ESCALATED, DISMISSED
  priority: IAlertPriority; // LOW, MEDIUM, HIGH
  numOfAlerts: number;
  entityName: string;
  totalAmountInvolved: IAmount;
  riskScore: number;
  dob: number;
  address: string;
  outflow: IFlowAmount;
  inflow: IFlowAmount;
  assignee: UserProps;
  suspectedPredicateCrimes: SuspectedPredicateCrimeClosingInfo[];
}

export interface ITransactionSummaryDataDetail {
  name: string;
  amount: number;
  counts: number;
}

export interface ITransactionSummary {
  currency: string;
  summaries: ITransactionSummaryData[];
}

export interface ITransactionSummaryData {
  year: number;
  quarter: number;
  data: ITransactionSummaryDataDetail[];
}

export interface IReasonProps {
  code: string;
  description: string;
}

export interface IAlertTransactionProps {
  timeRange: string;
  reasons: IReasonProps[];
  totalAmount: IAmount;
  debitAmount: IAmount;
  creditAmount: IAmount;
  numOfSTR: number;
  numOfCTR: number;
  transactions: ITransactionDetail[];
  entityNumber?: string;
  entityName?: string;
}

export interface ITransactionDetail {
  timeRange: string;
  dateTime: number;
  reason: IReasonProps;
  totalAmount: IAmount;
  debitAmount: IAmount;
  creditAmount: IAmount;
  entityName: string;
  transactionNumber: string;
}

export interface IAlertTransactionListResult {
  total: number;
  transactions: IAlertTransaction[];
}

export interface IAlertTransaction {
  transactionId: string;
  transactionAmount: IAmount | null;
  transactionChannel: string;
  transactionDate: number | null;
  senderAccount: IAccountInfo | null;
  recipientAccount: IAccountInfo | null;
}

export interface IAccountInfo {
  accountNumber: string;
  bankName: string;
  branch: string;
  cif: string;
  name: string;
}
