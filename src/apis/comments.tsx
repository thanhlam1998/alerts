import queryString from "query-string";
import baseApi from "./baseApi";
const prefix = "/api/comments";

export const getComments = (params: { caseId?: string, alertId?: string }) => {
  return baseApi(`${prefix}?${queryString.stringify(params)}`, "GET");
};

export const createComment = (payload: {
  caseId?: string;
  alertId?: string;
  text: string;
}) => {
  return baseApi(`${prefix}`, "POST", payload);
};


const commentAPI = {
  getComments,
  createComment,
};
export default commentAPI;
