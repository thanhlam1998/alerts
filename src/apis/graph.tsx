import { API_SERVICES, HTTP_METHODS } from "scripts/constants";
import baseApi from "./baseApi";

export interface ISearchObject {
  searchKeyword: string;
  startDateTime?: number;
  endDateTime?: number;
}
export const searchObject = ({ 
  searchKeyword,
  startDateTime,
  endDateTime,
}: ISearchObject) => {
  return baseApi(`${API_SERVICES.EXPLORER}/search`, HTTP_METHODS.POST, {
    searchKeyword,
    startDateTime,
    endDateTime,
  });
};

export interface IExpandNode {
  vId: string;
  vType: string;
  startDateTime?: number;
  endDateTime?: number;
}
export const expandNode = ({
  vId,
  vType,
  startDateTime,
  endDateTime,
}: IExpandNode) => {
  return baseApi(`${API_SERVICES.EXPLORER}/expand-object`, HTTP_METHODS.POST, {
    vId,
    vType,
    startDateTime,
    endDateTime,
  });
};

export const getNodeDetailById = (entityId: string) => {
  return baseApi(`${API_SERVICES.EXPLORER}/entity/${entityId}`, "GET");
};

export const showGraph = ({
  cif,
  startDateTime,
  endDateTime,
}: {
  cif: string;
  startDateTime?: number;
  endDateTime?: number;
}) => {
  return baseApi(`${API_SERVICES.EXPLORER}/show-graph`, HTTP_METHODS.POST, {
    cif,
    startDateTime,
    endDateTime,
  });
};
