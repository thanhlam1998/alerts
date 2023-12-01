import { IEdge, IVertex } from "./alertsQueue";

export interface ISearchObjectResult {
  total: number;
  searchItems: ISearchItem[];
}

export interface ISearchItem {
  cif: string;
  accountNumber: string;
  accountName: string;
  numOfConnections: number;
}

export interface IShowGraphResult {
  vertices: IVertex[];
  edges: IEdge[];
}

export interface IExpandObjectResult {
  vertices: IVertex[];
  edges: IEdge[];
}