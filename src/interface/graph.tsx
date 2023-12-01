import { EdgeConfig, NodeConfig } from "@antv/g6";
import { IAlertPriority, IAmount, IReasonProps } from "./alerts";
import { ISuspectedPredicateCrimes } from "./case";

export type VType =
  | "person"
  | "company"
  | "unified_entity"
  | "transaction"
  | "account"
  | "alert"
  | "str"
  | "case"

  export type EType =
    | "Same_As"
    | "Entity_Has_Account"
    | "Entity_Has_Record"
    | "Entity_Has_Case"
    | "Entity_Send_TXN"
    | "Entity_Receive_TXN"
    | "Entity_Has_Alert"
    | "Entity_In_Ring";

export interface GraphSearchProps {
  vType: VType;
  vId: string;
  name: string;
  accountNumber: string;
  dob: number;
  address: string;
  dateOfRegistration?: number;
}

export interface IEdge {
  toType?: string;
  toId?: string;
  fromType?: string;
  fromId?: string;
  directed?: boolean;
  eType?: EType;
}

export interface IVertex {
  vId: string;
  vType: VType;
  attributes?: any;
}


export interface GraphViewDataProps {
  nodes: NodeConfig[];
  edges: EdgeProps[];
}

export interface EdgeProps extends EdgeConfig {
  averageTime?: number;
}
export interface GraphNode {
  id: string;
  label: string;
  size: number;
  style: GraphNodeStyle;
  icon: Icon;
  type: string;
  labelCfg: LabelCFG;
  x: number;
  y: number;
  layoutOrder: number;
}

export interface Icon {
  show: boolean;
  width: number;
  height: number;
  img: string;
}

export interface LabelCFG {
  position: string;
  style: LabelCFGStyle;
}

export interface LabelCFGStyle {
  color: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  background: Background;
}

export interface Background {
  fill: string;
  stroke: string;
  padding: number;
  radius: number;
}

export interface GraphNodeStyle {
  fill: string;
  stroke: string;
  lineWidth: number;
}

export interface ITransactionSummary {
  numOfTransactions?: number;
  totalInflow?: number;
  totalOutflow?: number;
}
export interface INodePerson {
  dob?: number;
  birthPlace?: string;
  address?: string;
  nationality?: string;
  natureOfBusiness?: string;
  riskScore?: number;
  numOfSTRs?: number;
  numOfCTRs?: number;
  totalAmount?: IAmount;
  entityId: string;
  numOfAlerts?: number;
  numOfConnections?: number;
  transactionSummary?: ITransactionSummary
}

export interface INodeCompany {
  dateOfRegistration?: number;
  placeOfRegistration?: number;
  address?: string;
  natureOfBusiness?: string;
  registrationNo?: string;
  riskScore?: number;
  numOfSTRs?: number;
  numOfCTRs?: number;
  totalAmount?: IAmount;
  entityId: string;
  numOfAlerts?: number;
  numOfConnections?: number;
  transactionSummary?: ITransactionSummary;
}

export interface INodeTransaction {
  transactionCode?: string;
  transactionDate?: number;
  domesticForeign?: string;
  currency?: string;
}

export interface INodeAccount {
  accountNo?: string;
  coveredPerson?: string;
  coveredPBAddress?: string;
}

export interface INodeSTR {
  reason?: IReasonProps;
  narrative?: string;
  predicateCrime?: ISuspectedPredicateCrimes;
}

export interface INodeCase {
  caseId?: string;
  priority?: IAlertPriority;
}

export interface INodeAlert {
  alertId?: string;
  reasons?: IReasonProps[];
}

export interface InodeUnifiedEntityAttributes {
  unifiedEntityId?: string;
  numOfUniqueEntities?: number
}