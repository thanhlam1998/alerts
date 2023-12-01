import { AlertApis } from "apis";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  AlertTransactionSummaryBreakdownEnum,
  AlertTransactionSummaryCalculationTypeEnum,
  AlertTransactionSummaryTimeRangeEnum,
  BRI_USE_QUERY_REQUEST_KEY_NAMES
} from "scripts/constants";
import SummaryOfTransactionsView from "./SummaryOfTransactionsView";

export interface ISummaryOfTransactionsQueryParamsState {
  summaryTimeRange: AlertTransactionSummaryTimeRangeEnum;
  summaryBreakdown: AlertTransactionSummaryBreakdownEnum;
  summaryCalculationType: AlertTransactionSummaryCalculationTypeEnum;
}

const AlertDetailsContainer = () => {
  const { alertCIFNumber = "" } = useParams();

  const [queryParams, setQueryParams] =
    useState<ISummaryOfTransactionsQueryParamsState>({
      summaryTimeRange: AlertTransactionSummaryTimeRangeEnum.YEARLY,
      summaryBreakdown: AlertTransactionSummaryBreakdownEnum.TOTAL_AMOUNT,
      summaryCalculationType:
        AlertTransactionSummaryCalculationTypeEnum.TRANSACTION_TYPE,
    });

  const {
    isLoading: isGettingSummaryOfTransactions,
    data: summaryOfTransactionsData,
  }: any = useQuery(
    [
      BRI_USE_QUERY_REQUEST_KEY_NAMES.ALERT.GET_SUMMARY_OF_TRANSACTIONS,
      alertCIFNumber,
      queryParams,
    ],
    () =>
      AlertApis.getSummaryOfTransactions(alertCIFNumber, {
        timeRange: queryParams.summaryTimeRange,
        breakdown: queryParams.summaryBreakdown,
        calculationType: queryParams.summaryCalculationType,
      }),
    { enabled: !!alertCIFNumber }
  );

  return (
    <SummaryOfTransactionsView
      {...{
        isGettingSummaryOfTransactions,
        summaryOfTransactions: summaryOfTransactionsData?.data,

        queryParams,
        setQueryParams,
      }}
    />
  );
};

export default AlertDetailsContainer;
