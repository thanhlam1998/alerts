import { IAssignAlertToCase } from "apis/alert";
import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { emptyFunction } from "scripts/helpers";
import "./ConfirmModal.scss";

interface ConfirmModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  isLoading: boolean;
  callAssignAlertToCase: (data: IAssignAlertToCase) => void;
  alertId: string;
}

const ConfirmModalView: FC<ConfirmModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  isLoading,
  callAssignAlertToCase = emptyFunction,
  alertId,
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
      title={t("Confirm")}
      onCancel={closeModal}
      width={640}
      okText={t("Confirm")}
      buttonOkProps={{
        disabled: isLoading,
        theme: "standard",
      }}
      onOk={() => {
        callAssignAlertToCase({ caseId, alertIds: [alertId] });
      }}
    >
      <div className="delete-related-alert-modal__wrapper pb-6">
        <div className="flex items-center sm_body_b1_reg text-gray800">
          <Trans
            defaults="Are you sure you want to move the selected alert to section <spanTag>Related Alerts</spanTag>?"
            components={{
              spanTag: <span className="sm_body_b1_semi ml-1" />,
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModalView;
