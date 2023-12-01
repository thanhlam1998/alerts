import { IDetachAlertFromCase } from "apis/cases";
import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { emptyFunction } from "scripts/helpers";
import "./DeleteRelatedAlertModal.scss";

interface AlertTransactionDetailsModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  alertId: string;
  isDetaching: boolean;
  callDetachAlertFromCase: (data: IDetachAlertFromCase) => void;
}

const DeleteRelatedAlertModalView: FC<
  AlertTransactionDetailsModalViewProps
> = ({
  closeModal = emptyFunction,
  visible = false,
  alertId,
  isDetaching,
  callDetachAlertFromCase = emptyFunction,
}) => {
  const { t } = useTranslation();
  const { caseId = "" } = useParams();

  return (
    <Modal
      {...{ visible }}
      className="delete-related-alert-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Delete Related Alerts")}
      onCancel={closeModal}
      width={640}
      okText={t("Delete")}
      buttonOkProps={{
        disabled: isDetaching,
        theme: "red",
      }}
      onOk={() => {
        callDetachAlertFromCase({ caseId, alertId });
      }}
    >
      <div className="delete-related-alert-modal__wrapper pb-6">
        <div className="flex flex-col sm_body_b1_reg text-gray800">
          <div className="flex items-center">
            <Trans
              defaults='Are you sure you want to delete Alert ID <spanTag>"{{alertId}}"</spanTag>?'
              components={{
                spanTag: <span className="sm_body_b1_semi ml-1" />,
              }}
              values={{ alertId }}
            />
          </div>
          <span className="text-red400">
            {t("You can’t undo this action.")}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteRelatedAlertModalView;
