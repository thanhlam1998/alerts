import Loading from "components/Loading/Loading";
import Modal from "components/Modal";
import {
  IAlertTransaction,
  IAlertTransactionListResult,
} from "interface/alerts";
import { isEmpty } from "lodash";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { emptyFunction, formatMoney } from "scripts/helpers";
import "./AlertTransactionDetailsModal.scss";
import moment from "moment";
import { TRANSACTION_DATE_TIME_FORMAT } from "scripts/constants";

interface AlertTransactionDetailsModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  isGettingTransactionsByAlertId?: boolean;
  transactionsByAlertIdData?: IAlertTransactionListResult;
  alertDetails: any;
  type?: "Entity" | "Alert";
}

const AlertTransactionDetailsModalView: FC<
  AlertTransactionDetailsModalViewProps
> = ({
  closeModal = emptyFunction,
  visible = false,
  isGettingTransactionsByAlertId,
  transactionsByAlertIdData,
  alertDetails,
  type = "Entity",
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="alert-transaction-details-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={
        <div className="alert-transaction-details-modal__title flex items-center gap-3">
          <div className="alert-transaction-details-modal__title-text">
            {t("Transaction Details")}
          </div>
          {!isGettingTransactionsByAlertId &&
            (!isEmpty(alertDetails?.customerName) ||
              !isEmpty(alertDetails?.cif) ||
              !isEmpty(alertDetails?.alertId)) && (
              <span className="flex items-center gap-1 border border-solid border-gray200 rounded-[4px] px-2 py-1">
                <span className="sm_body_b1_reg text-gray600">
                  {type === "Entity" ? t("Entity") : t("Alert ID")}
                </span>
                <span className="sm_body_b1_semi text-blue600">
                  {`${alertDetails?.customerName ?? ""} ${
                    alertDetails?.cif || alertDetails?.alertId
                  }`}
                </span>
              </span>
            )}
        </div>
      }
      onCancel={closeModal}
      width={1096}
      showFooter={false}
    >
      <div className="alert-transaction-details-modal__wrapper py-3 grid gap-y-2">
        {isGettingTransactionsByAlertId ? (
          <Loading />
        ) : (
          transactionsByAlertIdData?.transactions?.map(
            (item: IAlertTransaction, index: number) => {
              return (
                <div className="alert-transaction-details__item" key={index}>
                  <div className="alert-transaction-details__item-wrapper py-2 px-3 rounded-[12px] border border-solid border-gray200 bg-gray100 grid grid-cols-9 gap-2">
                    <ItemColumn
                      label={t("Transaction Date")}
                      value={!!item.transactionDate
                        ? moment(item.transactionDate * 1000).format(TRANSACTION_DATE_TIME_FORMAT)
                        : ""}
                    />
                    <ItemColumn
                      label={t("Sender CIF & Name")}
                      value={`${item?.senderAccount?.cif} - ${item?.senderAccount?.name}`}
                    />
                    <ItemColumn
                      label={t("Sender Account Number")}
                      value={item?.senderAccount?.accountNumber}
                    />
                     <ItemColumn
                      label={t("Sender Bank Name")}
                      value={item?.senderAccount?.bankName}
                    />
                    <ItemColumn
                      label={t("Recipient CIF & Name")}
                      value={`${item?.recipientAccount?.cif} - ${item?.recipientAccount?.name}`}
                    />
                    <ItemColumn
                      label={t("Recipient Account Number")}
                      value={item?.recipientAccount?.accountNumber}
                    />
                    <ItemColumn
                      label={t("Recipient Bank Name")}
                      value={item?.recipientAccount?.bankName}
                    />
                    <ItemColumn
                      label={t("Transaction Channel")}
                      value={item?.transactionChannel}
                    />
                    <ItemColumn
                      label={t("Transaction Amount")}
                      value={formatMoney(
                        item?.transactionAmount?.amount,
                        item?.transactionAmount?.currency
                      )}
                      valueClassName="whitespace-nowrap"
                    />
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </Modal>
  );
};

const ItemColumn = ({ label, value, valueClassName = "" }: any) => {
  return (
    <div className="alert-transaction-details__item-col item-col">
      <div className="item-col__label min-h-[32px] sm_body_b3_reg text-gray500 mb-1">
        {label}
      </div>
      <div
        className={`item-col__value sm_body_b2_reg text-gray800 ${valueClassName}`}
      >
        {value}
      </div>
    </div>
  );
};

export default AlertTransactionDetailsModalView;

