import { SortEnumType } from "scripts/constants";
import { ICaseCategory } from "./case";

export interface IAmount {
  amount: number;
  currency: string;
}

export type ValueOf<T> = T[keyof T];

export interface IBranch {
  id?: string;
  name?: string;
}

export interface IPaging {
  pageNumber: number;
  pageSize: number;
}

export interface ITimeRange {
  startDateTime?: number;
  endDateTime?: number;
}

export interface IGetAlertCategoriesProps {
  isGettingAlertCategories: boolean;
  alertCategoriesData?: ICaseCategory[];
}

export type ISortColumn<T_Field_Keys = string> = {
  fieldKey: T_Field_Keys;
  sortOrder: SortEnumType;
}
