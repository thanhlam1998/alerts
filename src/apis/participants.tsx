import queryString from "query-string";
import baseApi from "./baseApi";

const prefix = "/api/participants";

export const getParticipantUsers = (params: { caseId?: string, alertId?: string }) => {
  return baseApi(`${prefix}/participant-users?${queryString.stringify(params)}`, "GET");
};

export const createParticipant = (payload: {
  caseId?: string;
  alertId?: string;
  userId: string;
}) => {
  return baseApi(`${prefix}`, "POST", {
    caseId: payload.caseId,
    alertId: payload.alertId,
    userIds: [payload.userId]
  });
};

export const getParticipantList = (params: { caseId?: string, alertId?: string }) => {
  return baseApi(`${prefix}?${queryString.stringify(params)}`, "GET");
};

export const deleteParticipant = (payload: {
  participantId: number
}) => {
  return baseApi(`${prefix}`, "DELETE", {
    participantIds: [payload.participantId]
  });
};

const participantAPI = {
  getParticipantUsers,
  getParticipantList,
  createParticipant,
  deleteParticipant,
};
export default participantAPI;
