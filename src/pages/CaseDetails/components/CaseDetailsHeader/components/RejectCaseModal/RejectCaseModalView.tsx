import Modal from "components/Modal";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { emptyFunction } from "scripts/helpers";
import "./RejectCaseModal.scss";

interface IRejectCaseModalViewProps {
  visible?: boolean;
  closeModal?: () => void;
  cif?: string;
  isLoading: boolean;
  callRejectCase: () => void;
}

const RejectCaseModalView: FC<IRejectCaseModalViewProps> = ({
  closeModal = emptyFunction,
  visible = false,
  cif,
  isLoading,
  callRejectCase = emptyFunction,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      {...{ visible }}
      className="reject-case-modal"
      centered
      destroyOnClose
      bodyStyle={{ padding: 0 }}
      title={t("Reject")}
      onCancel={closeModal}
      width={640}
      okText={t("Reject")}
      buttonOkProps={{
        disabled: isLoading,
        theme: "red",
      }}
      onOk={callRejectCase}
    >
      <div className="reject-case-modal">
        <div className="flex flex-col sm_body_b1_reg text-gray800">
          <div className="flex items-center">
            <Trans
              defaults='Are you sure you want to reject this case <spanTag>"{{cif}}"</spanTag>?'
              components={{
                spanTag: <span className="sm_body_b1_semi ml-1" />,
              }}
              values={{ cif }}
            />
          </div>
          <span className="text-red400 mb-4">
            {t("You can’t undo this action.")}
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default RejectCaseModalView;
