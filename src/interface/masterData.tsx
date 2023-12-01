import { IFinding } from "./case";

export interface IClosingInfoMasterData {
  suspectedPredicateCrimes: IFinding[];
  findings: IFinding[];
  additionalCaseInformations: IAdditionalCaseInformation[];
}
export interface IAdditionalCaseInformation {
  code: string;
  name: string;
  description: string;
  requiredCountry?: boolean;
}
