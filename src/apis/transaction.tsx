import queryString from "query-string";
import { API_SERVICES } from "scripts/constants";
import baseApi from "./baseApi";

export const getTransactionsByAlertId = (alertId?: string) => {
  return baseApi(
    `${API_SERVICES.TRANSACTIONS}?${queryString.stringify({ alertId })}`,
    "GET"
  );
};
