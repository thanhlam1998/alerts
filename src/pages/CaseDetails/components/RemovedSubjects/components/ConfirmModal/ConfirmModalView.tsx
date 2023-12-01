import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./ConfirmModal.scss";

interface ConfirmModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  isLoading: boolean;
  callAddIncidentalSubject: () => void;
}

const ConfirmModalView: FC<ConfirmModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  isLoading,
  callAddIncidentalSubject = emptyFunction,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="confirm-modal"
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
      onOk={callAddIncidentalSubject}
    >
      <div className="confirm-modal__wrapper pb-6">
        <div className="flex items-center sm_body_b1_reg text-gray800">
          <Trans
            defaults="Are you sure you want to move the selected subject to section <spanTag>Incidental Subject</spanTag>?"
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
