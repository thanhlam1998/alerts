import { TransactionApis } from "apis";
import { IAlertItemByCIF } from "interfaces/alertsQueue";
import { FC } from "react";
import { useQuery } from "react-query";
import { emptyFunction } from "scripts/helpers";
import AlertTransactionDetailsModalView from "./AlertTransactionDetailsModalView";

interface AlertTransactionDetailsModalProps {
  visible?: boolean;
  closeModal?: () => void;
  alertSelected: any;
  alertDetails: any;
  type?: "Entity" | "Alert";
}

const AlertTransactionDetailsModalContainer: FC<
  AlertTransactionDetailsModalProps
> = ({
  closeModal = emptyFunction,
  visible = false,
  alertSelected,
  alertDetails,
  type = "Entity",
}) => {
  const {
    isLoading: isGettingTransactionsByAlertId,
    data: transactionsByAlertIdData,
  }: any = useQuery(
    ["getTransactionsByAlertId", alertSelected?.alertId],
    () => TransactionApis.getTransactionsByAlertId(alertSelected?.alertId),
    { enabled: !!alertSelected?.alertId && visible }
  );

  return (
    <AlertTransactionDetailsModalView
      {...{
        visible,
        closeModal,
        isGettingTransactionsByAlertId,
        transactionsByAlertIdData: transactionsByAlertIdData?.data ?? {
          total: 0,
          transactions: [],
        },
        alertDetails,
        type,
      }}
    />
  );
};

export default AlertTransactionDetailsModalContainer;
